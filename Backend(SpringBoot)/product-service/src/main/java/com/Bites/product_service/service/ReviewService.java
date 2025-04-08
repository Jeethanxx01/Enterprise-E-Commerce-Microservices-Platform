package com.Bites.product_service.service;
import com.Bites.product_service.Repository.ProductRepository;
import com.Bites.product_service.Repository.ReviewRepository;
import com.Bites.product_service.entity.Product;
import com.Bites.product_service.entity.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository; // ✅ Inject ProductRepository

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
    }

    public Review addReview(Review review, String productId) {
        Review savedReview = reviewRepository.save(review); // ✅ Save review first

        // Fetch the product and update its review list
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();

            // ✅ Initialize the list if null
            if (product.getReviews() == null) {
                product.setReviews(new ArrayList<>());
            }

            product.getReviews().add(savedReview);
            productRepository.save(product);  // ✅ Update product with new review
        }

        return savedReview;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}
