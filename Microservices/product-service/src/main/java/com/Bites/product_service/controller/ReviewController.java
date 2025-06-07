package com.Bites.product_service.controller;

import com.Bites.product_service.dtos.UserDto;
import com.Bites.product_service.entity.Review;
import com.Bites.product_service.service.ReviewService;
import com.Bites.product_service.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserService userService;

    @Autowired
    public ReviewController(ReviewService reviewService, UserService userService) {
        this.reviewService = reviewService;
        this.userService = userService;
    }

    // Add a review for a specific product
    @PostMapping
    public Review addReview(@RequestBody Review review,
                            @RequestParam String productId,
                            @RequestHeader("Authorization") String jwt) {
        if (jwt == null || jwt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "JWT token is required.");
        }

        // Fetch username from User Microservice
        UserDto user = userService.getUserProfileHandler(jwt);
        if (user == null || user.getFullName() == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Invalid JWT token or user not found.");
        }

        // Set the username from the user microservice
        review.setUsername(user.getFullName());

        try {
            // Save the review in the database and associate it with the product
            return reviewService.addReview(review, productId);
        } catch (RuntimeException ex) {
            // If the review is not relevant or inappropriate, return 400 with the message
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage());
        }
    }


    // Get all reviews
    @GetMapping
    public ResponseEntity<List<Review>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(reviews);
    }
}
