package com.example.recipes.controller;

import com.example.recipes.model.Recipe;
import com.example.recipes.service.RecipeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RecipeController.class)
public class RecipeControllerUnitTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private RecipeService service;

    @Test
    void listAllRecipes_returnsList() throws Exception {
        Recipe r1 = Recipe.builder().id(1L).name("A").cuisine("C").cookTimeMinutes(10).build();
        when(service.getAllRecipes()).thenReturn(List.of(r1));

        mvc.perform(get("/api/recipes").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void getRecipeById_validId_returnsRecipe() throws Exception {
        Recipe r = Recipe.builder().id(1L).name("X").cuisine("Y").cookTimeMinutes(5).build();
        when(service.getRecipeById(1L)).thenReturn(r);

        mvc.perform(get("/api/recipes/1").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("X"));
    }

    @Test
    void getRecipeById_negativeId_returnsBadRequest() throws Exception {
        mvc.perform(get("/api/recipes/-1").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }
}
