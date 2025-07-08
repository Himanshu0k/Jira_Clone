package com.example.jira.jira.Controller;

import com.example.jira.jira.Entity.Project;
import com.example.jira.jira.Entity.User;
import com.example.jira.jira.Repository.ProjectRepository;
import com.example.jira.jira.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<Project> createProject(@RequestBody Project project, Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow();
        project.setCreatedBy(user);
        project.setCreatedAt(LocalDateTime.now());

        return ResponseEntity.ok(projectRepository.save(project));
    }

    @GetMapping("/")
    public ResponseEntity<List<Project>> getProjects(Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow();
        List<Project> projects = projectRepository.findByCreatedBy(user);
        return ResponseEntity.ok(projects);
    }
}
