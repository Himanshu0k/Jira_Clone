package com.example.jira.jira.Controller;

import com.example.jira.jira.Dto.AuthRequest;
import com.example.jira.jira.Dto.AuthResponse;
import com.example.jira.jira.Dto.RegisterUser;
import com.example.jira.jira.Entity.Role;
import com.example.jira.jira.Entity.User;
import com.example.jira.jira.Repository.UserRepository;
import com.example.jira.jira.Service.UserDetailServices;
import com.example.jira.jira.Util.JWTUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtil jwtUtil;

    @Autowired
    private UserDetailServices userDetailServices;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterUser registerUser) {
        User user = User.builder()
                .username(registerUser.getUsername())
                .email(registerUser.getEmailID())
                .password(passwordEncoder.encode(registerUser.getPassword()))
                .role(registerUser.getRole())
                .createdAt(LocalDateTime.now())
                .build();
        userRepository.save(user);
        return ResponseEntity.ok("User registered");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword())
            );

        UserDetails userDetails = userDetailServices.loadUserByUsername(authRequest.getUsername());
        String token = jwtUtil.generateToken(userDetails);
        return ResponseEntity.ok(new AuthResponse(token));
    }
//
//    @GetMapping("/")
//    public String hey() {
//        return "Welcome home";
//    }
//    public ResponseEntity<AuthResponse> loginSuccess(@AuthenticationPrincipal OAuth2User principal) {
//        String email = principal.getAttribute("email");
//        String name = principal.getAttribute("name");
//
//        Optional<User> optionalUser = userRepository.findByEmail(email);
//        User user;
//
//        if (optionalUser.isEmpty()) {
//            user = User.builder()
//                    .username(name)
//                    .email(email)
//                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
//                    .role(Role.DEVELOPER)
//                    .build();
//            userRepository.save(user);
//        } else {
//            user = optionalUser.get();
//        }
//
//        // ✅ Use your custom UserDetailsService to load UserDetails
//        UserDetails userDetails = userDetailServices.loadUserByUsername(user.getUsername());
//
//        // ✅ Generate JWT using userDetails
//        String token = jwtUtil.generateToken(userDetails);
//
//        // ✅ Return JSON response (like /login)
//        return ResponseEntity.ok(new AuthResponse(token));
//    }
}
