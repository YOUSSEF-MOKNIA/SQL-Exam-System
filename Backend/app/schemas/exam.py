# schemas/exam.py
from pydantic import BaseModel
from typing import List, Optional

class Question(BaseModel):
    question_text: str
    options: Optional[List[str]] = None
    correct_answer: Optional[str] = None

class Exam(BaseModel):
    user_id: str
    title: str
    questions: List[Question]
    difficulty: str
    question_type: str
