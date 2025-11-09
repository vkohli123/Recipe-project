package com.example.recipes.controller;

import com.example.recipes.model.Recipe;
import com.example.recipes.repository.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class RecipeControllerIntegrationTest {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private RecipeRepository repository;

    private String baseUrl() {
        return "http://localhost:" + port + "/api";
    }

    @BeforeEach
    public void setUp() {
        repository.deleteAll();
        // create a few sample recipes
        Recipe r1 = Recipe.builder()
                .id(1L)
                .name("Classic Margherita Pizza")
                .cuisine("Italian")
                .cookTimeMinutes(15)
                .tags("Pizza,Italian")
                .instructions("Bake pizza")
                .build();
        Recipe r4 = Recipe.builder()
                .id(4L)
                .name("Chicken Alfredo Pasta")
                .cuisine("Italian")
                .cookTimeMinutes(20)
                .tags("Pasta,Chicken")
                .instructions("Cook pasta")
                .build();
        Recipe r10 = Recipe.builder()
                .id(10L)
                .name("Shrimp Scampi Pasta")
                .cuisine("Italian")
                .cookTimeMinutes(20)
                .tags("Pasta,Shrimp")
                .instructions("Cook shrimp and pasta")
                .build();

        repository.saveAll(Arrays.asList(r1, r4, r10));
    }

    @Test
    public void listAllRecipes_returnsAll() {
        ResponseEntity<Recipe[]> resp = restTemplate.getForEntity(baseUrl() + "/recipes", Recipe[].class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        Recipe[] body = resp.getBody();
        assertThat(body).isNotNull();
        assertThat(body.length).isEqualTo(3);
    }

    @Test
    public void searchRecipes_queryPasta_returnsTwo() {
        ResponseEntity<Recipe[]> resp = restTemplate.getForEntity(baseUrl() + "/recipes?query=pasta", Recipe[].class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        Recipe[] body = resp.getBody();
        assertThat(body).isNotNull();
        List<Recipe> list = Arrays.asList(body);
        assertThat(list.size()).isEqualTo(2);
        assertThat(list).anyMatch(r -> r.getName().contains("Pasta") || (r.getTags() != null && r.getTags().toLowerCase().contains("pasta")));
    }

    @Test
    public void getRecipeById_found_returnsRecipe() {
        ResponseEntity<Recipe> resp = restTemplate.getForEntity(baseUrl() + "/recipes/1", Recipe.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        Recipe recipe = resp.getBody();
        assertThat(recipe).isNotNull();
        assertThat(recipe.getName()).isEqualTo("Classic Margherita Pizza");
    }

    @Test
    public void getRecipeById_notFound_returns404() {
        ResponseEntity<String> resp = restTemplate.getForEntity(baseUrl() + "/recipes/999", String.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
    }
}
