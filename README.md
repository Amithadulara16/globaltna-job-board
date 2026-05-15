Mini Service Request Board

Hello! This is my submission for the Full-Stack Developer Intern technical assessment at GlobalTNA. 

The goal of this project is to build a stripped-down, single-page version of a service request platform where homeowners can post jobs (like plumbing, electrical work, etc.) and tradespeople can view, update, and manage those requests.


Project Structure = 

I organized the project as a monorepo containing both the frontend and backend in separate folders to keep it clean and easy to run.


globaltna-job-board/

backend/           Node.js + Express API Server
    config/        Database connection
    controllers/   Request handlers (Business Logic)
    models/        Mongoose Schema definitions
    routes/        API endpoints definitions
    server.js      Entry point

frontend/          Next.js Web App (App Router)
  src/
    app/ 
        pages (Home, New Job, Job Details)
        new 
        jobs 
    components/   Reusable UI elements (JobCard, etc.)
    services/     API fetching logic
    types/        TypeScript interfaces
.gitignore 
README.md             Main documentation


01.Tech Stack & Architecture = 


1.Frontend (Next.js)
Built using Next.js (App Router) and TypeScript.
Styled with Tailwind CSS for a clean, responsive UI.
Replaced raw SVG codes with Lucide React icons to keep the codebase clean and human-readable.

2.Backend (Node.js & Express)
A standalone Express.js REST API.
Included global error handling and strict input validation.

3.Database (MongoDB & Mongoose)
Powered by MongoDB Atlas cloud database.
Used Mongoose ODM to manage data models, schemas, and queries

Design Patterns & Core Concepts Used
To write high-quality production code, I implemented the following standard software engineering practices:


02.MVC (Model-View-Controller) Architecture = 

I separated the backend logic into three distinct layers to make it maintainable:
Model: Mongoose schemas (backend/models/) define how the job request data looks.
View: The Next.js frontend acts as the View, rendering the data dynamically for users.

Controller: Express controller functions (backend/controllers/) handle the actual business logic, communication with MongoDB, and return proper HTTP JSON responses.

03.Object-Oriented Programming (OOP) Concepts = 

Encapsulation: The internal database operations and business logic are hidden inside controllers and services. The router only exposes the endpoint without knowing how the data is fetched or saved.
Data Modeling & Type Safety: Used TypeScript interfaces on the frontend to strictly define data shapes (like JobRequest). This ensures that properties cannot be accidentally changed or mistyped, mimicking strict object contract


Clone the Project = 

git clone <your-github-repository-url>
cd globaltna-job-board

Start the Backend Server = 

cd backend
npm install
npm run dev

Start the Frontend Application = 
Open a new terminal window, navigate to the frontend folder, and run:

cd frontend
npm install
npm run dev