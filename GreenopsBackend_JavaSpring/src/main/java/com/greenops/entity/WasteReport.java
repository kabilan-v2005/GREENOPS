package com.greenops.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "WasteReports")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WasteReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ReportId")
    private Integer reportId;

    @Column(name = "UserId", nullable = false)
    private Integer userId;

    @Column(name = "District", nullable = false)
    private String district;

    @Column(name = "Place", nullable = false)
    private String place;

    @Column(name = "Description", nullable = false)
    private String description;

    @Column(name = "WasteImage")
    private String wasteImage;

    @Column(name = "ReportDate", nullable = false)
    private LocalDateTime reportDate;
}