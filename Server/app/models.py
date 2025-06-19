# app/models.py
from sqlalchemy import Column, Integer, String, Float, Date, Text
from .database import Base


class Pin(Base):
    __tablename__ = "pin"

    id = Column(Integer, primary_key=True, index=True)    
    title = Column(String(80), nullable=False)
    desc = Column(Text, nullable=False)
    date = Column(Date, nullable=False)
    lati = Column(Float, nullable=False)
    long = Column(Float, nullable=False)
    compassHeading = Column(Float, nullable=False)