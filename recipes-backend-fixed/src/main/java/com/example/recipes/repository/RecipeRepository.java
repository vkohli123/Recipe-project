package com.example.recipes.repository;

import com.example.recipes.model.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    @Query("SELECT r FROM Recipe r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(r.tags) LIKE LOWER(CONCAT('%', :query, '%'))")
    List<Recipe> searchByNameOrCuisine(@Param("query") String query);

    @Query("SELECT r FROM Recipe r WHERE LOWER(r.name) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(r.cuisine) LIKE LOWER(CONCAT('%', :query, '%')) OR LOWER(r.tags) LIKE LOWER(CONCAT('%', :query, '%'))")
    org.springframework.data.domain.Page<Recipe> searchByNameOrCuisine(@Param("query") String query, org.springframework.data.domain.Pageable pageable);
}
