from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
import os

app = FastAPI()

origins = [
    "http://localhost:5173",  # Vite URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # allow all HTTP verbs
    allow_headers=["*"],
)

GEMINI_API_KEY = os.getenv('GOOGLE_GEMINI_API_KEY')
gemini_client = genai.Client(api_key=GEMINI_API_KEY)


class TranslateRequest(BaseModel):
    text: str
    target_lang: str


@app.post("/translate")
async def translate(req: TranslateRequest):
    text = req.text
    target_lang = req.target_lang
    prompt = f"Translate this to {target_lang}, only return the translated text : {text}"
    response = gemini_client.models.generate_content(
        model="gemini-2.0-flash", contents=prompt)
    return {"translation": response.text}
