package com.greenops.service;

import com.greenops.dto.RegisterRequestDTO;
import com.greenops.dto.UserResponseDTO;
import com.greenops.entity.User;
import com.greenops.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDTO register(RegisterRequestDTO request) {

        // 1. Check whether email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        // 2. Create User entity
        User user = new User();

        user.setUserName(request.getUserName());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setDistrict(request.getDistrict());

        // 3. Hash password
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // 4. Set creation time
        user.setCreatedAt(LocalDateTime.now());

        // 5. Save user
        User savedUser = userRepository.save(user);

        // 6. Convert Entity → Response DTO
        return new UserResponseDTO(
                savedUser.getUserId(),
                savedUser.getUserName(),
                savedUser.getEmail(),
                savedUser.getPhoneNumber(),
                savedUser.getDistrict(),
                savedUser.getCreatedAt()
        );
    }
}