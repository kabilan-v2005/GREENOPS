package com.greenops.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "Feedback")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "FeedbackId")
    private Integer feedbackId;

    @Column(name = "UserId", nullable = false)
    private Integer userId;

    @Column(name = "FeedbackContent", nullable = false)
    private String feedbackContent;

    @Column(name = "SubmittedDate", nullable = false)
    private LocalDateTime submittedDate;
}