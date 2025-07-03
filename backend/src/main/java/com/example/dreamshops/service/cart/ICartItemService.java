package com.example.dreamshops.service.cart;

import com.example.dreamshops.model.CartItem;

public interface ICartItemService {
    void addItemToCart(Long userId, Long productId, int quantity);
    void removeItemFromCart(Long userId, Long productId);
    void updateItemQuantity(Long userId, Long productId, int quantity);
    CartItem getCartItem(Long userId, Long productId);
}
