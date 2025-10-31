# Gemini Project: Psykolog Webapp

This document provides an overview of the Psykolog Webapp project, its structure, and how to run it.

## Project Overview

This is a web application for a psychologist's practice. It includes features for booking appointments, messaging, and general information about the services offered.

The project is a monorepo with a frontend and a backend:

*   **Frontend:** A Next.js (React) application located in the `frontend` directory. It uses Tailwind CSS for styling.
*   **Backend:** A Flask (Python) application located in the `backend` directory. It provides a RESTful API for the frontend.
*   **Database:** A PostgreSQL database is used for data storage.

The entire application is containerized using Docker, and the services are orchestrated with `docker-compose`.

## Building and Running

The application is designed to be run with Docker.

**To build and run the application:**

```bash
docker-compose up --build
```

This will start the following services:

*   `frontend`: The Next.js frontend, accessible at `http://localhost:3000`
*   `backend`: The Flask backend, accessible at `http://localhost:5000`
*   `db`: The PostgreSQL database, accessible at `localhost:5432`

**To run in development mode:**

*   **Frontend:**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
*   **Backend:**
    ```bash
    cd backend
    pip install -r requirements.txt
    flask run
    ```

## Development Conventions

*   **Frontend:**
    *   The frontend code is written in TypeScript.
    *   Components are located in `frontend/src/components`.
    *   Pages are located in `frontend/src/app`.
    *   Styling is done with Tailwind CSS.
*   **Backend:**
    *   The backend is a Flask application.
    *   Database models are defined in `backend/app/models`.
    *   API routes are defined in `backend/app/routes`.
*   **API Communication:** The frontend communicates with the backend via a RESTful API. The API endpoint is configured in `frontend/.env` and `docker-compose.yml`.
