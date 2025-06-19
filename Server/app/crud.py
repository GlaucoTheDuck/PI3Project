# app/crud.py
from sqlalchemy.orm import Session
from . import models
from .config import UPLOAD_DIR
from datetime import datetime
from fastapi import UploadFile
import os
import shutil

def create_pin(db: Session, title, desc, date, file: UploadFile, lati, long, compassHeading):
    # Primeiro criar o registro no banco
    db_item = models.Pin(
        title=title, 
        desc=desc, 
        lati=lati, 
        long=long, 
        date=date, 
        compassHeading=compassHeading
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    
    # DEPOIS criar o nome do arquivo (agora que temos o ID)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    file_extension = file.filename.split('.')[-1] if '.' in file.filename else 'jpg'
    filename = f"pin_{timestamp}.{file_extension}"
    
    # Criar diretório com o ID do pin
    pin_dir = os.path.join(UPLOAD_DIR, str(db_item.id))  # Converter ID para string
    os.makedirs(pin_dir, exist_ok=True)
    
    # Definir caminho completo do arquivo
    file_path = os.path.join(pin_dir, filename)
    
    # Salvar o arquivo
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return db_item

def get_pins(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Pin).offset(skip).limit(limit).all()

def del_pin(db: Session, pin: models.Pin):
    
    dir_path = os.path.join(UPLOAD_DIR, str(pin.id))

    try:
        shutil.rmtree(dir_path)
        print(f'Pasta {dir_path} e todo o seu conteúdo removidos.')
    except FileNotFoundError:
        print(f'A pasta {dir_path} não existe.')
    except PermissionError:
        print(f'Permissão negada para remover {dir_path}.')
    except Exception as e:
        print(f'Erro ao remover {dir_path}: {e}')
    # 2) marca para exclusão
    db.delete(pin)
    # 3) efetiva no banco
    db.commit()
    return {"ok": True}