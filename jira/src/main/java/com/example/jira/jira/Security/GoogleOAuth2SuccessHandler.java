package com.example.jira.jira.Security;

import com.example.jira.jira.Entity.Role;
import com.example.jira.jira.Entity.User;
import com.example.jira.jira.Repository.UserRepository;
import com.example.jira.jira.Service.UserDetailServices;
import com.example.jira.jira.Util.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class GoogleOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTUtil jwtUtil;
    private final UserDetailServices userDetailServices;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        org.springframework.security.core.Authentication authentication) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        // 1. Register user if not exist
        Optional<User> optionalUser = userRepository.findByEmail(email);
        User user = optionalUser.orElseGet(() -> {
            User newUser = User.builder()
                    .username(name.replace(" ", "_").toLowerCase())
                    .email(email)
                    .password(passwordEncoder.encode(UUID.randomUUID().toString()))
                    .role(Role.DEVELOPER)
                    .createdAt(LocalDateTime.now())
                    .build();
            return userRepository.save(newUser);
        });

        // 2. Load userDetails and generate token
        UserDetails userDetails = userDetailServices.loadUserByUsername(user.getUsername());
        String token = jwtUtil.generateToken(userDetails);

        // 3. Redirect to React app with token
        response.sendRedirect("http://localhost:5173/oauth2-success?token=" + token);
    }
}
