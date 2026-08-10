package com.greenops.repository;

import com.greenops.entity.WasteReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WasteReportRepository
        extends JpaRepository<WasteReport, Integer> {
}