package com.Bites.order_service.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Document(collection = "orders")
public class Orders {

    @Id
    private String id;

    @Field("orders")
    private List<Order> orders;

    // Constructor
    public Orders() {
    }

    public Orders(String id, List<Order> orders) {
        this.id = id;
        this.orders = orders;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Order> getOrders() {
        return orders;
    }

    public void setOrders(List<Order> orders) {
        this.orders = orders;
    }

    @Override
    public String toString() {
        return "Orders{" +
                "id='" + id + '\'' +
                ", orders=" + orders +
                '}';
    }
}
