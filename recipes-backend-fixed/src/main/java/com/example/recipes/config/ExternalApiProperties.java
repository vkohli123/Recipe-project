package com.example.recipes.config;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@ConfigurationProperties(prefix = "external.api")
@Validated
@Getter
@Setter
public class ExternalApiProperties {

    @NotBlank
    private String url;

    @Min(1)
    private int retryMaxAttempts = 3;

    @Min(100)
    private long retryDelay = 2000; // milliseconds
}