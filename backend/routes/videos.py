from fastapi import APIRouter
from database import get_connection
from models import Video

router=APIRouter()
import re

#ytID
def obtener_youtube_id(url):
    patron=r"(?:v=|\/)([0-9A-Za-z_-]{11})"
    resultado=re.search(patron,url)
    if resultado:
        return resultado.group(1)
    return ""

#get
@router.get("/videos")
def listar_videos():
    conexion=get_connection()
    cursor=conexion.cursor()
    cursor.execute("""
        SELECT
            id,
            titulo,
            youtube_id,
            url,
            categoria,
            fecha
        FROM videos
        ORDER BY id DESC
    """)
    datos=cursor.fetchall()
    cursor.close()
    conexion.close()
    videos=[]
    for video in datos:
        videos.append({
            "id":video[0],
            "titulo":video[1],
            "youtube_id":video[2],
            "url":video[3],
            "categoria":video[4],
            "fecha":str(video[5])
        })
    return videos

#post
@router.post("/videos")
def agregar_video(video:Video):
    youtube_id=obtener_youtube_id(video.url)
    conexion=get_connection()
    cursor=conexion.cursor()
    cursor.execute("""
        INSERT INTO videos(
            titulo,
            youtube_id,
            url,
            categoria
        )
        VALUES(%s,%s,%s,%s)
    """,(
        video.titulo,
        youtube_id,
        video.url,
        video.categoria
    ))
    conexion.commit()
    cursor.close()
    conexion.close()
    return{
        "mensaje":"Video agregado correctamente"
    }