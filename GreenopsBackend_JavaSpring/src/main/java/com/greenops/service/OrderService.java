package com.greenops.service;

import com.greenops.entity.Order;

import java.util.List;

public interface OrderService {

    Order buyProduct(Order order);

    List<Order> getUserOrders(Integer userId);
}