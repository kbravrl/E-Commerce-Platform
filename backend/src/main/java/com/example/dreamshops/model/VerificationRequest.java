package com.example.dreamshops.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "verification_requests")
public class VerificationRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String token;
    private LocalDateTime createdAt;

    public VerificationRequest(String fn, String ln, String email, String encode, String token) {
        this.firstName = fn;
        this.lastName = ln;
        this.email = email;
        this.password = encode;
        this.token = token;
        this.createdAt = LocalDateTime.now();
    }

}