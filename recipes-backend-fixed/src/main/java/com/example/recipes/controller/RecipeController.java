package com.example.recipes.controller;

import com.example.recipes.model.Recipe;
import com.example.recipes.service.RecipeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.constraints.Positive;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api")
@CrossOrigin
@Validated
public class RecipeController {

    private static final Logger logger = LoggerFactory.getLogger(RecipeController.class);

    @Autowired
    private RecipeService recipeService;

    /**
     * Endpoint to manually load recipes from external API into DB.
     */
    @PostMapping("/load")
    @Operation(summary = "Load recipes from external API", description = "Triggers a manual load of recipes from the external provider into the in-memory DB")
    public String loadRecipes() {
        logger.info("Manual load triggered via /api/load");
        recipeService.loadRecipesFromAPI();
        return "Recipes loaded successfully!";
    }

    /**
     * Endpoint to list or search recipes. Supports pagination and query alias.
     */
    @GetMapping("/recipes")
    @Operation(summary = "List or search recipes", description = "Returns all recipes when no pagination is supplied. Supply page & size to get a paged response. Use query or q for searching by name/cuisine.")
    public ResponseEntity<?> searchRecipes(
        @RequestParam(required = false) String query,
        @RequestParam(required = false, name = "q") @Parameter(description = "Alias for query") String q,
        @RequestParam(required = false) Integer page,
        @RequestParam(required = false) Integer size
    ) {
    // Support both 'query' and 'q' for compatibility
    String effectiveQuery = (query != null && !query.isBlank()) ? query : q;
    boolean isPaged = (page != null || size != null);

    // Add cache control headers for faster image loading
    CacheControl cacheControl = CacheControl.maxAge(5, TimeUnit.MINUTES).cachePublic();

    if (effectiveQuery == null || effectiveQuery.isBlank()) {
        if (!isPaged) {
        // Legacy behaviour: return all recipes as list
        return ResponseEntity.ok()
            .cacheControl(cacheControl)
            .body(recipeService.getAllRecipes());
        }
        int p = (page == null) ? 0 : page;
        int s = (size == null) ? 20 : size;
        var paged = recipeService.getAllRecipes(p, s);
        return ResponseEntity.ok()
            .cacheControl(cacheControl)
            .body(paged);
    }

    if (!isPaged) {
        return ResponseEntity.ok()
            .cacheControl(cacheControl)
            .body(recipeService.searchRecipes(effectiveQuery));
    }
    int p = (page == null) ? 0 : page;
    int s = (size == null) ? 20 : size;
    var paged = recipeService.searchRecipes(effectiveQuery, p, s);
    return ResponseEntity.ok()
        .cacheControl(cacheControl)
        .body(paged);
    }

    /**
     * Endpoint to get a recipe by its numeric ID.
     */
    @GetMapping("/recipes/{id}")
    @Operation(summary = "Get recipe by id", description = "Returns a single recipe by numeric id")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable @Positive(message = "id must be positive") Long id) {
        logger.info("GET /recipes/{}", id);
        CacheControl cacheControl = CacheControl.maxAge(10, TimeUnit.MINUTES).cachePublic();
        return ResponseEntity.ok()
                .cacheControl(cacheControl)
                .body(recipeService.getRecipeById(id));
    }
}
