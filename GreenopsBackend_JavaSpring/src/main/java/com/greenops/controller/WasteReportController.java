package com.greenops.controller;

import com.greenops.entity.WasteReport;
import com.greenops.service.WasteReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/WasteReport")
public class WasteReportController {

    private final WasteReportService wasteReportService;

    public WasteReportController(
            WasteReportService wasteReportService) {

        this.wasteReportService = wasteReportService;
    }

    @PostMapping("/report")
    public ResponseEntity<WasteReport> addReport(
            @RequestBody WasteReport report) {

        WasteReport savedReport =
                wasteReportService.addReport(report);

        return ResponseEntity.ok(savedReport);
    }

    @GetMapping("/all")
    public ResponseEntity<List<WasteReport>> getAllReports() {

        List<WasteReport> reports =
                wasteReportService.getAllReports();

        return ResponseEntity.ok(reports);
    }
}