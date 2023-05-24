package com.cgi.library.controller;

import com.cgi.library.model.AuthenticationResponse;
import com.cgi.library.model.LoginRequest;
import com.cgi.library.model.RegisterRequest;
import com.cgi.library.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private  final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody RegisterRequest request
    ) {
        return Optional
                .ofNullable(userService.register(request))
                .map(ResponseEntity::ok)
                .orElseGet(ResponseEntity.status(422)::build);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> register(
            @RequestBody LoginRequest request
    ) {
        return ResponseEntity.ok(userService.login(request));
    }
}
