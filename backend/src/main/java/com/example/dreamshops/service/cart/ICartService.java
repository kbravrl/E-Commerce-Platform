package com.example.dreamshops.service.cart;

import com.example.dreamshops.model.Cart;
import com.example.dreamshops.model.User;

import java.math.BigDecimal;

public interface ICartService {
    Cart getCart();
    void clearCart();
    BigDecimal getTotalPrice();
    Cart initializeNewCart(User user);
    Cart getCartByUserId(Long userId);
}
