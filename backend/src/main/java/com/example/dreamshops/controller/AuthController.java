package com.example.dreamshops.controller;

import com.example.dreamshops.exceptions.AlreadyExistsException;
import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.request.CreateUserRequest;
import com.example.dreamshops.request.LoginRequest;
import com.example.dreamshops.response.ApiResponse;
import com.example.dreamshops.response.JwtResponse;
import com.example.dreamshops.security.jwt.JwtUtils;
import com.example.dreamshops.security.user.ShopUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.dreamshops.service.notification.EmailService;
import com.example.dreamshops.service.user.UserService;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.CONFLICT;
import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/auth")
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserService userService;
    private final EmailService emailService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwt = jwtUtils.generateTokenForUser(authentication);
            ShopUserDetails userDetails = (ShopUserDetails) authentication.getPrincipal();
            JwtResponse jwtResponse = new JwtResponse(
                    userDetails.getId(),
                    jwt
            );
            return ResponseEntity.ok(new ApiResponse("Login Succfessful", jwtResponse));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse(e.getMessage(),null));
        }

    }
    @PostMapping("/register-sms")
    public ResponseEntity<ApiResponse> registerSms(@RequestBody CreateUserRequest request) {
        try {
            String token = userService.createVerificationBySms(request);
            return ResponseEntity.ok(new ApiResponse("Registration successful! Please confirm the code sent to your phone", token));
        } catch (AlreadyExistsException e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(), null));
        }
    }

    public static record ConfirmSmsRequest(String token, String code) {}

    @PostMapping("/confirm-sms")
    public ResponseEntity<ApiResponse> confirmSms(@RequestBody ConfirmSmsRequest req) {
        try {
            userService.confirmAndCreateUserBySms(req.token(), req.code());
            return ResponseEntity.ok(new ApiResponse("Phone verified. Your account is created. You can now log in.", null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @PostMapping("/register-email")
    public ResponseEntity<ApiResponse> registerEmail(@RequestBody CreateUserRequest request) {
        try {
            String token = userService.createVerificationByEmail(request);

            String link = "http://localhost:9191/api/v1/auth/confirm-email?token=" + token;

            String body = "Hello " + request.getFirstName() + ",\n\n"
                    + "To verify your account, please click on this link:\n"
                    + link + "\n\nThanks!";
            emailService.sendEmail(request.getEmail(), "Email Confirmation", body);

            return ResponseEntity.ok(new ApiResponse("Registration successful! Please confirm your email address", token));
        } catch (AlreadyExistsException e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(), null));
        }
    }

    @GetMapping("/confirm-email")
    public ResponseEntity<ApiResponse> confirmEmail(@RequestParam("token") String token) {
        try {
            userService.confirmAndCreateUserByEmail(token);
            return ResponseEntity.ok(new ApiResponse("Your email has been confirmed. You can now log in.", null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse(e.getMessage(), null));
        }
    }
}
