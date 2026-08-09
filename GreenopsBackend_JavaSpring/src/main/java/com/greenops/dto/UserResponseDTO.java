package com.greenops.dto;

import java.time.LocalDateTime;

public class UserResponseDTO {

    private Integer userId;
    private String userName;
    private String email;
    private String phoneNumber;
    private String district;
    private LocalDateTime createdAt;

    public UserResponseDTO() {
    }

    public UserResponseDTO(
            Integer userId,
            String userName,
            String email,
            String phoneNumber,
            String district,
            LocalDateTime createdAt
    ) {
        this.userId = userId;
        this.userName = userName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.district = district;
        this.createdAt = createdAt;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}