package com.example.jira.jira.Controller;

import com.example.jira.jira.Entity.Project;
import com.example.jira.jira.Entity.User;
import com.example.jira.jira.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<User>> getAllUser() {
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<User>> getSingleUser(@PathVariable Long userId) {
        Optional<User> user = userRepository.findById(userId);
        return ResponseEntity.ok(user);
    }
}
