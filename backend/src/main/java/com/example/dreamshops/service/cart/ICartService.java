package com.example.dreamshops.service.cart;

import com.example.dreamshops.model.Cart;
import com.example.dreamshops.model.User;

import java.math.BigDecimal;

public interface ICartService {
    void clearCart();
    BigDecimal getTotalPrice();
    Cart initializeNewCart(User user);
    Cart getCart();
}
