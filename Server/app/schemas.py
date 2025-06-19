# app/schemas.py
from pydantic import BaseModel
from datetime import date
from typing import Optional

class PinBase(BaseModel):
    title: str
    desc: str
    lati: float
    long: float
    date: date
    compassHeading: float
    imageUri: Optional[str] = None

class PinCreate(PinBase):
    pass

class Pin(PinBase):
    id: int

    class Config:
        from_attributes = True
