package com.greenops.service;

import com.greenops.entity.ResaleItem;
import com.greenops.repository.ResaleItemRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ResaleItemServiceImpl implements ResaleItemService {

    private final ResaleItemRepository resaleItemRepository;

    public ResaleItemServiceImpl(
            ResaleItemRepository resaleItemRepository) {
        this.resaleItemRepository = resaleItemRepository;
    }

    @Override
    public ResaleItem addItem(ResaleItem item) {

        item.setPostedDate(LocalDateTime.now());
        item.setProductStatus("Available");

        if (item.getProductImage() == null ||
                item.getProductImage().isEmpty()) {
            item.setProductImage("");
        }

        return resaleItemRepository.save(item);
    }

    @Override
    public List<ResaleItem> getAllItems() {
        return resaleItemRepository.findAll();
    }

    @Override
    public List<ResaleItem> getUserProducts(Integer userId) {
        return resaleItemRepository.findByUserId(userId);
    }
}