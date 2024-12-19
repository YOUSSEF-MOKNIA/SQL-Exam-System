from app.schemas.request import QuestionRequest
from app.schemas.response import QuestionResponse
from app.services.piepeline import exam_pipeline
from langchain_ollama import OllamaLLM
from app.utils.faiss_utils import load_faiss_index
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
from datetime import datetime
from app.utils.jwt_utils import get_current_user
import os
from app.database import exams_collection


router = APIRouter()


base_dir = os.path.dirname(os.path.abspath(__file__))  # Current script directory
vectorstore_path = os.path.join(base_dir, "vector_database")

# Load the FAISS vector database
# save_path = "vector_database"

# Load FAISS index and Ollama model
faiss_index = load_faiss_index(vectorstore_path)
ollama_model = OllamaLLM(model="llama3.2")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

@router.post("/generate-exam", response_model=QuestionResponse)
async def generate_exam(request: QuestionRequest, token: str = Depends(oauth2_scheme)):
    try:
        # Generate the exam
        exam = exam_pipeline(
            query=request.query,
            question_type=request.question_type,
            question_nbr=request.question_nbr,
            faiss_index=faiss_index,
            ollama_model=ollama_model,
            difficulty=request.difficulty,
            k=25,  # Retrieved documents
            top_n=5  # Re-ranked documents
        )

        # Extract user from the token
        user = await get_current_user(token)
        if not user:
            raise HTTPException(status_code=401, detail="Invalid token")

        # Save the generated exam
        exam_data = {
            "query": request.query,
            "answers": {},  # No answers at generation time
            "questions": exam["questions"],
            "user_id": user["_id"],
            "created_at": datetime.utcnow(),
        }
        await exams_collection.insert_one(exam_data)

        return {"questions": exam["questions"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/exam_history")
async def get_exam_history(token: str = Depends(oauth2_scheme)):
    user = await get_current_user(token)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    try:
        # Fetch exams for the authenticated user
        exams = await exams_collection.find({"user_id": user["_id"]}).to_list(length=100)

        # Convert ObjectId and ensure all fields are JSON serializable
        def serialize_exam(exam):
            exam["_id"] = str(exam["_id"])  # Convert _id to string
            exam["user_id"] = str(exam["user_id"])  # Convert user_id to string
            exam["created_at"] = exam["created_at"].isoformat()  # ISO format for datetime
            return exam

        serialized_exams = [serialize_exam(exam) for exam in exams]

        return {"exams": serialized_exams}
    except Exception as e:
        print(f"Error fetching exams: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching exam history: {str(e)}")

