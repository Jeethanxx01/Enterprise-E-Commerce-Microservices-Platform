package com.Bites.product_service.Repository;

import com.Bites.product_service.entity.Review;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ReviewRepository extends MongoRepository<Review, String> {
}