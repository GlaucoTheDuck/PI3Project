# app/crud.py
from sqlalchemy.orm import Session
from . import models, schemas

def create_pin(db: Session, pin: schemas.PinCreate):
    db_item = models.Pin(**pin.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_pins(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Pin).offset(skip).limit(limit).all()