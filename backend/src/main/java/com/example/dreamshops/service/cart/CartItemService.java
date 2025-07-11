package com.example.dreamshops.service.cart;

import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.model.Cart;
import com.example.dreamshops.model.CartItem;
import com.example.dreamshops.model.Product;
import com.example.dreamshops.model.User;
import com.example.dreamshops.repository.CartItemRepository;
import com.example.dreamshops.repository.CartRepository;
import com.example.dreamshops.service.product.IProductService;
import com.example.dreamshops.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class CartItemService implements ICartItemService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;
    private final IProductService productService;
    private final ICartService cartService;

    @Override
    public CartItem getCartItem(Long userId, Long productId) {
        Cart cart = cartService.getCartByUserId(userId);
        return cart.getItems()
                .stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Item not found in cart"));

    }

    @Override
    public void addItemToCart(Long userId,Long productId, int quantity) {
        Cart cart = cartService.getCart(userId);
        Product product = productService.getProductById(productId);
        CartItem cartItem = cart.getItems()
                .stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst().orElse(new CartItem());

        if (cartItem.getId() == null) {
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(quantity);
            cartItem.setUnitPrice(product.getPrice());

        } else {
            cartItem.setQuantity(cartItem.getQuantity() + quantity);
        }
        cartItem.setTotalPrice();
        cart.addItem(cartItem);
        cartItemRepository.save(cartItem);
        cartRepository.save(cart);
    }

    @Override
    public void removeItemFromCart(Long userId, Long productId) {
        Cart cart = cartService.getCartByUserId(userId);
        CartItem itemToRemove = getCartItem(userId, productId);
        cart.removeItem(itemToRemove);
        cartRepository.save(cart);
    }

    @Override
    public void updateItemQuantity(Long userId, Long productId, int quantity) {
        Cart cart = cartService.getCartByUserId(userId);
        cart.getItems()
                .stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(quantity);
                    item.setUnitPrice(item.getProduct().getPrice());
                    item.setTotalPrice();
                });
        BigDecimal totalAmount = cart.getItems()
                .stream()
                .map(CartItem:: getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalAmount(totalAmount);
        cartRepository.save(cart);
    }

}