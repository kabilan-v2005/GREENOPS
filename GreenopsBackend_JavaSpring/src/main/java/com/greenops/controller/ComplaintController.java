package com.greenops.controller;

import com.greenops.entity.Complaint;
import com.greenops.service.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/Complaint")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(
            ComplaintService complaintService) {

        this.complaintService = complaintService;
    }

    @PostMapping("/register")
    public ResponseEntity<Complaint> registerComplaint(
            @RequestBody Complaint complaint) {

        Complaint savedComplaint =
                complaintService.registerComplaint(complaint);

        return ResponseEntity.ok(savedComplaint);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Complaint>> getAllComplaints() {

        return ResponseEntity.ok(
                complaintService.getAllComplaints()
        );
    }
}