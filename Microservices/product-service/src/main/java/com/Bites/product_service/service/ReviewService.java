package com.Bites.product_service.service;
import com.Bites.product_service.Repository.ProductRepository;
import com.Bites.product_service.Repository.ReviewRepository;
import com.Bites.product_service.client.ReviewAnalysisClient;
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
    private final ProductRepository productRepository;
    private final ReviewAnalysisClient reviewAnalysisClient;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository, 
                        ProductRepository productRepository,
                        ReviewAnalysisClient reviewAnalysisClient) {
        this.reviewRepository = reviewRepository;
        this.productRepository = productRepository;
        this.reviewAnalysisClient = reviewAnalysisClient;
    }

    public Review addReview(Review review, String productId) {
        // Fetch the product first to get its details
        Optional<Product> optionalProduct = productRepository.findById(productId);
        if (optionalProduct.isEmpty()) {
            throw new RuntimeException("Product not found with id: " + productId);
        }
        
        Product product = optionalProduct.get();
        
        // Analyze the review
        ReviewAnalysisClient.ReviewAnalysisResponse analysis = reviewAnalysisClient.analyzeReview(
            new ReviewAnalysisClient.ReviewAnalysisRequest(
                product.getName(),
                product.getDescription(),
                review.getComment()
            )
        );
        
        // Check if review is relevant
        if (!analysis.is_relevant()) {
            throw new RuntimeException(analysis.message());
        }
        
        // Save the review if it's relevant
        Review savedReview = reviewRepository.save(review);

        // Initialize the list if null
        if (product.getReviews() == null) {
            product.setReviews(new ArrayList<>());
        }

        product.getReviews().add(savedReview);
        productRepository.save(product);

        return savedReview;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }
}
