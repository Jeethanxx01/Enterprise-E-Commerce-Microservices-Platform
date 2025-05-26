package com.Bites.order_service.Repository;


import com.Bites.order_service.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderItemsRepository extends MongoRepository<Order, String> {
}
