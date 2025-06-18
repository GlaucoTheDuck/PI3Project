# app/models.py
from sqlalchemy import Column, Integer, String, Float, Date
from .database import Base

class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    price = Column(Float)

class Pin(Base):
    __tablename__ = "pin"

    id = Column(Integer, primary_key=True, index=True)    
    date = Column(Date, nullable=False)
    lati = Column(Float, nullable=False)
    long = Column(Float, nullable=False)