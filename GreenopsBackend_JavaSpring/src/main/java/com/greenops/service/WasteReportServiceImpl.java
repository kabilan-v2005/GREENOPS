package com.greenops.service;

import com.greenops.entity.WasteReport;
import com.greenops.repository.WasteReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class WasteReportServiceImpl implements WasteReportService {

    private final WasteReportRepository wasteReportRepository;

    public WasteReportServiceImpl(
            WasteReportRepository wasteReportRepository) {

        this.wasteReportRepository = wasteReportRepository;
    }

    @Override
    public WasteReport addReport(WasteReport report) {

        report.setReportDate(LocalDateTime.now());

        return wasteReportRepository.save(report);
    }

    @Override
    public List<WasteReport> getAllReports() {

        return wasteReportRepository.findAll();
    }
}