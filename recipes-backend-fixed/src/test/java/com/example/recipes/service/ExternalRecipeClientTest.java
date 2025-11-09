package com.example.recipes.service;

import com.example.recipes.config.ExternalApiProperties;
import com.example.recipes.external.ExternalRecipeClient;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

/**
 * Unit tests for the external recipe client demonstrating successful call and fallback.
 */
public class ExternalRecipeClientTest {

    private RestTemplate restTemplate;
    private ExternalApiProperties props;
    private ExternalRecipeClient client;

    @BeforeEach
    void setUp() {
        restTemplate = Mockito.mock(RestTemplate.class);
        props = new ExternalApiProperties();
        props.setUrl("http://example.test/recipes");
        client = new ExternalRecipeClient(restTemplate, props);
    }

    @Test
    void fetch_success_returnsMap() {
    when(restTemplate.getForObject(java.util.Objects.requireNonNull(props.getUrl()), Map.class)).thenReturn(Map.of("recipes", java.util.List.of()));
        Map<String, Object> result = client.fetch();
        assertThat(result).containsKey("recipes");
    }

    // Fallback is exercised via resilience annotations in integration; here we just ensure we can simulate empty response
    @Test
    void fetch_emptyResponse_returnsEmptyRecipesList() {
        when(restTemplate.getForObject(props.getUrl(), Map.class)).thenReturn(Map.of("recipes", java.util.List.of()));
        Map<String, Object> result = client.fetch();
        assertThat((java.util.List<?>) result.get("recipes")).isEmpty();
    }
}