package com.example.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.repository.UserRepository;
import com.example.backend.entity.User;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/add")
    public String addUser() {
        userRepository.save(new User("TestUser")); // save=1件追加or更新
        return "User added";
    }

    @GetMapping("/list")
    public List<User> listUsers() {
        return userRepository.findAll();
    }
}
