package com.example.dreamshops.service.cart;

import com.example.dreamshops.model.Cart;
import com.example.dreamshops.model.User;

import java.math.BigDecimal;

public interface ICartService {
    void clearCart(Long userId);
    BigDecimal getTotalPrice(Long userId);
    Cart initializeNewCart(User user);
    Cart getCartByUserId(Long userId);
}
