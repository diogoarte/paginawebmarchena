from fastapi import APIRouter
from database import get_connection
from models import Video
from models import Modulo

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
            v.id,
            v.titulo,
            v.youtube_id,
            v.url,
            m.nombre as categoria,
            v.fecha
        FROM videos v
        JOIN modulos m ON v.modulo_id = m.id
        ORDER BY v.id DESC
    """)
    datos=cursor.fetchall()
    cursor.close()
    conexion.close()
    return[
        {
            "id":row[0],
            "titulo":row[1],
            "youtube_id":row[2],
            "url":row[3],
            "modulo":row[4],
            "fecha":str(row[5])
        }
        for row in datos
    ]

@router.get("/modulos")
def listar_modulos():
    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        SELECT id, nombre FROM modulos ORDER BY id DESC
    """)

    datos = cursor.fetchall()

    cursor.close()
    conexion.close()

    return [
        {"id": row[0], "nombre": row[1]}
        for row in datos
    ]

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
            modulo_id
        )
        VALUES(%s,%s,%s,%s)
    """,(
        video.titulo,
        youtube_id,
        video.url,
        video.modulo_id
    ))
    conexion.commit()
    cursor.close()
    conexion.close()
    return{
        "mensaje":"Video agregado correctamente"
    }


@router.post("/modulos")
def crear_modulo(modulo: Modulo):
    conexion = get_connection()
    cursor = conexion.cursor()

    cursor.execute("""
        INSERT INTO modulos (nombre)
        VALUES (%s)
        RETURNING id, nombre
    """, (modulo.nombre,))

    data = cursor.fetchone()
    conexion.commit()

    cursor.close()
    conexion.close()

    return {
        "id": data[0],
        "nombre": data[1]
    }