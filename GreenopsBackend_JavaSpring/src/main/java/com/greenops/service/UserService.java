package com.greenops.service;

import com.greenops.dto.UserResponseDTO;
import com.greenops.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    User saveUser(User user);

    List<UserResponseDTO> getAllUsers();

    Optional<User> getUserById(Integer id);

    Optional<User> getUserByEmail(String email);

    void deleteUser(Integer id);
}