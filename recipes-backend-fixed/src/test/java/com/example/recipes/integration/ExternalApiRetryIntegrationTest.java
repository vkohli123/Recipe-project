package com.example.recipes.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.context.TestPropertySource;
import org.springframework.web.client.RestTemplate;
import org.springframework.test.web.client.MockRestServiceServer;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.client.ExpectedCount.once;
import static org.springframework.test.web.client.ExpectedCount.times;
import static org.springframework.test.web.client.match.MockRestRequestMatchers.requestTo;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withStatus;
import static org.springframework.test.web.client.response.MockRestResponseCreators.withSuccess;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestPropertySource(properties = {"external.api.retry.maxAttempts=3", "external.api.retry.delay=100"})
public class ExternalApiRetryIntegrationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private RestTemplate clientRestTemplate; // the RestTemplate bean used by the service

    @Test
    void loadRecipes_retriesOnFailure_thenSucceeds() {
        String externalUrl = System.getProperty("external.api.url");
        if (externalUrl == null) {
            externalUrl = "https://dummyjson.com/recipes"; // fallback; Mock server will intercept by RestTemplate
        }

        MockRestServiceServer mockServer = MockRestServiceServer.createServer(clientRestTemplate);

        // first 2 attempts -> 500
        mockServer.expect(times(2), requestTo(externalUrl)).andRespond(withStatus(HttpStatus.INTERNAL_SERVER_ERROR));

        // third attempt -> success with body
        String body = "{ \"recipes\": [ { \"id\": 99, \"name\": \"MockRecipe\", \"cuisine\": \"Test\", \"cookTimeMinutes\": 5, \"tags\": [\"t\"], \"instructions\": [\"do\"] } ] }";
        mockServer.expect(once(), requestTo(externalUrl)).andRespond(withSuccess(body, MediaType.APPLICATION_JSON));

        var resp = restTemplate.postForEntity("/api/load", null, String.class);
        assertThat(resp.getStatusCode().is2xxSuccessful()).isTrue();

        mockServer.verify();
    }
}
