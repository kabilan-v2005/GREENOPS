package com.greenops.controller;

//import org.springframework.context.annotation.Bean;
import com.greenops.entity.ResaleItem;
import com.greenops.service.ResaleItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Resale")
public class ResaleController {

    private final ResaleItemService resaleItemService;

    public ResaleController(
            ResaleItemService resaleItemService) {

        this.resaleItemService = resaleItemService;
    }

    @PostMapping("/add")
    public ResponseEntity<ResaleItem> addItem(
            @RequestBody ResaleItem item) {

        ResaleItem savedItem =
                resaleItemService.addItem(item);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedItem);
    }

    @GetMapping("/items")
    public ResponseEntity<List<ResaleItem>> getAllItems() {

        return ResponseEntity.ok(
                resaleItemService.getAllItems()
        );
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ResaleItem>> getUserProducts(
            @PathVariable Integer userId) {

        return ResponseEntity.ok(
                resaleItemService.getUserProducts(userId)
        );
    }
}