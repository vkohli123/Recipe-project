package com.example.recipes.health;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.health.Health;
import org.springframework.boot.actuate.health.HealthIndicator;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class ExternalApiHealthIndicator implements HealthIndicator {

    private static final Logger logger = LoggerFactory.getLogger(ExternalApiHealthIndicator.class);

    private final RestTemplate restTemplate;

    private final String externalApiUrl;

    public ExternalApiHealthIndicator(RestTemplate restTemplate, @Value("${external.api.url:https://dummyjson.com/recipes}") String externalApiUrl) {
        this.restTemplate = restTemplate;
        this.externalApiUrl = externalApiUrl;
    }

    @Override
    public Health health() {
        try {
            // perform a lightweight GET to the external API root; treat 2xx as UP
            ResponseEntity<String> resp = restTemplate.getForEntity(externalApiUrl, String.class);
            if (resp.getStatusCode().is2xxSuccessful()) {
                return Health.up().withDetail("externalApi", externalApiUrl).build();
            }
            logger.warn("External API returned non-2xx: {}", resp.getStatusCode());
            return Health.down().withDetail("status", resp.getStatusCodeValue()).build();
        } catch (Exception ex) {
            logger.error("External API health check failed: {}", ex.getMessage());
            return Health.down(ex).withDetail("externalApi", externalApiUrl).build();
        }
    }
}
