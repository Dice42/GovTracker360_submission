from pymongo import MongoClient
import os
from .proposal_model import user
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(MONGODB_URI)
db = client["USER"]
collection = db.users

# def create_users():
#     user_data = {"email": "finance@adeo.ae", "Pass": "finance"}
#     collection.insert_one(user_data)
#     user_data = {"email": "stratigic@adeo.ae", "Pass": "stratigic"}
#     collection.insert_one(user_data)
#     user_data = {"email": "operational@adeo.ae", "Pass": "operational"}
#     collection.insert_one(user_data)
#     return

def login(email: str, Pass: str):
    # print(collection.find_one({"email": email.lower(), "Pass": Pass}))
    if collection.find_one({"email": email.lower(), "Pass": Pass}):
        return Pass
    return None
