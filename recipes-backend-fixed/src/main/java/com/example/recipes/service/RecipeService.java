package com.example.recipes.service;

import com.example.recipes.model.Recipe;
import com.example.recipes.repository.RecipeRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
// retry handled in ExternalRecipeClient
import org.springframework.retry.annotation.Recover;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.annotation.Validated;
import java.util.*;

@Service
@Validated
public class RecipeService {

    @Autowired
    private RecipeRepository repository;

    private static final Logger logger = LoggerFactory.getLogger(RecipeService.class);

    @Autowired
    private com.example.recipes.external.ExternalRecipeClient externalRecipeClient;

    // Note: HTTP calls are handled in ExternalRecipeClient. Add new HTTP logic via a dedicated client if needed.

    /**
     * Loads recipes from external API and saves to DB. Optimized and resilient call recommended.
     * Refactored for clarity and maintainability.
     */
    @SuppressWarnings("unchecked")
    @CacheEvict(value = {"recipes", "recipesList", "recipesPage"}, allEntries = true)
    public void loadRecipesFromAPI() {
        Map<String, Object> response = externalRecipeClient.fetch();
        if (response == null || !response.containsKey("recipes")) {
            logger.warn("External API returned no recipes data");
            return;
        }
        List<Map<String, Object>> recipesList = (List<Map<String, Object>>) response.get("recipes");
        if (recipesList == null || recipesList.isEmpty()) {
            logger.warn("External API returned an empty recipes list");
            return;
        }
        List<Recipe> recipes = new ArrayList<>();
        for (Map<String, Object> r : recipesList) {
            Recipe recipe = Recipe.builder()
                    .id(Long.valueOf(r.get("id").toString()))
                    .name((String) r.get("name"))
                    .cuisine((String) r.get("cuisine"))
                    .cookTimeMinutes((Integer) r.get("cookTimeMinutes"))
                    .tags(joinOrString(r.get("tags"), ","))
                    .instructions(joinOrString(r.get("instructions"), " "))
                    .image((String) r.get("image"))
                    .ingredients(joinOrString(r.get("ingredients"), ", "))
                    .prepTimeMinutes((Integer) r.get("prepTimeMinutes"))
                    .servings((Integer) r.get("servings"))
                    .difficulty((String) r.get("difficulty"))
                    .caloriesPerServing((Integer) r.get("caloriesPerServing"))
                    .rating(r.get("rating") != null ? ((Number) r.get("rating")).doubleValue() : null)
                    .reviewCount((Integer) r.get("reviewCount"))
                    .mealType(joinOrString(r.get("mealType"), ", "))
                    .userId(r.get("userId") != null ? Long.valueOf(r.get("userId").toString()) : null)
                    .build();
            recipes.add(recipe);
        }
        repository.deleteAll();
        repository.saveAll(recipes);
        logger.info("Loaded {} recipes into DB", recipes.size());
    }

    // Helper to join list or fallback to string
    private String joinOrString(Object obj, String delimiter) {
        if (obj instanceof List<?>) {
            return String.join(delimiter, ((List<?>) obj).stream().map(Object::toString).toList());
        } else if (obj != null) {
            return obj.toString();
        }
        return "";
    }


    @Recover
    public void loadRecipesFromAPIRecover(Exception ex) {
        logger.error("Recovering from failed attempts to load external recipes: {}", ex.getMessage());
        // Fallback: keep existing DB contents and log. Could publish an event or alert here.
    }

    /**
     * Free text search for recipes by name or cuisine.
     * Refactored for clarity.
     */
    @Cacheable(value = "recipesList")
    public List<Recipe> searchRecipes(String query) {
        logger.info("Searching recipes with query: {}", query);
        return repository.searchByNameOrCuisine(query.trim());
    }

    @Cacheable(value = "recipesPage", key = "#query + '-' + #page + '-' + #size")
    public Page<Recipe> searchRecipes(String query, int page, int size) {
        logger.info("Searching recipes with query: {} page:{} size:{}", query, page, size);
        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, size));
        return repository.searchByNameOrCuisine(query.trim(), pageable);
    }

    /**
     * Return all recipes in the DB.
     * Refactored for clarity.
     */
    @Cacheable(value = "recipesList")
    public List<Recipe> getAllRecipes() {
        logger.info("Fetching all recipes");
        return repository.findAll();
    }

    @Cacheable(value = "recipesPage", key = "#page + '-' + #size")
    public Page<Recipe> getAllRecipes(int page, int size) {
        logger.info("Fetching all recipes page:{} size:{}", page, size);
        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, size));
        return repository.findAll(pageable);
    }

    /**
     * Get recipe by ID.
     * Refactored for clarity.
     */
    @Cacheable(value = "recipes", key = "#id")
    public Recipe getRecipeById(@NotNull Long id) {
        logger.info("Fetching recipe by id: {}", id);
        return repository.findById(java.util.Objects.requireNonNull(id))
                .orElseThrow(() -> new com.example.recipes.exception.ResourceNotFoundException("Recipe not found with id: " + id));
    }
}
