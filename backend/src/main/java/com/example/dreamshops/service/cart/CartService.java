package com.example.dreamshops.service.cart;

import com.example.dreamshops.dto.LowStockAlert;
import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.model.Cart;
import com.example.dreamshops.model.Product;
import com.example.dreamshops.model.User;
import com.example.dreamshops.repository.CartItemRepository;
import com.example.dreamshops.repository.CartRepository;
import com.example.dreamshops.repository.ProductRepository;
import com.example.dreamshops.service.user.IUserService;
import com.example.dreamshops.service.ws.StockAlertPublisher;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class CartService implements ICartService {
    private static final int LOW_STOCK_THRESHOLD = 3;

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final IUserService userService;
    private final StockAlertPublisher stockAlertPublisher;

    private void maybeNotifyLowStock(Cart cart) {
        cart.getItems().forEach(cartItem -> {
            Product product = cartItem.getProduct();
            int inv = product.getInventory();
            if (inv <= LOW_STOCK_THRESHOLD) {
                stockAlertPublisher.broadcastLowStock(
                        new LowStockAlert(
                                product.getId(),
                                product.getName(),
                                inv,
                                "Dikkat! '" + product.getName() + "' için stokta sadece " + inv + " adet kaldı."
                        )
                );
            }
        });
    }

    @Override
    public Cart getCart() {
        User user = userService.getAuthenticatedUser();
        return Optional.ofNullable(getCartByUserId(user.getId()))
                .map(cart -> {
                    BigDecimal totalAmount = cart.getTotalAmount();
                    cart.setTotalAmount(totalAmount);
                    maybeNotifyLowStock(cart);
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
