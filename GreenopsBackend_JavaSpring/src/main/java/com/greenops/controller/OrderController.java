package com.greenops.controller;

import com.greenops.entity.Order;
import com.greenops.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Order")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/buy")
    public ResponseEntity<Order> buyProduct(
            @RequestBody Order order) {

        Order savedOrder = orderService.buyProduct(order);

        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                orderService.getUserOrders(userId)
        );
    }
}