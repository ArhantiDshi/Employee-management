# Employee Management System

A full-stack employee management application built with React, Spring Boot, MySQL, and Docker. This project is designed to manage employee records, department assignments, status tracking, and essential HR operations through a clean and responsive dashboard.

It is structured as a portfolio-ready full-stack project that demonstrates frontend development, backend API design, database integration, authentication, validation, and deployment readiness.

## Why this project

This application solves a common business need: managing employee data in a centralized and structured way.

Organizations often need to:
- create and update employee records
- track department and employment status
- search and filter staff members
- review employee metrics in a dashboard
- ensure data validation and secure access

This project brings those operations together in a practical full-stack system.

## Features

- Employee CRUD operations
- Search, filter, and pagination
- Department-based organization
- Employment status tracking
- Dashboard summary cards
- Validation for employee data
- Duplicate email handling
- Secure backend with Spring Security
- REST API documentation via Swagger/OpenAPI
- MySQL persistence
- Dockerized setup for local development
- Automated backend tests

## Tech stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Java 21
- Spring Boot 4
- Spring Data JPA
- Spring Security
- Hibernate
- Maven

### Database
- MySQL 8

### DevOps / tooling
- Docker
- Docker Compose
- Swagger / OpenAPI
- JUnit / Mockito

## Architecture

The project follows a layered full-stack architecture:

```text
Frontend (React + TypeScript)
        |
        v
REST API (Spring Boot)
        |
        v
Service Layer
        |
        v
Repository / JPA Layer
        |
        v
MySQL Database
```

## Project structure

```text
employee-management-api/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/portfolio/employee_management_api/
│   │   │   └── resources/
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── Dockerfile
│   └── target/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── docker-compose.yml
├── README.md
├── .env
├── .gitignore
└── .dockerignore
```

## API overview

The backend exposes employee-related endpoints such as:

- GET /api/v1/employees
- GET /api/v1/employees/{id}
- POST /api/v1/employees
- PUT /api/v1/employees/{id}
- DELETE /api/v1/employees/{id}

The API supports:
- search
- sorting
- pagination
- department filtering
- employee status filtering

Swagger UI is available once the backend is running:

```text
http://localhost:8080/swagger-ui/index.html
```

## Screenshots

Add screenshots here for a more professional portfolio presentation:

- Dashboard
- Employee list
- Create employee form
- Edit employee form
- Mobile responsiveness

## Getting started

### Prerequisites

Make sure you have installed:
- Java 21+
- Maven
- Node.js 18+
- MySQL 8+
- Docker and Docker Compose

### 1) Clone the repository

```bash
git clone https://github.com/your-username/employee-management-api.git
cd employee-management-api
```

### 2) Start the backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

### 3) Start the frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

### 4) Run with Docker Compose

From the project root:

```bash
docker-compose up --build
```

This will start the app and MySQL service together.

## Environment variables

Create a local environment file if needed:

```env
DB_URL=jdbc:mysql://localhost:3306/employee_management
DB_USERNAME=root
DB_PASSWORD=root
SERVER_PORT=8080
```

> Keep real production credentials out of source control.

## Testing

Run backend tests:

```bash
cd backend
mvn test
```

## Portfolio value

This project demonstrates:
- full-stack development
- REST API design
- database integration
- security and validation
- testing discipline
- Docker-based development workflow
- real-world business application structure

That makes it a strong candidate for a software portfolio, internship profile, or job application.

## Future improvements

Potential upgrades for a stronger portfolio project:
- employee analytics charts
- CSV export
- user roles and authentication flow
- dark mode
- improved dashboard UX
- deployment to cloud hosting
- CI/CD pipeline with GitHub Actions
- admin activity logs

## Project status

This project is currently a working full-stack application and is suitable for portfolio use, further enhancement, and deployment.

## License

This project is for educational and portfolio purposes.

- Docker Desktop
- Git

Clone the repository:

```bash
git clone https://github.com/ArhantiDshi/Employee-management.git
```

Navigate to the project:

```bash
cd Employee-management
```

Create a local `.env` file with the required database configuration.

Start the application:

```bash
docker compose up -d
```

Check running containers:

```bash
docker compose ps
```

The application will be available at:

```text
http://localhost:8080
```

Swagger:

```text
http://localhost:8080/swagger-ui/index.html
```

Stop the application:

```bash
docker compose down
```

## 🧪 Testing

The project includes:

- Application context tests
- Service unit tests
- Controller tests
- Mockito-based mocking

Run the test suite using Maven:

### Windows

```powershell
.\mvnw.cmd test
```

### Linux / macOS

```bash
./mvnw test
```

## 🔎 Example Search

The employee API supports combining multiple filters.

Example:

```http
GET /api/v1/employees?search=john&department=IT&status=ACTIVE&page=0&size=5&sort=salary,desc
```

This request can:

- Search employee information
- Filter by IT department
- Filter active employees
- Return the first page
- Return up to 5 employees
- Sort by salary in descending order

## 💡 Engineering Highlights

This project demonstrates practical backend development concepts including:

- REST API design
- Layered architecture
- Dependency injection
- DTO-based request handling
- JPA/Hibernate persistence
- Dynamic filtering using JPA Specifications
- Pagination and sorting
- Bean validation
- Centralized exception handling
- Authentication and authorization
- Automated testing
- API documentation
- Containerization
- Environment-based configuration

## 📌 Future Enhancements

Potential future improvements include:

- JWT authentication
- Role-based authorization
- Global API response wrapper
- Database migration using Flyway
- CI/CD pipeline
- Integration tests using Testcontainers
- API rate limiting
- Production deployment to Azure
- Monitoring and logging

## 👩‍💻 Author

**Arhanti**

This project is part of a backend development and test automation portfolio demonstrating experience with Java, Spring Boot, REST APIs, databases, testing, Docker, and modern software development practices.