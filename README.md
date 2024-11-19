# Abu Dhabi Executive Office AI Research Assistant  

## Overview  
This project, developed during [Hackathon Name], aims to streamline the research and decision-making process for the Abu Dhabi Executive Office using AI. The platform provides an efficient way to handle proposals and enhance collaboration among research teams.  

## Features  

### Request Submission Side  
- Submit proposals with attached documents and a message.  
- AI-powered processing to:  
  - Summarize proposal content.  
  - Extract key topics.  
  - Generate:  
    - Insights  
    - Justifications  
    - Challenges  
    - Metrics  
    - Alternatives  
    - Effects  
    - Risks  
    - Legal opinions  
    - Financial opinions  
    - Partner opinions  
    - Work plans  
    - Recommendations  
  - Conduct web research and return top relevant links.  
  - Store results in an easily accessible database.
   
## Additional Features   
- **Avoid Duplication of Efforts**:  
  Researchers will be directed to relevant existing data in the database if similar information has already been submitted by another research team. This feature will streamline the process and save time.  

- **MemGPT Integration**:  
  To overcome limitations on the amount of data the AI can process at a one time, we plan to implement the MemGPT concept, enabling the AI to handle larger datasets efficiently and retain context over extended interactions.  

### Research Team Side  
- View the comprehensive database of processed proposals.  
- Track the status of proposals across teams.  
- Submit research findings to support project acceptance or rejection.  

## Tech Stack  
- **Frontend**: [React]  
- **Backend**: [FastAPI]  
- **Database**: [MongoDB]  
- **AI**: [Together AI]  

## How to Run  

1. For Mac/Linux:
   ```bash
   chmod +x run.sh
   sh ./run.sh
2. For Windows
   ./run.ps1


## Usage  

### For Request Submission:  
1. Log in to the platform.  
2. Submit your proposal with required attachments.  
3. Review AI-generated insights and track progress.  

### For Research Teams:  
1. Log in to view proposal data.  
2. Submit research findings on assigned projects.  

## Benefits  
- Saves time in processing and researching proposals.  
- Enhances decision-making with AI insights.  
- Fosters collaboration across research teams.  
  
