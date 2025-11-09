package com.example.recipes.config;

import com.example.recipes.service.RecipeService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import lombok.RequiredArgsConstructor;

@Component                      // ① Marks this class as a Spring-managed bean
@RequiredArgsConstructor         // ② Auto-generates constructor for final fields (Lombok)
public class DataLoader implements CommandLineRunner { // ③ Runs once when app starts

    private final RecipeService recipeService;          // ④ Dependency injected automatically

    @Override
    public void run(String... args) {                   // ⑤ Entry point at startup
        recipeService.loadRecipesFromAPI();             // ⑥ Calls your service to load API → H2
        System.out.println("✅ Recipes loaded into H2 successfully!");
    }
}
