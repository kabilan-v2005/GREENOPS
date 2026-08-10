package com.greenops.service;

import com.greenops.entity.Order;
import com.greenops.entity.ResaleItem;
import com.greenops.repository.OrderRepository;
import com.greenops.repository.ResaleItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ResaleItemRepository resaleItemRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            ResaleItemRepository resaleItemRepository) {

        this.orderRepository = orderRepository;
        this.resaleItemRepository = resaleItemRepository;
    }

    @Override
    public Order buyProduct(Order order) {

        // 1. Find product
        ResaleItem product = resaleItemRepository
                .findById(order.getProductId())
                .orElseThrow(() ->
                        new RuntimeException("Product not found")
                );

        // 2. Check availability
        if (!"Available".equals(product.getProductStatus())) {
            throw new RuntimeException("Already sold");
        }

        // 3. Fill order details
        order.setOrderDate(LocalDateTime.now());
        order.setOrderStatus("Ordered");

        // 4. Mark product as sold
        product.setProductStatus("Sold");

        // 5. Save product
        resaleItemRepository.save(product);

        // 6. Save order
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getUserOrders(Integer userId) {

        return orderRepository.findByBuyerId(userId);
    }
}