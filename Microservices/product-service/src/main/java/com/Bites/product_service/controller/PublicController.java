package com.Bites.product_service.controller;

import com.Bites.product_service.entity.Product;
import com.Bites.product_service.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:3000")
public class PublicController {  // Fixed class name

    private final ProductService productService;

    @Autowired  // Optional, but improves clarity
    public PublicController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Optional<Product> getProductById(@PathVariable String id) {
        return productService.getProductById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<Product> getProductsByCategory(@PathVariable String categoryId) {
        return productService.getProductsByCategoryId(categoryId);  // Updated to use categoryId directly
    }
}
