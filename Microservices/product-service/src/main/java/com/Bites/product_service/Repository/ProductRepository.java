package com.Bites.product_service.Repository;

import com.Bites.product_service.entity.Category;
import com.Bites.product_service.entity.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, String> {
    @Query("{ 'category.id': ?0 }")
    List<Product> findByCategoryId(String categoryId);
}