package com.greenops.service;

import com.greenops.dto.LoginRequestDTO;
import com.greenops.dto.LoginResponseDTO;
import com.greenops.dto.RegisterRequestDTO;
import com.greenops.dto.UserResponseDTO;

public interface AuthService {

    UserResponseDTO register(RegisterRequestDTO request);
    LoginResponseDTO login(LoginRequestDTO request);
}