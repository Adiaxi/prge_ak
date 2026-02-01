from fastapi import APIRouter
from pydantic import BaseModel
from sqlalchemy import create_engine, text

from app.settings import db_name, db_user, db_password

router_insert = APIRouter()


def connect_to_db(db_name: str, db_user: str, db_password: str):
    return create_engine(
        f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}"
    )

class UserData(BaseModel):
    name: str
    posts: int
    location: str
    lat: float
    lon: float


@router_insert.post("/insert_user")
async def insert_user(user: UserData):
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        params = {
            "name": user.name,
            "posts": user.posts,
            "location": user.location,
            "lat": user.lat,
            "lon": user.lon
        }

        sql_query = text("""
                         INSERT INTO users (name, posts, location, geom)
                        VALUES (:name, :posts, :location,ST_Transform(ST_SetSRID(ST_MakePoint(:lon, :lat), 4326), 3857));
                         """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query, params)
            conn.commit()
            print(result)


    except Exception as e:
        print(e)
        raise e

    return {"status": 1}
