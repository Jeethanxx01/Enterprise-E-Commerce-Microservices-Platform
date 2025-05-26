package com.Bites.order_service.entity;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;
import java.util.List;

@Document(collection = "order")
public class Order {
    @Id
    private String id;
    private String orderId;
    private String email;
    private String fullName;
    private Double totalAmount;
    private List<Product> products;
    private ShipmentDetails shipmentDetails;

    public Order() {
    }

    public Order(String id, String orderId, String email, String fullName, Double totalAmount, List<Product> products, ShipmentDetails shipmentDetails) {
        this.id = id;
        this.orderId = orderId;
        this.email = email;
        this.fullName = fullName;
        this.totalAmount = totalAmount;
        this.products = products;
        this.shipmentDetails = shipmentDetails;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    public ShipmentDetails getShipmentDetails() {
        return shipmentDetails;
    }

    public void setShipmentDetails(ShipmentDetails shipmentDetails) {
        this.shipmentDetails = shipmentDetails;
    }

    @Override
    public String toString() {
        return "Order{" +
                "id='" + id + '\'' +
                ", orderId='" + orderId + '\'' +
                ", email='" + email + '\'' +
                ", fullName='" + fullName + '\'' +
                ", totalAmount=" + totalAmount +
                ", products=" + products +
                ", shipmentDetails=" + shipmentDetails +
                '}';
    }
}