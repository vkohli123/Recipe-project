package com.example.recipes.external;

import com.example.recipes.config.ExternalApiProperties;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Component
public class ExternalRecipeClient {

    private static final Logger logger = LoggerFactory.getLogger(ExternalRecipeClient.class);

    private final RestTemplate restTemplate;
    private final ExternalApiProperties properties;

    public ExternalRecipeClient(RestTemplate restTemplate, ExternalApiProperties properties) {
        this.restTemplate = restTemplate;
        this.properties = properties;
    }

    @SuppressWarnings("unchecked")
    @Retryable(value = { Exception.class }, maxAttemptsExpression = "#{${external.api.retry.maxAttempts:3}}", backoff = @Backoff(delayExpression = "#{${external.api.retry.delay:2000}}", multiplier = 2))
    @CircuitBreaker(name = "externalRecipes", fallbackMethod = "fetchFallback")
    public Map<String, Object> fetch() {
        logger.info("Calling external recipes API: {}", properties.getUrl());
    return restTemplate.getForObject(java.util.Objects.requireNonNull(properties.getUrl()), Map.class);
    }

    protected Map<String, Object> fetchFallback(Throwable t) {
        logger.error("External recipes API fallback engaged: {}", t.getMessage());
        Map<String, Object> empty = new HashMap<>();
        empty.put("recipes", Collections.emptyList());
        return empty;
    }
}