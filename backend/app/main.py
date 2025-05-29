from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from . import models, schemas, db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Geoportal MVP")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # lub ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency – daje nam sesję DB w każdym request
get_db = db.get_db

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/places", response_model=list[schemas.Place])
def list_places(db: Session = Depends(get_db)):
    return db.query(models.Place).all()