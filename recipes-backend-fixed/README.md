# Recipes Backend

Small Spring Boot REST API for recipes (H2 in-memory DB).

## Endpoints

- POST /api/load - load recipes from external API into H2 database
- GET  /api/recipes - list all recipes; optional query param `query` to search by name or cuisine
- GET  /api/recipes/{id} - get recipe by id (id must be positive)

## Build & Run

Requirements: Java 17+, Maven

To build:

```bash
mvn -DskipTests package
```

To run:

```bash
mvn spring-boot:run
```

The app will start on port 8080 by default.

## Tests

Run unit/integration tests:

```bash
mvn test
```

## Configuration

Configuration is in `src/main/resources/application.properties`.

Key properties:

- `spring.datasource.*` - H2 in-memory DB used for dev
- `external.api.url` - external recipes API used by `/api/load` (default: https://dummyjson.com/recipes)

You can provide Spring profiles or override properties via environment variables.

Profiles and caching

- A `dev` profile is included in `src/main/resources/application-dev.properties`. Start with the dev profile:

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

- The application enables simple Spring caching for read endpoints to reduce DB pressure. Caches used: `recipes` (single resource), `recipesList` (unpaged list), `recipesPage` (paged results). When you call `POST /api/load` it will evict these caches so clients receive fresh data.

## Notes & Improvements

- Error responses are returned as structured JSON:
  ```json
  {
    "timestamp": "...",
    "status": 404,
    "error": "Not Found",
    "message": "Recipe not found with id: 123",
    "path": "/api/recipes/123"
  }
  ```

- Input validation added for path variables. Validation errors return HTTP 400 with details.
- Logging is added to controller, service and global exception handler.

Further planned improvements:
- Add unit tests for service layer (mock repository)
- Add code coverage reporting (JaCoCo)
- Add DTOs to separate API model from persistence model

*** End README ***
