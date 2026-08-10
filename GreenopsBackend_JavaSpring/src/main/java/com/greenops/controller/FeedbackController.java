package com.greenops.controller;

import com.greenops.entity.Feedback;
import com.greenops.service.FeedbackService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/Feedback")
public class FeedbackController {

    private final FeedbackService feedbackService;

    public FeedbackController(
            FeedbackService feedbackService) {

        this.feedbackService = feedbackService;
    }

    @PostMapping("/submit")
    public ResponseEntity<Feedback> submitFeedback(
            @RequestBody Feedback feedback) {

        Feedback savedFeedback =
                feedbackService.submitFeedback(feedback);

        return ResponseEntity.ok(savedFeedback);
    }

    @GetMapping("/all")
    public ResponseEntity<Map<String, String>> getAllFeedback() {

        Map<String, String> response = new HashMap<>();

        response.put("message", "API working 🚀");

        return ResponseEntity.ok(response);
    }
}