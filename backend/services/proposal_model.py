from pydantic import BaseModel
from typing import List
from fastapi import UploadFile

class user(BaseModel):
    email: str
    Pass: str

class Document(BaseModel):
    file: UploadFile
    preview: str
    name: str
    size: str
    type: str

class KeyTopics(BaseModel):
    Key_topic: str
    Summary: str
    Reference: str

class Reports(BaseModel):
    finance_report: str
    finance_attachments: List[Document]
    stratigic_report: str
    stratigic_attachments: List[Document]
    operational_report: str
    operational_attachments: List[Document]

class Proposal(BaseModel):
    id: int
    Department_name: str
    Proposal_name: str
    proposal_context: str
    documents: List[str]
    Summary: str
    insights: List[str]
    reports: Reports

class tasks:
    id: int
    title: str
    completed: bool
    assignedTo: str
    dueDate: str

class Request(BaseModel):
    id: int = -1
    title: str
    department: str
    submissionDate: str
    summary: str = ''
    priority: str
    description: str
    justification: str
    challenges: str
    metrics: str
    alternatives: str
    effects: str
    risks: str
    legalOpinion: str
    financialOpinion: str
    partnerOpinions: str
    workPlan: str
    recommendation: str
    tasksCompleted: int
    totalTasks: int
    documents: List[Document] = []
    justificationDocs: List[Document] = []
    metricsDocs: List[Document] = []
    alternativesDocs: List[Document] = []
    effectsDocs: List[Document] = []
    risksDocs: List[Document] = []
    legalFinancialDocs: List[Document] = []
    partnerDocs: List[Document] = []
    workPlanDocs: List[Document] = []
    recommendationDocs: List[Document] = []

class proposal(BaseModel):
    id: int
    sn: str
    title: str
    entity: str
    submissionDate: str
    priority: int
    status: str
    summary: str
    description: str
    documents: list[Document]
    date: str
    assignedTeams: List[str]
    risks: List[str]
    reports: Reports