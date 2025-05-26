package com.Bites.product_service.Repository;

import com.Bites.product_service.entity.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
}