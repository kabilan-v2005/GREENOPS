package com.greenops.service;

import com.greenops.entity.Feedback;
import com.greenops.repository.FeedbackRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private final FeedbackRepository feedbackRepository;

    public FeedbackServiceImpl(
            FeedbackRepository feedbackRepository) {

        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public Feedback submitFeedback(Feedback feedback) {

        feedback.setSubmittedDate(LocalDateTime.now());

        return feedbackRepository.save(feedback);
    }
}