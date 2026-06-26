from pydantic import BaseModel
class Video(BaseModel):
    titulo:str
    url:str
    modulo_id: int
class Modulo(BaseModel):
    nombre:str