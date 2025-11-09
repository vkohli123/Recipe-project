package com.example.recipes.service;

import com.example.recipes.exception.ResourceNotFoundException;
import com.example.recipes.model.Recipe;
import com.example.recipes.repository.RecipeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

public class RecipeServiceUnitTest {

    @Mock
    private RecipeRepository repository;

    @InjectMocks
    private RecipeService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getRecipeById_notFound_throws() {
        when(repository.findById(123L)).thenReturn(Optional.empty());
        assertThatThrownBy(() -> service.getRecipeById(123L))
                .isInstanceOf(ResourceNotFoundException.class);
    }

    @Test
    void searchRecipes_pageable_delegatesToRepo() {
        Recipe r = Recipe.builder().id(1L).name("Pizza").cuisine("Italian").build();
        Page<Recipe> page = new PageImpl<>(List.of(r));
        when(repository.searchByNameOrCuisine(any(String.class), any())).thenReturn(page);
        Page<Recipe> result = service.searchRecipes("pizza", 0, 10);
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getName()).isEqualTo("Pizza");
    }
}
