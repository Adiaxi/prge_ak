from geopy.geocoders import Nominatim
from geopy.adapters import AioHTTPAdapter
import time
from fastapi import APIRouter
from sqlalchemy import create_engine, text
from app.settings import db_name, db_user, db_password
from pydantic import BaseModel

router_get_users = APIRouter()

class BankInput(BaseModel):
    name: str
    address: str

def connect_to_db(db_name: str, db_user: str, db_password: str):
    return create_engine(
        f"postgresql://{db_user}:{db_password}@postgis:5432/{db_name}"
    )


@router_get_users.get("/get_users")
async def get_users():
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)
        sql_query = text("SELECT * FROM users;")
        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            users = [dict(row._mapping) for row in result]
        return {"status": "success", "data": users}
    except Exception as e:
        print(f'błąd podczas get_users: {e}')
        return {"error": str(e)}




@router_get_users.get("/get_banks")
async def get_banks():
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        sql_query = text("""
                         SELECT id,
                                name,
                                address,
                                ST_X(location::geometry) as longitude,
                                ST_Y(location::geometry) as latitude
                         FROM banks;
                         """)

        with db_connection.connect() as conn:
            result = conn.execute(sql_query)
            banks = [dict(row._mapping) for row in result]

        return {"status": "success", "data": banks}

    except Exception as e:
        print(f'błąd podczas get_banks: {e}')
        return {"error": str(e)}


@router_get_users.get("/update_coordinates")
async def update_coordinates():
    geolocator = Nominatim(user_agent="prge_bank_portal_final", timeout=10)
    db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

    updated_count = 0
    errors = []

    try:
        with db_connection.connect() as conn:
            banks_result = conn.execute(text("SELECT id, name, address FROM banks WHERE address IS NOT NULL"))
            banks = [dict(row._mapping) for row in banks_result]

            for bank in banks:
                try:
                    full_address = f"{bank['address']}, Poland"
                    location_data = geolocator.geocode(full_address)

                    if location_data:
                        conn.execute(text("""
                                          UPDATE banks
                                          SET location = ST_SetSRID(ST_MakePoint(:lon, :lat), 4326)
                                          WHERE id = :id
                                          """),
                                     {"lon": location_data.longitude, "lat": location_data.latitude, "id": bank['id']})
                        conn.commit()
                        updated_count += 1
                        print(f"Zaktualizowano: {bank['name']}")
                    else:
                        errors.append(f"Nie znaleziono: {bank['name']}")

                    time.sleep(1.2)  # Ważne: Pauza dla API
                except Exception as e:
                    errors.append(f"Błąd przy {bank['name']}: {str(e)}")

        return {"status": "success", "updated": updated_count, "errors": errors}
    except Exception as e:
        return {"error": str(e)}


@router_get_users.post("/add_bank")
async def add_bank(bank: BankInput):
    try:
        db_connection = connect_to_db(db_name=db_name, db_user=db_user, db_password=db_password)

        sql_query = text("INSERT INTO banks (name, address) VALUES (:name, :address)")

        with db_connection.connect() as conn:
            conn.execute(sql_query, {"name": bank.name, "address": bank.address})
            conn.commit()

        return {"status": "success", "message": f"Dodano bank: {bank.name}"}

    except Exception as e:
        print(f"Błąd dodawania: {e}")
        return {"error": str(e)}