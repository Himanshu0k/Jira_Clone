package com.example.jira.jira.Repository;

import com.example.jira.jira.Entity.Project;
import com.example.jira.jira.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByCreatedBy(User user);
}
