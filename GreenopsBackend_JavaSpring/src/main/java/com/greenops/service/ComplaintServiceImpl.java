package com.greenops.service;

import com.greenops.entity.Complaint;
import com.greenops.repository.ComplaintRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    private final ComplaintRepository complaintRepository;

    public ComplaintServiceImpl(
            ComplaintRepository complaintRepository) {

        this.complaintRepository = complaintRepository;
    }

    @Override
    public Complaint registerComplaint(Complaint complaint) {

        complaint.setComplaintDate(LocalDateTime.now());
        complaint.setStatus("Pending");

        return complaintRepository.save(complaint);
    }

    @Override
    public List<Complaint> getAllComplaints() {

        return complaintRepository.findAll();
    }
}