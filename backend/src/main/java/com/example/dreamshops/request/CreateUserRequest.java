package com.example.dreamshops.request;

import lombok.Data;

@Data
public class CreateUserRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String phone; // E.164 format
    private String password;
}
