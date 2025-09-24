# api_models.py
from pydantic import BaseModel
from typing import List, Dict, Any

class ProcessPdfResponse(BaseModel):
    document_id: str
    modules: List[Dict[str, Any]] # Use a flexible dictionary for the modules

class ChatRequest(BaseModel):
    document_id: str
    message: str