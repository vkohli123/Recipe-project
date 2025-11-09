package com.example.recipes.service;

import com.example.recipes.external.ExternalRecipeClient;
import com.example.recipes.model.Recipe;
import com.example.recipes.repository.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;

import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@DataJpaTest
@Import(RecipeService.class)
public class LoadRecipesFlowTest {

    @Autowired
    private RecipeService service;

    @Autowired
    private RecipeRepository repository;

    @MockBean
    private ExternalRecipeClient client;

    @BeforeEach
    void setup() {
        repository.deleteAll();
        Recipe existing = Recipe.builder().id(99L).name("Existing").cuisine("Test").cookTimeMinutes(1).build();
        repository.save(existing);
    }

    @Test
    void loadRecipesFromAPI_success_persistsData() {
        Map<String, Object> payload = Map.of("recipes", List.of(Map.of(
                "id", 1,
                "name", "Loaded",
                "cuisine", "Italian",
                "cookTimeMinutes", 10
        )));
        when(client.fetch()).thenReturn(payload);
        service.loadRecipesFromAPI();
        assertThat(repository.count()).isEqualTo(1); // replaced existing
        assertThat(repository.findById(1L)).isPresent();
    }

    @Test
    void loadRecipesFromAPI_empty_keepsExisting() {
        when(client.fetch()).thenReturn(Map.of("recipes", List.of()));
        service.loadRecipesFromAPI();
        assertThat(repository.count()).isEqualTo(1); // existing untouched
        assertThat(repository.findById(99L)).isPresent();
    }
}