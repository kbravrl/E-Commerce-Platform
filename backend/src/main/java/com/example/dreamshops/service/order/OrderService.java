package com.example.dreamshops.service.order;

import com.example.dreamshops.dto.OrderDto;
import com.example.dreamshops.enums.OrderStatus;
import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.model.*;
import com.example.dreamshops.repository.OrderRepository;
import com.example.dreamshops.repository.ProductRepository;
import com.example.dreamshops.service.user.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.example.dreamshops.service.cart.CartService;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final ModelMapper mabelMapper;
    private final ProductRepository productRepository;
    private final IUserService userService;

    @Transactional
    @Override
    public Order placeOrder() {
        Cart cart = cartService.getCart();
        Order order = createOrder(cart);
        List<OrderItem> orderItems = createOrderItems(order, cart);
        order.setOrderItems(new HashSet<>(orderItems));
        order.setTotalAmount(calculateTotalAmount(orderItems));
        Order savedOrder = orderRepository.save(order);
        cartService.clearCart();
        return savedOrder;

    }

    private Order createOrder(Cart cart) {
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDate.now());
        order.setEstimatedDeliveryDate(LocalDate.now().plusDays(7));
        return order;
    }

    private List<OrderItem> createOrderItems(Order order, Cart cart) {
        return cart.getItems().stream().map(cartItem -> {
            Product product = cartItem.getProduct();
            product.setInventory(product.getInventory() - cartItem.getQuantity());
            productRepository.save(product);
            return new OrderItem(
                    order,
                    product,
                    cartItem.getQuantity(),
                    cartItem.getUnitPrice());
        }).toList();

    }

    private BigDecimal calculateTotalAmount(List<OrderItem> orderItems) {
        return orderItems.stream()
                .map(item -> item.getPrice()
                        .multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public OrderDto getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .map(this::convertToDto)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + orderId));
    }


    @Override
    public List<OrderDto> getUserOrders() {
        User user = userService.getAuthenticatedUser();
        List<Order> orders = orderRepository.findByUserId(user.getId());
        return orders.stream().map(this:: convertToDto).toList();
    }

    @Override
    public OrderDto convertToDto(Order order) {
        return mabelMapper.map(order, OrderDto.class);
    }
}
