package com.example.dreamshops.controller;

import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.model.User;
import com.example.dreamshops.response.ApiResponse;
import com.example.dreamshops.service.cart.ICartService;
import com.example.dreamshops.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.dreamshops.model.Cart;

import java.math.BigDecimal;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RequiredArgsConstructor
@RestController
@RequestMapping("${api.prefix}/carts")
public class CartController {
    private final ICartService cartService;

    @GetMapping
    public ResponseEntity<ApiResponse> getCart() {
        try {
            Cart cart = cartService.getCart();
            return ResponseEntity.ok(new ApiResponse("Cart fetched successfully", cart));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error to fetch cart: " + e.getMessage(), null));
        }
    }

    @GetMapping("/total-price")
    public ResponseEntity<ApiResponse> getTotalAmount() {
        try {
            BigDecimal totalPrice = cartService.getTotalPrice();
            return ResponseEntity.ok(new ApiResponse("Total price: ", totalPrice));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error to fetch total price: " + e.getMessage(), null));
        }
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse> clearCart() {
        try {
            cartService.clearCart();
            return ResponseEntity.ok(new ApiResponse("Cart cleared successfully", null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error to clear cart: " + e.getMessage(), null));
        }

    }
}
