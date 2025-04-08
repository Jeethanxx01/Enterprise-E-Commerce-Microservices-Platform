package com.Bites.cart_service.Service;

import com.Bites.cart_service.dtos.ProductDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

@FeignClient(name = "product-service",url = "http://localhost:5002/products")
public interface ProductService {
    @GetMapping("/{id}")
    public Optional<ProductDto> getProductById(@PathVariable String id);
}
