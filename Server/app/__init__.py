# app/main.py
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

# Cria tabelas (apenas em dev; em prod use migrations)
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Permite chamadas do app React Native (ajuste origins conforme seu domínio)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependência para obter sessão de DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/pin/", response_model=list[schemas.Pin])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return crud.get_pins(db, skip=skip, limit=limit)

@app.post("/pin/", response_model=schemas.Pin, status_code=201)
def create_pin(pin: schemas.PinCreate, db: Session = Depends(get_db)):
    return crud.create_pin(db, pin)