from fastapi import FastAPI
from app.routers import exam
from app.routers import auth

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Question Generation API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust based on your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(exam.router, prefix="/Exam", tags=["Questions"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])
