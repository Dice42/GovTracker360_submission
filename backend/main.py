from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from bson import ObjectId
from fastapi.responses import JSONResponse
from typing import List
from services.together_ai import extract_key_topics, summarize_text, get_insights
from services.together_ai import generate_justification, generate_challenges, generate_metrics, generate_alternatives, generate_effects, generate_risks, generate_legal_opinion, generate_financial_opinion, generate_partner_opinions, generate_work_plan, generate_recommendation
from services.mongodb_service import save_proposal, fetch_all_proposals, client, collection, get_id
from services.google_search import search_google
from services.proposal_model import Proposal, Reports, KeyTopics, user, Request
from services.users import login
from services.to_pdf import create_request_pdf
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

database = client["document_analysis"]
collection = database["proposals"]

class TitleRequest(BaseModel):
    title: str

@app.get("/pdf")
async def get_proposal_pdf(title: str):
    proposal = collection.find_one({"title": title})
    print(proposal)
    
    if not proposal:
        raise HTTPException(status_code=404, detail="Proposal not found")
    
    # Create PDF
    pdf_buffer = create_request_pdf(proposal)
    
    return FileResponse(
        pdf_buffer,
        media_type='application/pdf',
        filename=f'proposal_{title}.pdf'
    )

@app.get("/search")
async def search_proposals(query: str):
    try:
        # Get MongoDB results and convert ObjectId to string
        mongo_results = list(collection.find({"title": {"$regex": query, "$options": "i"}}))
        for result in mongo_results:
            if "_id" in result:
                result["_id"] = str(result["_id"])
        
        # Get Google results
        remaining_results = max(0, 10 - len(mongo_results))
        google_results = search_google(query, remaining_results)
        
        # Combine results
        all_results = mongo_results + google_results
        # print(all_results)
        return all_results
        
    except Exception as e:
        print(f"Search error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login")
def api_login(a: user = Form(...)):
    UserName = login(a.email, a.Pass)
    if UserName is None:
        raise HTTPException(status_code=404, detail="User not found")
    return UserName

@app.post("/proposal")
def get_all_proposals():
    return fetch_all_proposals()
    

@app.post("/proposal/{id}")
def get_proposal(id: int):
    proposal = collection.find_one({"id": ObjectId(id)})
    if proposal is None:
        raise HTTPException(status_code=404, detail="Proposal not found")
    proposal["id"] = str(proposal["id"])
    return proposal

@app.post("/process")
async def analyze_documents(
    request: Request = Form(...)
):
    request.justification = generate_justification(request.description, request.justification)
    request.challenges = generate_challenges(request.description, request.challenges)
    request.metrics = generate_metrics(request.description, request.metrics)
    request.alternatives = generate_alternatives(request.description, request.alternatives)
    request.effects = generate_effects(request.description, request.effects)
    request.risks = generate_risks(request.description, request.risks)
    request.legalOpinion = generate_legal_opinion(request.description, request.legalOpinion)
    request.financialOpinion = generate_financial_opinion(request.description, request.financialOpinion)
    request.partnerOpinions = generate_partner_opinions(request.description, request.partnerOpinions)
    request.workPlan = generate_work_plan(request.description, request.workPlan)
    request.recommendation = generate_recommendation(request.description, request.recommendation)
    request.summary = summarize_text(request.description)
    print(request)
    save_proposal(request)
    return JSONResponse(content={"message": "Documents analyzed successfully"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
