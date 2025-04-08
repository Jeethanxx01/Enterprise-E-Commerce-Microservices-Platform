package com.Bites.order_service.Controller;

import com.Bites.order_service.dtos.UserDto;
import com.Bites.order_service.entity.Order;
import com.Bites.order_service.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import com.Bites.order_service.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/save")
    public ResponseEntity<Order> saveCart(@RequestHeader("Authorization") String jwt) {
        Order savedCart = orderService.saveCart(jwt);
        return ResponseEntity.ok(savedCart);
    }

    @GetMapping
    public List<Order> getOrders(@RequestHeader("Authorization") String jwt) {

        if (jwt == null || jwt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Session expired, please log in again.");
        }

        UserDto user = userService.getUserProfileHandler(jwt);

        return orderService.getOrdersByCartId(user.getCartId());
    }
}
