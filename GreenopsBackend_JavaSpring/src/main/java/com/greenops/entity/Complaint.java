package com.greenops.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Complaints")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ComplaintId")
    private Integer complaintId;

    @Column(name = "UserId", nullable = false)
    private Integer userId;

    @Column(name = "ComplaintDescription", nullable = false)
    private String complaintDescription;

    @Column(name = "ProofImage")
    private String proofImage;

    @Column(name = "ComplaintDate", nullable = false)
    private LocalDateTime complaintDate;

    @Column(name = "Status")
    private String status;
}