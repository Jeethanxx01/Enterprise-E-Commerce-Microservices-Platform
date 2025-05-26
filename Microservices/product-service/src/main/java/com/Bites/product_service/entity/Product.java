package com.Bites.product_service.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    private String name;
    private String description;
    private Double price;
    private Integer stock;
    private String imageUrl;

    @DBRef
    private Category category;

    @DBRef
    private List<Review> reviews = new ArrayList<>();

    public Product() {
        this.reviews = new ArrayList<>(); // ✅ Ensure list is never null
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Review> getReviews() {
        if (reviews == null) {
            reviews = new ArrayList<>(); // ✅ Prevent null reference
        }
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }


}
