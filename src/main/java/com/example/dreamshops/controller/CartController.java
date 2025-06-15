package com.example.dreamshops.controller;

import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.response.ApiResponse;
import com.example.dreamshops.service.cart.ICartService;
import lombok.RequiredArgsConstructor;
import org.hibernate.annotations.NotFound;
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

    @GetMapping("/{cardId}")
    public ResponseEntity<ApiResponse> getCart(@PathVariable Long cardId) {
        try {
            Cart cart = cartService.getCartById(cardId);
            return ResponseEntity.ok(new ApiResponse("Cart fetched successfully", cart));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error to fetch cart: " + e.getMessage(), null));
        }
    }

    @DeleteMapping("/{cardId}/clear")
    public ResponseEntity<ApiResponse> clearCart(@PathVariable Long cardId) {
        try {
            cartService.clearCart(cardId);
            return ResponseEntity.ok(new ApiResponse("Cart cleared successfully", null));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error to clear cart: " + e.getMessage(), null));
        }

    }

    @GetMapping("/{cardId}/total-price")
    public ResponseEntity<ApiResponse> getTotalAmount(@PathVariable Long cardId) {
        try {
            BigDecimal totalPrice = cartService.getTotalPrice(cardId);
            return ResponseEntity.ok(new ApiResponse("Total price: ", totalPrice));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(NOT_FOUND).body(new ApiResponse("Error to fetch total price: " + e.getMessage(), null));
        }
    }
}
