package com.greenops.service;

import com.greenops.dto.UserResponseDTO;
import com.greenops.entity.User;
import com.greenops.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }


    @Override
    public List<UserResponseDTO> getAllUsers() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponseDTO(
                        user.getUserId(),
                        user.getUserName(),
                        user.getEmail(),
                        user.getPhoneNumber(),
                        user.getDistrict(),
                        user.getCreatedAt()
                ))
                .toList();
    }

    @Override
    public Optional<User> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void deleteUser(Integer id) {
        userRepository.deleteById(id);
    }
}