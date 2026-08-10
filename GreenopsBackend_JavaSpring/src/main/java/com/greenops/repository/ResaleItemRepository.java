package com.greenops.repository;

import com.greenops.entity.ResaleItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResaleItemRepository
        extends JpaRepository<ResaleItem, Integer> {

    List<ResaleItem> findByUserId(Integer userId);
}