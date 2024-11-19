from .proposal_model import Proposal, Request
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from bson import json_util
import json

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(MONGODB_URI)
db = client[DATABASE_NAME]
collection = db.proposals

def get_id(Department_name):
    if collection.find_one({"Department_name": Department_name}):
        return "Proposal already exists"
    id = collection.list_search_indexes
    print(id)
    return id + 1

def save_proposal(data: Request):
    data_dict = data.model_dump()
    if collection.find_one({"title": data.title}):
        print("Proposal already exists")
        return "Proposal already exists"
    id = collection.insert_one(data_dict).inserted_id
    print(id)
    return id

def fetch_all_proposals():
    proposals = list(collection.find({}))
    # Convert MongoDB objects to JSON-serializable format
    proposals_json = json.loads(json_util.dumps(proposals))
    for proposal in proposals_json:
        print(proposal)
    return proposals_json
