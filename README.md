# 🍳 Recipe Management Application

[![Java](https://img.shields.io/badge/Java-17-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)

A modern, full-stack recipe management application built with **Spring Boot** and **React**. This project demonstrates enterprise-level architecture, best practices in software development, and comprehensive testing strategies.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Key Features](#key-features)
- [Architecture & Design Patterns](#architecture--design-patterns)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Environment Configuration](#environment-configuration)
- [Screenshots](#screenshots)
- [Future Enhancements](#future-enhancements)

---

## 🎯 Overview

This is a production-ready recipe management system that allows users to browse, search, filter, and sort recipes. The application fetches data from external APIs, stores it in a relational database, and provides a responsive, accessible frontend interface.

**Live Demo:** [Add your deployed URL here]

---

## 🛠 Tech Stack

### Backend
- **Java 17** - Modern Java with latest LTS features
- **Spring Boot 3.2.5** - Enterprise-grade framework
- **Spring Data JPA** - Database abstraction layer
- **H2 Database** - In-memory database for development
- **Spring Validation** - Bean validation
- **Spring Retry** - Resilient external API calls
- **Resilience4j** - Circuit breaker pattern
- **Caffeine Cache** - High-performance caching
- **Spring Actuator** - Health monitoring
- **SpringDoc OpenAPI** - API documentation
- **Lombok** - Reduced boilerplate code
- **JaCoCo** - Code coverage reporting (80% minimum)
- **WireMock** - Integration testing with mocked APIs

### Frontend
- **React 18.3** - Modern UI library
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client with interceptors
- **Lucide React** - Modern icon library
- **Vitest** - Unit testing framework
- **React Testing Library** - Component testing
- **ESLint** - Code quality

### DevOps & Tools
- **Maven** - Dependency management & build automation
- **Git** - Version control
- **npm** - Frontend package management

---

## ✨ Key Features

### Backend Features
- ✅ **RESTful API** with proper HTTP status codes
- ✅ **External API Integration** - Fetch recipes from DummyJSON
- ✅ **Database Persistence** - JPA/Hibernate with H2
- ✅ **Input Validation** - Request validation with detailed error messages
- ✅ **Global Exception Handling** - Structured error responses
- ✅ **Caching Strategy** - Multi-layer caching with cache eviction
- ✅ **Circuit Breaker** - Resilience4j for fault tolerance
- ✅ **Retry Mechanism** - Spring Retry for transient failures
- ✅ **Health Checks** - Actuator endpoints for monitoring
- ✅ **API Documentation** - Swagger UI (OpenAPI 3.0)
- ✅ **Comprehensive Logging** - Structured logging across layers
- ✅ **80%+ Test Coverage** - Unit & integration tests

### Frontend Features
- ✅ **Responsive Design** - Mobile-first approach with Tailwind
- ✅ **Search Functionality** - Real-time recipe search
- ✅ **Client-Side Filtering** - Filter by tags/cuisine
- ✅ **Client-Side Sorting** - Sort by cook time (ascending/descending)
- ✅ **Lazy Loading** - Code-splitting with React.lazy & Suspense
- ✅ **Error Boundary** - Graceful error handling
- ✅ **Accessibility** - ARIA labels and semantic HTML
- ✅ **Atomic Design** - Component structure (atoms/molecules/organisms)
- ✅ **Centralized API Client** - Axios interceptors
- ✅ **Environment Configuration** - Multi-environment support
- ✅ **Unit Tests** - Vitest with Testing Library
- ✅ **Code Coverage** - 80%+ coverage target

---

## 🏗 Architecture & Design Patterns

### Backend Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Spring Boot Backend                   │
├─────────────────────────────────────────────────────────┤
│  Controller Layer    → REST endpoints, validation        │
│  Service Layer       → Business logic, caching           │
│  Repository Layer    → Data access (JPA)                 │
│  External API Layer  → Third-party integration           │
│  Exception Handler   → Global error handling             │
│  Config Layer        → Caching, retry, circuit breaker   │
└─────────────────────────────────────────────────────────┘
```

**Design Patterns Implemented:**
- **Repository Pattern** - Data access abstraction
- **Service Layer Pattern** - Business logic separation
- **DTO Pattern** - Data transfer objects
- **Exception Handler Pattern** - Centralized error handling
- **Circuit Breaker Pattern** - Fault tolerance
- **Retry Pattern** - Resilience for transient failures
- **Cache-Aside Pattern** - Performance optimization

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
├─────────────────────────────────────────────────────────┤
│  Organisms      → RecipeGridView (complex components)    │
│  Molecules      → SearchBar, TagFilterGroup              │
│  Atoms          → Button, Badge, RecipeCard              │
│  Utils/Lib      → API client, debounce, mappers          │
│  Config         → Environment variables                  │
└─────────────────────────────────────────────────────────┘
```

**Design Patterns Implemented:**
- **Atomic Design** - Scalable component hierarchy
- **Container/Presentational Pattern** - Separation of concerns
- **Error Boundary Pattern** - Error isolation
- **Custom Hooks** - Reusable logic (useImagePreload)
- **Higher-Order Components** - Error boundaries

---

## 📁 Project Structure

```
recipes-project/
├── recipes-backend-fixed/          # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/recipes/
│   │   │   │   ├── RecipesApplication.java
│   │   │   │   ├── config/         # Caching, retry config
│   │   │   │   ├── controller/     # REST controllers
│   │   │   │   ├── exception/      # Global exception handler
│   │   │   │   ├── external/       # External API client
│   │   │   │   ├── health/         # Custom health checks
│   │   │   │   ├── model/          # JPA entities
│   │   │   │   ├── repository/     # Spring Data repositories
│   │   │   │   └── service/        # Business logic
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── application-dev.properties
│   │   │       └── application-test.properties
│   │   └── test/
│   │       └── java/com/example/recipes/
│   │           ├── controller/     # Controller tests
│   │           ├── service/        # Service tests
│   │           └── integration/    # Integration tests
│   ├── pom.xml
│   └── README.md
│
└── recipes-frontend/               # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── atoms/              # Basic building blocks
    │   │   ├── molecules/          # Simple component groups
    │   │   ├── organisms/          # Complex components
    │   │   └── __tests__/          # Component tests
    │   ├── config/                 # Environment config
    │   ├── lib/                    # Utilities & API client
    │   ├── App.jsx                 # Main application
    │   └── main.jsx                # Entry point
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    └── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Java 17+** ([Download](https://www.oracle.com/java/technologies/downloads/))
- **Maven 3.6+** ([Download](https://maven.apache.org/download.cgi))
- **Node.js 18+** ([Download](https://nodejs.org/))
- **npm** or **yarn**

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/vkohli123/Recipe-project.git
   cd Recipe-project/recipes-backend-fixed
   ```

2. **Build the project**
   ```bash
   mvn clean install
   ```

3. **Run the application**
   ```bash
   mvn spring-boot:run
   ```
   
   Or with dev profile:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   ```

4. **Access the application**
   - API: http://localhost:8080/api
   - Swagger UI: http://localhost:8080/swagger-ui.html
   - Health Check: http://localhost:8080/actuator/health

5. **Load initial data**
   ```bash
   curl -X POST http://localhost:8080/api/load
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd recipes-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173

5. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

---

## 📚 API Documentation

### Endpoints

#### Load Recipes
```http
POST /api/load
```
Fetches recipes from external API and stores them in the database.

**Response:** `200 OK`
```json
{
  "message": "Loaded 50 recipes successfully"
}
```

#### Get All Recipes
```http
GET /api/recipes?query={searchTerm}
```
Retrieves all recipes with optional search.

**Query Parameters:**
- `query` (optional) - Search by recipe name or cuisine

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Classic Margherita Pizza",
    "ingredients": ["..."],
    "instructions": ["..."],
    "prepTimeMinutes": 20,
    "cookTimeMinutes": 15,
    "servings": 4,
    "difficulty": "Easy",
    "cuisine": "Italian",
    "caloriesPerServing": 300,
    "tags": ["Italian", "Pizza"],
    "image": "https://...",
    "rating": 4.6,
    "reviewCount": 98
  }
]
```

#### Get Recipe by ID
```http
GET /api/recipes/{id}
```
Retrieves a specific recipe by ID.

**Path Parameters:**
- `id` - Recipe ID (must be positive)

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Classic Margherita Pizza",
  ...
}
```

**Error Response:** `404 Not Found`
```json
{
  "timestamp": "2025-11-09T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Recipe not found with id: 999",
  "path": "/api/recipes/999"
}
```

### Interactive API Documentation
Visit **Swagger UI** at `http://localhost:8080/swagger-ui.html` for interactive API exploration.

---

## 🧪 Testing

### Backend Testing

**Run all tests:**
```bash
cd recipes-backend-fixed
mvn test
```

**Generate coverage report:**
```bash
mvn clean verify
```
View coverage report: `target/site/jacoco/index.html`

**Test Coverage:** 80%+ (enforced by JaCoCo)

**Test Types:**
- ✅ Unit Tests (Service layer with mocked repositories)
- ✅ Controller Tests (MockMvc)
- ✅ Integration Tests (WireMock for external APIs)

### Frontend Testing

**Run tests:**
```bash
cd recipes-frontend
npm test
```

**Run with coverage:**
```bash
npm run test:coverage
```
View coverage report: `coverage/index.html`

**Test Coverage:** 80%+ target

**Test Types:**
- ✅ Component Tests (React Testing Library)
- ✅ Hook Tests
- ✅ Utility Function Tests

---

## ⚙️ Environment Configuration

### Backend Configuration

**Default Properties** (`application.properties`):
```properties
spring.datasource.url=jdbc:h2:mem:recipesdb
spring.datasource.driverClassName=org.h2.Driver
spring.jpa.hibernate.ddl-auto=create-drop
external.api.url=https://dummyjson.com/recipes
```

**Environment Variables:**
```bash
export EXTERNAL_API_URL=https://your-api.com/recipes
export SPRING_PROFILES_ACTIVE=dev
```

### Frontend Configuration

**Environment Files:**
- `.env` - Production settings
- `.env.development` - Development settings

**Example** (`.env.development`):
```env
VITE_API_URL=http://localhost:8080/api
```

---

## 📸 Screenshots

### Recipe Grid View
![Recipe Grid](docs/screenshots/recipe-grid.png)
*Responsive grid layout with search and filter capabilities*

### Recipe Modal
![Recipe Details](docs/screenshots/recipe-modal.png)
*Detailed recipe view with ingredients and instructions*

### Mobile View
![Mobile Responsive](docs/screenshots/mobile-view.png)
*Mobile-first responsive design*

---

## 🔮 Future Enhancements

### Backend
- [ ] User authentication & authorization (Spring Security + JWT)
- [ ] PostgreSQL for production database
- [ ] Redis for distributed caching
- [ ] Recipe ratings and reviews API
- [ ] Pagination for large datasets
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Deploy to cloud (AWS/Azure/GCP)

### Frontend
- [ ] User authentication UI
- [ ] Create/Edit/Delete recipes
- [ ] Image upload functionality
- [ ] Recipe favorites & collections
- [ ] E2E tests (Cypress/Playwright)
- [ ] PWA support
- [ ] Dark mode
- [ ] Internationalization (i18n)
- [ ] Advanced filtering (multi-select, ranges)
- [ ] Virtual scrolling for large lists
- [ ] Error monitoring (Sentry)

---

## 👨‍💻 Developer

**Vedant Kohli**
- GitHub: [@vkohli123](https://github.com/vkohli123)
- LinkedIn: [Add your LinkedIn profile]
- Email: vedant.kohliyahoo.com

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [DummyJSON](https://dummyjson.com/) for providing the recipe API
- Spring Boot community for excellent documentation
- React and Vite teams for amazing developer experience

---

**⭐ If you find this project helpful, please give it a star!**

---

*Built with ❤️ to demonstrate full-stack development skills*
