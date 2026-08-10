package com.greenops.service;

import com.greenops.entity.Complaint;

import java.util.List;

public interface ComplaintService {

    Complaint registerComplaint(Complaint complaint);

    List<Complaint> getAllComplaints();
}