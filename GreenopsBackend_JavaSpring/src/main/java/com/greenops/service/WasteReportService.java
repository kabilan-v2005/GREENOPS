package com.greenops.service;

import com.greenops.entity.WasteReport;

import java.util.List;

public interface WasteReportService {

    WasteReport addReport(WasteReport report);

    List<WasteReport> getAllReports();
}