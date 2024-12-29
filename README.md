# SQL Question Generation System

This project is designed to generate SQL exam questions using Retrieval-Augmented Generation (RAG) with LangChain and a locally installed language model. The system includes a backend built with **FastAPI** and a frontend built with **React** and **TailwindCSS**. The primary purpose is to automatically generate SQL-related questions based on a knowledge base.

## Features

- **Frontend:**
  - React components for displaying exam questions and handling user interactions.
  - TailwindCSS for styling the UI.

- **Backend:**
  - FastAPI for the backend API.
  - LangChain for generating SQL questions based on retrieved documents.
  - FAISS for efficient vector-based retrieval of documents.
  - Ollama (LLaMA 3.2) for question generation.

- **User Authentication:**
  - Login and signup functionality for users to access the system.

- **Question Generation:**
  - Automatic generation of SQL questions based on concepts from a predefined set of documents.
  - Multiple question formats including multiple-choice and open-ended questions.

## Technologies Used

- **Frontend:**
  - React
  - TailwindCSS

- **Backend:**
  - FastAPI
  - LangChain
  - FAISS
  - Ollama (LLaMA 3.2)
  - MongoDB (for data storage)

## Project Setup

### Prerequisites

Before running the project, ensure you have the following installed:

- Python
- Node.js
- npm (Node Package Manager)

### Backend Setup (FastAPI)

1. Clone the repository:

    ```bash
    git clone https://github.com/YOUSSEF-MOKNIA/SQL-Exam-System.git
    cd SQL-Exam-System
    ```

2. Create a virtual environment and activate it:

    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows: venv\Scripts\activate
    ```

3. Install backend dependencies:

    ```bash
    pip install -r backend/requirements.txt
    ```

4. Run the backend server:

    ```bash
    uvicorn backend.main:app --reload
    ```

   The backend API will be available at `http://127.0.0.1:8000`.

### Frontend Setup (React with TailwindCSS)

1. Navigate to the frontend folder:

    ```bash
    cd frontend
    ```

2. Install frontend dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```

   The frontend will be available at `http://localhost:3000`.

## File Structure

SQL-Exam-System/ ├── backend/ # Backend FastAPI code │ ├── routers/ # API endpoints │ ├── services/ # Core logic for question generation │ ├── schemas/ # Pydantic models │ ├── database.py # Database setup │ ├── main.py # FastAPI app setup │ └── requirements.txt # Python dependencies ├── frontend/ # Frontend React code │ ├── components/ # React components │ ├── api/ # API calls to backend │ ├── App.js # Main App component │ ├── index.js # React entry point │ └── tailwind.config.js # TailwindCSS configuration ├── .gitignore # Git ignore file └── README.md # Project documentation


## API Documentation

You can access the backend API documentation at:

http://127.0.0.1:8000/docs

This Swagger UI provides an interactive interface for testing the API endpoints.

## Acknowledgements

- LangChain for NLP-based question generation.
- Ollama (LLaMA 3.2) for the language model.
- FastAPI for the backend framework.
- React and TailwindCSS for the frontend development.

## Contact

For any inquiries or contributions, feel free to open an issue or contact me via email at [youssef.moknia@example.com].
