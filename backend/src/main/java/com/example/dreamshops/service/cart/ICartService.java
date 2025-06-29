package com.example.dreamshops.service.cart;

import com.example.dreamshops.model.Cart;
import com.example.dreamshops.model.User;

import java.math.BigDecimal;

public interface ICartService {
    Cart getCartById(Long cartId);
    void clearCart();
    BigDecimal getTotalPrice(Long cartId);

    Cart initializeNewCart(User user);

    Cart getCartByUserId(Long userId);
}
