package com.cryapi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Service
public class CryptoService {

    private final String API_URL = "https://api.coincap.io/v2/assets";
    private final RestTemplate restTemplate;

    public CryptoService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getCryptoPrices() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("User-Agent", "Spring Boot App");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.GET, entity, String.class);
        return response.getBody();
    }
}