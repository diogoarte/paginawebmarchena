from pydantic import BaseModel
class Video(BaseModel):
    titulo:str
    url:str
    categoria:str