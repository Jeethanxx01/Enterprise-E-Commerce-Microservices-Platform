package com.Bites.cart_service.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RedisHash("Cart")
public class Cart implements Serializable {
    @Id
    private String id; // Represents cartId

    private String orderId; //

    @Indexed
    private String email;

    private String fullName;

    private Double totalAmount;

    private List<Product> products = new ArrayList<>();

    private ShipmentDetails shipmentDetails;

    public Cart() {
    }

    public Cart(String id, String email, String fullName, List<Product> products) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.products = products != null ? new ArrayList<>(products) : new ArrayList<>();
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

    public List<Product> getProducts() {
        return new ArrayList<>(products);
    }

    public void setProducts(List<Product> products) {
        this.products = products != null ? new ArrayList<>(products) : new ArrayList<>();
    }

    public void addProduct(Product product) {
        if (product != null) {
            this.products.add(product);
        }
    }

    public void removeProduct(Product product) {
        this.products.removeIf(p -> Objects.equals(p.getId(), product.getId()));
    }
    public ShipmentDetails getShipmentDetails() {
        return shipmentDetails;
    }

    public void setShipmentDetails(ShipmentDetails shipmentDetails) {
        this.shipmentDetails = shipmentDetails;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(Double totalAmount) {
        this.totalAmount = totalAmount;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "id='" + id + '\'' +
                ", email='" + email + '\'' +
                ", fullName='" + fullName + '\'' +
                ", products=" + products +
                '}';
    }
}
