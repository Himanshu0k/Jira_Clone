package com.example.jira.jira.Dto;

import com.example.jira.jira.Entity.Role;
import lombok.Data;

@Data
public class RegisterUser {
    private String username;
    private String emailID;
    private String password;
    private Role role;
}
