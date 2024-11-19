

export interface Document {
    file: File;
    preview?: string;
    name: string;
    size: string;
    type: string;
  }

export interface FormData {
    id: number;
    title: string;
    department: string;
    submissionDate: string;
    priority: string;
    description: string;
    justification: string;
    challenges: string;
    metrics: string;
    alternatives: string;
    effects: string;
    risks: string;
    legalOpinion: string;
    financialOpinion: string;
    partnerOpinions: string;
    workPlan: string;
    tasksCompleted: number;
    totalTasks: number;
    recommendation: string;
    documents: Document[];
    justificationDocs: Document[];
    metricsDocs: Document[];
    alternativesDocs: Document[];
    effectsDocs: Document[];
    risksDocs: Document[];
    legalFinancialDocs: Document[];
    partnerDocs: Document[];
    workPlanDocs: Document[];
    recommendationDocs: Document[];
}