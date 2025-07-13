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
    public Cart getCart() {
        User user = userService.getAuthenticatedUser();
        return Optional.ofNullable(getCartByUserId(user.getId()))
                .map(cart -> {
                    BigDecimal totalAmount = cart.getTotalAmount();
                    cart.setTotalAmount(totalAmount);
                    return cartRepository.save(cart);
                })
                .orElseGet(() -> {
                    User user1 = Optional.ofNullable(userService.getUserById(user.getId()))
                            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                    return initializeNewCart(user1);
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
    public BigDecimal getTotalPrice() {
        User user = userService.getAuthenticatedUser();
        Cart cart = getCartByUserId(user.getId());
        return cart.getTotalAmount();
    }

    @Transactional
    @Override
    public void clearCart() {
        User user = userService.getAuthenticatedUser();
        Cart cart = getCartByUserId(user.getId());
        cartItemRepository.deleteAllByCartId(cart.getId());
        cart.clearCart();
        cartRepository.deleteById(cart.getId());
    }
}
