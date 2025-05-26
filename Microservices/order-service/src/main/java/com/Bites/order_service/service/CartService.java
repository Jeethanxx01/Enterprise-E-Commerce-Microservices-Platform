package com.Bites.order_service.service;

import com.Bites.order_service.entity.Order;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "cart-service", url = "http://localhost:5003/cart")
public interface CartService {

    @GetMapping
    Order getCart(@RequestHeader("Authorization") String jwt);

    @DeleteMapping()
    public void clearCart(@RequestHeader("Authorization") String jwt) ;
}
