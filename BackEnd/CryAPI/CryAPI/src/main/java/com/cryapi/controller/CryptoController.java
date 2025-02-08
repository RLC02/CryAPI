package com.cryapi.controller;

import com.cryapi.service.CryptoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/crypto")
@Tag(name = "Criptomoedas", description = "Endpoints relacionados a preços de criptomoedas")
public class CryptoController {

    private final CryptoService cryptoService;

    public CryptoController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    @Operation(summary = "Obter preços das criptomoedas", description = "Retorna os preços das criptomoedas em dólares e reais.")
    @GetMapping("/prices")
    public String getCryptoPrices() {
        return cryptoService.getCryptoPrices();
    }
}
