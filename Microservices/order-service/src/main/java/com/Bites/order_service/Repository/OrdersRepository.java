package com.Bites.order_service.Repository;

import com.Bites.order_service.entity.Orders;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrdersRepository extends MongoRepository<Orders, String> {
    Optional<Orders> findById(String cartId);
}
