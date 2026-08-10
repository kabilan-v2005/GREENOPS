package com.greenops.service;

import com.greenops.entity.ResaleItem;

import java.util.List;

public interface ResaleItemService {

    ResaleItem addItem(ResaleItem item);

    List<ResaleItem> getAllItems();

    List<ResaleItem> getUserProducts(Integer userId);
}