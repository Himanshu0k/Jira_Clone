package com.example.jira.jira.Repository;

import com.example.jira.jira.Entity.Issue;
import com.example.jira.jira.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IssueRepository extends JpaRepository<Issue, Long> {
    List<Issue> findByProject(Project project);
}
