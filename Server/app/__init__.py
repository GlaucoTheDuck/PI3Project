from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine
from datetime import date
from fastapi.staticfiles import StaticFiles
import os

models.Base.metadata.create_all(bind=engine)
app = FastAPI()

# Mount APENAS UMA VEZ aqui no início
app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# APENAS UMA função read_items
@app.get("/pin/", response_model=list[schemas.Pin])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    pins = db.query(models.Pin).offset(skip).limit(limit).all()
    
    for pin in pins:
        try:
            pin_folder = f"./app/static/images/data/pin/{pin.id}/"
            if os.path.exists(pin_folder):
                files = os.listdir(pin_folder)
                if files:
                    pin.imageUri = f"http://10.0.2.2:8000/static/images/data/pin/{pin.id}/{files[0]}"
                else:
                    pin.imageUri = None
            else:
                pin.imageUri = None
        except:
            pin.imageUri = None
    return pins

@app.post("/pin/", status_code=201)
def create_pin(title: str = Form(...), desc: str = Form(...), date: date = Form(...), 
               file: UploadFile = File(...), lati: float = Form(...), 
               long: float = Form(...), compassHeading: float = Form(...), 
               db: Session = Depends(get_db)):
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="Arquivo deve ser uma imagem")
    return crud.create_pin(db, title, desc, date, file, lati, long, compassHeading)

@app.post("/pin/delete", status_code=201)
def delete_pin(id: int = Form(...), 
               db: Session = Depends(get_db)):
    
    pin = db.get(models.Pin, id)  # equivale a session.query(Pin).get(id)
    
    if not pin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Pin não encontrado")
    
    return crud.del_pin(db, pin)
