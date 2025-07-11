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
@CrossOrigin(origins = "http://localhost:5173")
//@CrossOrigin(
//        origins = "http://localhost:5173", // your frontend origin
//        allowedHeaders = "*",
//        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE},
//        allowCredentials = "true"
//)
@RequestMapping("/api/project")
public class ProjectController {
    @Autowired private ProjectRepository projectRepository;
    @Autowired private UserRepository userRepository;

    @CrossOrigin
    @PostMapping("/create")
    public ResponseEntity<Project> createProject(@RequestBody Project project, Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow();
        project.setCreatedBy(user);
        project.setCreatedAt(LocalDateTime.now());

        return ResponseEntity.ok(projectRepository.save(project));
    }

//    @CrossOrigin
    @GetMapping
    public ResponseEntity<List<Project>> getProjects(Principal principal) {
        User user = userRepository.findByUsername(principal.getName()).orElseThrow();
        List<Project> projects = projectRepository.findByCreatedBy(user);
        return ResponseEntity.ok(projects);
    }
}
