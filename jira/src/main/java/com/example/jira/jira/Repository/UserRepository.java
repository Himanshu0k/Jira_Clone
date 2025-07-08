package com.example.jira.jira.Repository;

import com.example.jira.jira.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username); // to get dynamic user .....


    Optional<User> findByEmail(String email);
}
