package com.example.recipes.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Recipe {
    @Id
    private Long id;
    @NotBlank(message = "name must not be blank")
    private String name;

    @NotBlank(message = "cuisine must not be blank")
    private String cuisine;

    @NotNull
    @Min(value = 0, message = "cookTimeMinutes must be non-negative")
    private Integer cookTimeMinutes;

    private String tags;

    @Column(length = 1000)
    @Size(max = 1000, message = "instructions must be at most 1000 chars")
    private String instructions;

    private String image;

    @Column(length = 2000)
    private String ingredients;

    private Integer prepTimeMinutes;
    private Integer servings;
    private String difficulty;
    private Integer caloriesPerServing;
    private Double rating;
    private Integer reviewCount;
    private String mealType;
    private Long userId;
}
