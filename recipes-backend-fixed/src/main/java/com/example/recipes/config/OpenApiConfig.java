package com.example.recipes.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    @Bean
    public OpenAPI recipesOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Recipes API")
                        .version("1.0.0")
                        .description("API to search and fetch recipes (in-memory H2 DB)"));
    }
}
