import psycopg2


def get_connection():

    return psycopg2.connect(

        host="localhost",

        database="dvideo",

        user="postgres",

        password="Yadinohabla_231",

        port="5432"

    )