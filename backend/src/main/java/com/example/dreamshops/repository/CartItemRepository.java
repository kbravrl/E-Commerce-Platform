package com.example.dreamshops.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.dreamshops.model.CartItem;
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    void deleteAllByCartId(Long cartId);
}
