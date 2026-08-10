package com.greenops.repository;

import com.greenops.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ComplaintRepository
        extends JpaRepository<Complaint, Integer> {
}