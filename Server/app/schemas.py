# app/schemas.py
from pydantic import BaseModel
from datetime import date

class PinBase(BaseModel):
    lati: float
    long: float
    date: date

class PinCreate(PinBase):
    pass

class Pin(PinBase):
    id: int

    class Config:
        from_attributes = True
