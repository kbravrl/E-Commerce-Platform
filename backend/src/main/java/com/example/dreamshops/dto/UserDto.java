package com.example.dreamshops.dto;

import com.example.dreamshops.model.Cart;
import com.example.dreamshops.model.Role;
import lombok.Data;

import java.util.Collection;
import java.util.List;

@Data
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private List<OrderDto> orders;
    private CartDto cart;
    private Collection<Role> roles;
}
