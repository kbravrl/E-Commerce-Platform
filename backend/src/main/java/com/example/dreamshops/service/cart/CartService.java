package com.example.dreamshops.service.cart;

import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.model.Cart;
import com.example.dreamshops.model.User;
import com.example.dreamshops.repository.CartItemRepository;
import com.example.dreamshops.repository.CartRepository;
import com.example.dreamshops.service.user.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CartService implements ICartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final IUserService userService;

    @Override
    public Cart getCart(Long userId) {
        return Optional.ofNullable(getCartByUserId(userId))
                .map(cart -> {
                    BigDecimal totalAmount = cart.getTotalAmount();
                    cart.setTotalAmount(totalAmount);
                    return cartRepository.save(cart);
                })
                .orElseGet(() -> {
                    User user = Optional.ofNullable(userService.getUserById(userId))
                            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                    return initializeNewCart(user);
                });
    }

    @Override
    public Cart initializeNewCart(User user) {
        return Optional.ofNullable(getCartByUserId(user.getId()))
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });
    }

    @Override
    public Cart getCartByUserId(Long userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public BigDecimal getTotalPrice(Long userId) {
        Cart cart = getCartByUserId(userId);
        return cart.getTotalAmount();
    }

    @Transactional
    @Override
    public void clearCart(Long userId) {
        Cart cart = getCartByUserId(userId);
        cartItemRepository.deleteAllByCartId(cart.getId());
        cart.clearCart();
        cartRepository.deleteById(cart.getId());
    }
}
