# ai_service.py
import os
from langchain.schema import Document
from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma
from langchain.prompts import ChatPromptTemplate

class AIService:
    def __init__(self, api_key):
        self.llm = ChatGoogleGenerativeAI(model="gemini-1.5-pro-latest", google_api_key=api_key)
        self.embeddings = GoogleGenerativeAIEmbeddings(model="models/text-embedding-004", google_api_key=api_key)

    def create_vector_store_for_document(self, document_id: str, text_content: str):
        """Chunks text, creates embeddings, and saves them to a persistent ChromaDB store."""
        docs = [Document(page_content=text_content)]

        text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
        split_docs = text_splitter.split_documents(docs)

        # The 'persist_directory' is crucial for saving the store to disk
        db_path = f"./chroma_db/{document_id}"
        vector_store = Chroma.from_documents(
            documents=split_docs,
            embedding=self.embeddings,
            persist_directory=db_path
        )
        print(f"Vector store created for document {document_id} at {db_path}")
        return vector_store
    
    def generate_structured_modules(self, text_content: str):
        """Uses an LLM to analyze text and generate a structured curriculum."""
        prompt_template = ChatPromptTemplate.from_template(
            "You are an expert curriculum designer. Read the following document text and create a structured learning syllabus. "
            "Organize the content into 3-5 high-level modules. For each module, create 2-4 specific sub-topic lessons. "
            "Return your answer as a single, valid JSON object. Do not include any other text or explanations outside of the JSON. "
            "The format should be: {{\"modules\": [{{\"module_title\": \"Module Name\", \"lessons\": [\"Lesson 1\", \"Lesson 2\"]}}]}} "
            "\n\nDocument Text: {document_text}"
        )
        chain = prompt_template | self.llm
        response = chain.invoke({"document_text": text_content})
        return response.content