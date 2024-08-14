# SOP Management System

Welcome to the SOP Management System project! This project is designed to help organizations manage their Standard Operating Procedures (SOPs) efficiently. The system includes features for SOP quality assessment, compliance checking, collaborative editing, and more.

https://sop-management-system.onrender.com/

## Contact Developers: [New Horizon College of Engineering, AIML Dept.]
- Yash Tawde yashtawde9@gmail.com
- Rahul Jauhari rj.rahul.jauhari@gmail.com

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- Automated SOP Quality Assessment
- SOP Validation and Compliance Checker
- Intelligent SOP Update Suggestions
- SOP Change Detection and Logging
- Automated SOP Gap Analysis
- SOP Enhancement through Expert Collaboration
- Knowledge Session Scheduler and Tracker
- SOP Control Capture and Verification
- Automation of SOP-related Macros
- Real-time SOP Monitoring and Alerts

## Installation

### Prerequisites

- Node.js
- npm
- MongoDB

### Clone the repository:

   ```powershell
   git clone https://github.com/yourusername/sopManagement.git
   ```

### Backend Setup

1. Navigate to the backend folder:
   
   ```powershell
   cd sopManagement/backend
   ```
2. Install dependencies:

   ```powershell
   npm install
   ```
3. Create a '.env' file in the backend folder and add your MongoDB URI and OpenAI API key:

   ```powershell
      touch .env
   ```

   ```powershell
      MONGODB_URI=your_mongodb_uri # Add the connection string from MongoDB.
      OPENAI_API_KEY=your_openai_api_key # Get yourself an API key from OpenAI.
      PORT=5000
      JWT_SECRET=fcf1a6f95f12b2c7c7e6de816f2b58d2a0b1d15c4fbbd5b88ff1c2ef80bbbc70
   ```
4.  Start the backend server:

    ```powershell
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend folder:
   
   ```powershell
   cd ../frontend
   ```
2. Install dependencies:
   
   ```powershell
   npm install
   ```
   
7. Start the frontend server:

   ```powershell
    npm start
   ```

### Usage
Open your browser and navigate to http://localhost:3000.
Use the web interface to manage SOPs, assess quality, collaborate, and more.

## API Documentation

### 1. Create SOP
- Endpoint: `POST /api/sops/create`
- Input:
  ```json
  {
    "title": "SOP Title",
    "content": "SOP Content"
  }
  ```
- Output:
  ```json
  {
    "_id": "sopId",
    "title": "SOP Title",
    "content": "SOP Content",
    "qualityScore": 0,
    "complianceStatus": "Not Checked",
    "changeLogs": [],
    "controls": [],
    "createdAt": "2024-07-13T00:00:00.000Z"
  }
  ```

### 2. Assess SOP Quality
- Endpoint: `GET /api/sops/assess/:id`
- Input: SOP ID as a URL parameter.
- Output:
  ```json
  {
    "_id": "sopId",
    "title": "SOP Title",
    "content": "SOP Content",
    "qualityScore": 85,
    "complianceStatus": "Not Checked",
    "changeLogs": [],
    "controls": [],
    "createdAt": "2024-07-13T00:00:00.000Z"
  }
  ```

### 3. Generate AI Suggestions
- Endpoint: `POST /api/ai/suggestions`
- Input:
  ```json
  {
    "content": "SOP Content"
  }
  ```
- Output:
  ```json
  {
    "suggestions": "Generated AI Suggestions"
  }
  ```

### 4. Validate SOP Compliance
- Endpoint: `GET /api/sops/validate/:id`
- Input: SOP ID as a URL parameter.
- Output:
  ```json
  {
    "_id": "sopId",
    "title": "SOP Title",
    "content": "SOP Content",
    "qualityScore": 85,
    "complianceStatus": "Compliant",
    "changeLogs": [],
    "controls": [],
    "createdAt": "2024-07-13T00:00:00.000Z"
  }
  ```

### 5. Log Change to SOP
- Endpoint: `POST /api/sops/log/:id`
- Input:
  ```json
  {
    "change": "Description of the change"
  }
  ```
- Output:
  ```json
  {
    "_id": "sopId",
    "title": "SOP Title",
    "content": "SOP Content",
    "qualityScore": 85,
    "complianceStatus": "Compliant",
    "changeLogs": [
      {
        "change": "Description of the change",
        "changedAt": "2024-07-13T00:00:00.000Z"
      }
    ],
    "controls": [],
    "createdAt": "2024-07-13T00:00:00.000Z"
  }
  ```

### 6. Perform Gap Analysis on SOP
- Endpoint: `GET /api/sops/gap-analysis/:id`
- Input: SOP ID as a URL parameter.
- Output:
  ```json
  {
    "gaps": [
      "Missing section on compliance",
      "Outdated information in section 2"
    ]
  }
  ```

### 7. Add Control to SOP
- Endpoint: `POST /api/sops/control/:id`
- Input:
  ```json
  {
    "control": "Description of the control"
  }
  ```
- Output:
  ```json
  {
    "_id": "sopId",
    "title": "SOP Title",
    "content": "SOP Content",
    "qualityScore": 85,
    "complianceStatus": "Compliant",
    "changeLogs": [],
    "controls": [
      {
        "control": "Description of the control",
        "status": "Not Verified",
        "verifiedAt": null
      }
    ],
    "createdAt": "2024-07-13T00:00:00.000Z"
  }
  ```

### 8. Verify Control in SOP
- Endpoint: `PUT /api/sops/control/:id/:controlId`
- Input: SOP ID and Control ID as URL parameters.
- Output:
  ```json
  {
    "_id": "sopId",
    "title": "SOP Title",
    "content": "SOP Content",
    "qualityScore": 85,
    "complianceStatus": "Compliant",
    "changeLogs": [],
    "controls": [
      {
        "control": "Description of the control",
        "status": "Verified",
        "verifiedAt": "2024-07-13T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-07-13T00:00:00.000Z"
  }
  ```

### 9. Add Collaboration Suggestion
- Endpoint: `POST /api/collaborations/add`
- Input:
  ```json
  {
    "sopId": "sopId",
    "expertName": "Expert Name",
    "suggestions": "Collaboration suggestions"
  }
  ```
- Output:
  ```json
  {
    "_id": "collaborationId",
    "sopId": "sopId",
    "expertName": "Expert Name",
    "suggestions": "Collaboration suggestions",
    "createdAt": "2024-07-13T00:00:00.000Z"
  }
  ```

### License
This project is licensed under the MIT License. See the LICENSE file for more details.

