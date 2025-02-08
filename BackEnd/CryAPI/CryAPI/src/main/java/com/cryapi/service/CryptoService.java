package com.cryapi.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.json.JSONObject;
import org.json.JSONArray;

@Service
public class CryptoService {

    private final String API_URL = "https://api.coincap.io/v2/assets";
    private final String EXCHANGE_API_URL = "https://economia.awesomeapi.com.br/json/last/USD-BRL";
    private final RestTemplate restTemplate;

    public CryptoService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    private double getExchangeRate() {
        ResponseEntity<String> response = restTemplate.getForEntity(EXCHANGE_API_URL, String.class);
        JSONObject json = new JSONObject(response.getBody());
        return json.getJSONObject("USDBRL").getDouble("bid");
    }

    public String getCryptoPrices() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Accept", "application/json");
        headers.set("User-Agent", "Spring Boot App");

        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(API_URL, HttpMethod.GET, entity, String.class);

        double exchangeRate = getExchangeRate();

        JSONObject jsonResponse = new JSONObject(response.getBody());
        JSONArray assets = jsonResponse.getJSONArray("data");

        for (int i = 0; i < assets.length(); i++) {
            JSONObject crypto = assets.getJSONObject(i);
            double priceUsd = crypto.getDouble("priceUsd");
            double priceBrl = priceUsd * exchangeRate;
            crypto.put("priceBrl", priceBrl);
        }

        jsonResponse.put("exchangeRate", exchangeRate);
        return jsonResponse.toString();
    }
}
