package com.Bites.product_service.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "review-analysis", url = "http://localhost:5000")
public interface ReviewAnalysisClient {
    
    @PostMapping("/analyze_review")
    ReviewAnalysisResponse analyzeReview(@RequestBody ReviewAnalysisRequest request);
    
    record ReviewAnalysisRequest(
        String product_title,
        String product_description,
        String review
    ) {}
    
    record ReviewAnalysisResponse(
        boolean is_relevant,
        String message
    ) {}
} 