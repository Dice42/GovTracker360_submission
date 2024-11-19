from reportlab.lib import colors
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from services.proposal_model import Request
from fastapi.responses import FileResponse
from io import BytesIO

# ... existing code ...

def create_request_pdf(request_data: dict):
    """Creates a PDF from request data"""
    buffer = BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        rightMargin=50,
        leftMargin=50,
        topMargin=50,
        bottomMargin=50
    )
    
    styles = getSampleStyleSheet()
    elements = []
    
    # Add title
    title = Paragraph(f"Proposal Details - {request_data['title']}", styles['Heading1'])
    elements.append(title)
    elements.append(Spacer(1, 20))
    
    # Create a custom style for content
    content_style = styles['Normal'].clone('content_style')
    content_style.fontSize = 9
    content_style.leading = 11
    
    # Define the fields to include in PDF
    fields = [
        ('Description', request_data['description']),
        ('Summary', request_data['summary']),
        ('Justification', request_data['justification']),
        ('Challenges', request_data['challenges']),
        ('Metrics', request_data['metrics']),
        ('Alternatives', request_data['alternatives']),
        ('Effects', request_data['effects']),
        ('Risks', request_data['risks']),
        ('Legal Opinion', request_data['legalOpinion']),
        ('Financial Opinion', request_data['financialOpinion']),
        ('Partner Opinions', request_data['partnerOpinions']),
        ('Work Plan', request_data['workPlan']),
        ('Recommendation', request_data['recommendation'])
    ]
    
    # Process each field individually
    for label, content in fields:
        elements.append(Paragraph(label, styles['Heading3']))
        elements.append(Spacer(1, 6))
        elements.append(Paragraph(str(content), content_style))  # Convert content to string
        elements.append(Spacer(1, 12))
    
    doc.build(elements)
    return buffer.getvalue()