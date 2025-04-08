package com.Bites.order_service.service;

import com.Bites.order_service.Repository.OrderItemsRepository;
import com.Bites.order_service.Repository.OrdersRepository;
import com.Bites.order_service.entity.Order;
import com.Bites.order_service.entity.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@Service
public class OrderService {

    private final CartService cartService;
    private final OrdersRepository ordersRepository;
    private final OrderItemsRepository orderItemsRepository;

    @Autowired
    public OrderService(CartService cartService, OrdersRepository ordersRepository, OrderItemsRepository orderItemsRepository) {
        this.cartService = cartService;
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
    }

    public Order saveCart(String jwt) {
        // Fetch the cart associated with the JWT
        Order order = cartService.getCart(jwt);
        if (order == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found");
        }

        String cartId = order.getId(); // Ensure consistent variable naming

        // Save the order first (assuming it's new)
        order.setId(UUID.randomUUID().toString());
        Order savedOrder = orderItemsRepository.save(order);

        // Fetch existing Orders entity or create a new one if not present
        Orders orders = ordersRepository.findById(cartId)
                .map(existingOrders -> {
                    existingOrders.getOrders().add(savedOrder);
                    return existingOrders;
                })
                .orElseGet(() -> new Orders(cartId, new ArrayList<>(List.of(savedOrder))));

        // Save updated Orders entity
        ordersRepository.save(orders);
        cartService.clearCart(jwt);

        return savedOrder;
    }

    public List<Order> getOrdersByCartId(String cartId) {
        return ordersRepository.findById(cartId)
                .map(Orders::getOrders)
                .orElse(Collections.emptyList());
    }
}
