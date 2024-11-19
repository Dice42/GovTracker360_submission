from together import Together
import os
from dotenv import load_dotenv

load_dotenv()

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

client = Together(api_key=TOGETHER_API_KEY)

def extract_key_topics(context: str):
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Extract key topics related to the main subject from the following text from a research view and make in :\n {context}"}]
    )
    content = response.choices[0].message.content
    topics = [topic.strip() for topic in content.split("\n") if topic]
    print("topics", topics)
    return topics

def summarize_text(text: str):
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Summarize the following text:\n {text}"}]
    )
    return response.choices[0].message.content

def get_insights(text: str):
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"give me some insights on the following topic to consider if i want to consider taking this proposal further:\n {text}"}]
    )
    content = response.choices[0].message.content
    insights = [insight.strip() for insight in content.split("\n") if insight]
    return insights


def generate_justification(description: str, justification: str):
    if len(justification) != 0:
        return justification
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Generate a justification for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_challenges(description: str, challenges: str):
    if len(challenges) != 0:
        return challenges
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Identify challenges for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_metrics(description: str, metrics: str):
    if len(metrics) != 0:
        return metrics
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Define metrics for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_alternatives(description: str, alternatives: str):
    if len(alternatives) != 0:
        return alternatives
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Suggest alternatives for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_effects(description: str, effects: str):
    if len(effects) != 0:
        return effects
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Describe effects for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_risks(description: str, risks: str):
    if len(risks) != 0:
        return risks
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Identify risks for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_legal_opinion(description: str, legal_opinion: str):
    if len(legal_opinion) != 0:
        return legal_opinion
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Provide a legal opinion for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_financial_opinion(description: str, financial_opinion: str):
    if len(financial_opinion) != 0:
        return financial_opinion
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Provide a financial opinion for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_partner_opinions(description: str, partner_opinions: str):
    if len(partner_opinions) != 0:
        return partner_opinions
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Gather partner opinions for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_work_plan(description: str, work_plan: str):
    if len(work_plan) != 0:
        return work_plan
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Create a work plan for the following description:\n {description}"}]
    )
    return response.choices[0].message.content

def generate_recommendation(description: str, recommendation: str):
    if len(recommendation) != 0:
        return recommendation
    response = client.chat.completions.create(
        model="meta-llama/Llama-3-8b-chat-hf",
        messages=[{"role": "user", "content": f"Provide a recommendation for the following description:\n {description}"}]
    )
    return response.choices[0].message.content