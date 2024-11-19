from pydantic import BaseModel
from typing import List

class AnalysisResult(BaseModel):
    keyTopics: List[str]
    benchmarks: List[dict]
    insights: List[str]
