import psycopg2


def get_connection():

    return psycopg2.connect(

        host="localhost",

        database="dvideo",

        user="postgres",

        password="Meliyyadinohablan_07",

        port="5432"

    )