package com.greenops.service;

import com.greenops.dto.LoginRequestDTO;
import com.greenops.dto.LoginResponseDTO;
import com.greenops.dto.RegisterRequestDTO;
import com.greenops.dto.UserResponseDTO;
import com.greenops.entity.User;
import com.greenops.repository.UserRepository;
import com.greenops.util.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthServiceImpl(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder, JwtService jwtService) {

        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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

    @Override
    public LoginResponseDTO login(LoginRequestDTO request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password")
                );

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        UserResponseDTO userResponse = new UserResponseDTO(
                user.getUserId(),
                user.getUserName(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getDistrict(),
                user.getCreatedAt()
        );

        return new LoginResponseDTO(token, userResponse);
    }
}