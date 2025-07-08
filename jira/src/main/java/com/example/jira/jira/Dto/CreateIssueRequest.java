package com.example.jira.jira.Dto;


import com.example.jira.jira.Entity.Priority;
import lombok.Data;

@Data
public class CreateIssueRequest {
    private String title;
    private String description;
    private Priority priority;
    private Long projectId;
}