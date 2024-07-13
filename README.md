# SOP Management System

Welcome to the SOP Management System project! This project is designed to help organizations manage their Standard Operating Procedures (SOPs) efficiently. The system includes features for SOP quality assessment, compliance checking, collaborative editing, and more.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Automated SOP Quality Assessment**
- **SOP Validation and Compliance Checker**
- **Intelligent SOP Update Suggestions**
- **SOP Change Detection and Logging**
- **Automated SOP Gap Analysis**
- **SOP Enhancement through Expert Collaboration**
- **Knowledge Session Scheduler and Tracker**
- **SOP Control Capture and Verification**
- **Automation of SOP-related Macros**
- **Real-time SOP Monitoring and Alerts**

## Project Structure

Here is the file structure of the project:

sopManagement/
├── backend/
│ ├── config/
│ │ └── db.js
│ ├── controllers/
│ │ ├── alertController.js
│ │ ├── aiService.js
│ │ ├── collaborationController.js
│ │ ├── knowledgeSessionController.js
│ │ ├── macroController.js
│ │ ├── sopController.js
│ ├── models/
│ │ ├── Alert.js
│ │ ├── Collaboration.js
│ │ ├── KnowledgeSession.js
│ │ ├── Macro.js
│ │ ├── SOP.js
│ ├── routes/
│ │ ├── alertRoutes.js
│ │ ├── aiRoutes.js
│ │ ├── collaborationRoutes.js
│ │ ├── knowledgeSessionRoutes.js
│ │ ├── macroRoutes.js
│ │ ├── sopRoutes.js
│ ├── services/
│ │ └── aiService.js
│ └── server.js
├── frontend/
│ ├── public/
│ └── src/
│ ├── components/
│ │ ├── SOPForm.js
│ │ ├── AssessQuality.js
│ │ ├── AISuggestions.js
│ │ ├── Collaboration.js
│ │ ├── KnowledgeSession.js
│ ├── pages/
│ │ └── Home.js
│ ├── services/
│ │ └── api.js
│ └── App.js
└── package.json

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB

### Backend Setup

1. Clone the repository:
   git clone https://github.com/yourusername/sopManagement.git
   cd sopManagement/backend

2. Install dependencies:
   npm install
3. Create a .env file and add your MongoDB URI and OpenAI API key:
   touch .env
   MONGODB_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_api_key

4. npm start [Start the backend server.]
5. cd ../frontend
6. Install dependencies [npm install]
7. npm start [Start the frontend server.]

Usage
Open your browser and navigate to http://localhost:3000.
Use the web interface to manage SOPs, assess quality, collaborate, and more.


License
This project is licensed under the MIT License. See the LICENSE file for more details.

