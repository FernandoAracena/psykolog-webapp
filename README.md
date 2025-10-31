# Web Application for Psykolog Miriam Heen Skotland

This is the web application for the practice of psychologist Miriam Heen Skotland. The project is built with a modern Next.js frontend and a Flask backend, all orchestrated with Docker for easy development and deployment.

## ✨ Features

- **Responsive Frontend:** Modern user interface built with Next.js, React, and Tailwind CSS.
- **Robust Backend:** RESTful API developed with Flask (Python).
- **User Authentication:** Login system for clients and the psychologist.
- **Dashboards:** Custom areas for authenticated users.
- **Database:** PostgreSQL for data persistence.
- **Containerization:** Fully configured with Docker and Docker Compose for a consistent development environment.
- **Interactive Map:** Google Maps integration on the contact page.

## 🛠️ Technologies Used

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Flask, Python
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## 🚀 Getting Started

Follow these steps to get the project up and running on your local environment.

### Prerequisites

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <YOUR_GITHUB_REPOSITORY_URL>
   cd psykolog-webapp
   ```

2. **Create the environment variables file:**
   Copy the example file `.env.example` and rename it to `.env`.
   ```bash
   # En Windows (Command Prompt)
   copy .env.example .env
   ```
   Then, open the `.env` file and fill in the values. **Do not commit this file to GitHub.**

3. **Build and run the containers:**
   This command will build the Docker images and start the frontend, backend, and database services.
   ```bash
   docker-compose up --build
   ```
   To run it in the background, add the `-d` flag:
   ```bash
   docker-compose up --build -d
   ```

4. **Ready!**
   - The **frontend** will be available at `http://localhost:3000`.
   - The **backend** will be available at `http://localhost:5000`.

## 📂 Project Structure

```
psykolog-webapp/
├── backend/         # Aplicación Flask (API)
├── frontend/        # Aplicación Next.js (UI)
├── .env.example     # Archivo de ejemplo para las variables de entorno
├── docker-compose.yml # Orquestación de los servicios
└── README.md        # Este archivo
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.