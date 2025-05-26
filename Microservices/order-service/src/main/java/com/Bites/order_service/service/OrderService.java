package com.Bites.order_service.service;

import com.Bites.order_service.Repository.OrderItemsRepository;
import com.Bites.order_service.Repository.OrdersRepository;
import com.Bites.order_service.entity.Order;
import com.Bites.order_service.entity.Orders;
import com.Bites.order_service.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final CartService cartService;
    private final OrdersRepository ordersRepository;
    private final OrderItemsRepository orderItemsRepository;
    private final KafkaProducerService kafkaProducerService;

    @Autowired
    public OrderService(CartService cartService, OrdersRepository ordersRepository, 
                       OrderItemsRepository orderItemsRepository, KafkaProducerService kafkaProducerService) {
        this.cartService = cartService;
        this.ordersRepository = ordersRepository;
        this.orderItemsRepository = orderItemsRepository;
        this.kafkaProducerService = kafkaProducerService;
    }

    public Order saveCart(String jwt) {
        // Fetch the cart associated with the JWT
        Order order = cartService.getCart(jwt);
        if (order == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cart not found");
        }

        String cartId = order.getId();

        // Group products by ID and calculate total quantities
        Map<String, Integer> productQuantities = order.getProducts().stream()
                .collect(Collectors.groupingBy(
                        Product::getId,
                        Collectors.summingInt(Product::getQuantity)
                ));

        // Send product quantities to Kafka
        kafkaProducerService.sendProductQuantities(productQuantities);

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

    public Order cancelOrder(String orderId) {
        // Find the order
        Order order = orderItemsRepository.findById(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));

        // Group products by ID and calculate total quantities for cancellation
        Map<String, Integer> productQuantities = order.getProducts().stream()
                .collect(Collectors.groupingBy(
                        Product::getId,
                        Collectors.summingInt(Product::getQuantity)
                ));

        // Send cancellation quantities to Kafka
        kafkaProducerService.sendOrderCancellationQuantities(productQuantities);

        // Find and update all Orders documents that contain this order
        List<Orders> allOrders = ordersRepository.findAll();
        for (Orders orders : allOrders) {
            if (orders.getOrders().removeIf(o -> o.getId().equals(orderId))) {
                ordersRepository.save(orders);
                break; // Assuming an order can only be in one Orders document
            }
        }

        // Delete the order
        orderItemsRepository.deleteById(orderId);

        return order;
    }

    public List<Order> getOrdersByCartId(String cartId) {
        return ordersRepository.findById(cartId)
                .map(Orders::getOrders)
                .orElse(Collections.emptyList());
    }
}
