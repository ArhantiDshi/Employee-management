# Employee Management API

A production-style RESTful Employee Management API built with **Java 21 and Spring Boot**.

The project demonstrates a layered backend architecture with CRUD operations, validation, filtering, pagination, sorting, authentication, centralized exception handling, Swagger/OpenAPI documentation, automated testing, MySQL persistence, and Docker containerization.

## 🚀 Features

- Create employee
- Get employee by ID
- Update employee
- Delete employee
- Get employees with pagination
- Search employees
- Filter by department
- Filter by employee status
- Sort employee results
- Request validation
- Duplicate email validation
- Centralized exception handling
- Spring Security authentication
- Swagger/OpenAPI documentation
- Unit testing
- Controller testing
- MySQL database
- Dockerized application
- Docker Compose setup
- Environment-based configuration

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Java 21 | Programming language |
| Spring Boot | Backend framework |
| Spring Data JPA | Data access |
| Hibernate | ORM |
| MySQL 8 | Relational database |
| Spring Security | Authentication |
| Swagger / OpenAPI | API documentation |
| JUnit | Testing |
| Mockito | Mock-based testing |
| Maven | Build and dependency management |
| Docker | Containerization |
| Docker Compose | Multi-container setup |

## 🏗️ Architecture

The application follows a layered architecture:

```text
                    Client
                      |
                      v
              REST Controller
                      |
                      v
                 Service Layer
                      |
                      v
               Repository Layer
                      |
                      v
                    MySQL
```

Supporting components include:

```text
DTOs
  |
Validation
  |
Exception Handling
  |
Security
  |
JPA Specifications
  |
OpenAPI / Swagger
  |
Unit & Controller Tests
```

## 📁 Project Structure

```text
src/main/java/com/portfolio/employee_management_api
│
├── config
│   ├── OpenApiConfig.java
│   └── SecurityConfig.java
│
├── controller
│   └── EmployeeController.java
│
├── dto
│   ├── EmployeePageResponse.java
│   └── EmployeeRequest.java
│
├── entity
│   ├── Employee.java
│   └── EmployeeStatus.java
│
├── exception
│   ├── DuplicateEmailException.java
│   ├── DuplicateEmployeeException.java
│   ├── EmployeeNotFoundException.java
│   └── GlobalExceptionHandler.java
│
├── repository
│   └── EmployeeRepository.java
│
├── service
│   ├── EmployeeService.java
│   └── impl
│       └── EmployeeServiceImpl.java
│
└── specification
    └── EmployeeSpecification.java
```

## 🔌 API Endpoints

### Create Employee

```http
POST /api/v1/employees
```

Creates a new employee.

### Get Employees

```http
GET /api/v1/employees
```

Supports:

- Search
- Department filtering
- Status filtering
- Pagination
- Sorting

Example:

```http
GET /api/v1/employees?search=john&department=IT&status=ACTIVE&page=0&size=5&sort=salary,desc
```

### Get Employee by ID

```http
GET /api/v1/employees/{id}
```

Returns a specific employee.

### Update Employee

```http
PUT /api/v1/employees/{id}
```

Updates an existing employee.

### Delete Employee

```http
DELETE /api/v1/employees/{id}
```

Deletes an employee.

## 🔐 Security

The application uses **Spring Security** with Basic Authentication.

API requests requiring authentication can be tested using:

```text
Authorization: Basic Authentication
```

Configure the appropriate username and password for your local environment.

## 📖 Swagger / OpenAPI

Swagger UI is available after starting the application:

```text
http://localhost:8080/swagger-ui/index.html
```

Swagger provides interactive documentation and allows the APIs to be tested directly from the browser.

## 🗄️ Database

The application uses **MySQL 8**.

Database configuration is externalized through environment variables.

Example:

```text
DB_URL=jdbc:mysql://mysql:3306/employee_management
DB_USERNAME=employee_app
DB_PASSWORD=employee_password
```

> Do not commit your `.env` file or production database credentials to GitHub.

## 🐳 Running with Docker

### Prerequisites

Install:

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