package com.example.jira.jira.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Project {
    // TODO - Define variables in Project Entity
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;
    private  String name;
    private String description;

    @ManyToOne
//    private User user; // not working like this
    private User createdBy; // working like this
    private LocalDateTime createdAt;
}
