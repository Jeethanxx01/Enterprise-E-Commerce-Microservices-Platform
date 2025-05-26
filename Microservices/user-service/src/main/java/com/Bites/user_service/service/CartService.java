package com.Bites.user_service.service;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@FeignClient(name = "cart-service", url = "http://localhost:5003/cart")
public interface CartService {

    @GetMapping("/{cartId}")
    Map<String, Object> getCartDetailsById(@PathVariable String cartId);
}
