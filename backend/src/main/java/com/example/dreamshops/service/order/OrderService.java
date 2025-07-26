package com.example.dreamshops.service.order;

import com.example.dreamshops.dto.OrderDto;
import com.example.dreamshops.enums.OrderStatus;
import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.kafka.producer.EmailProducer;
import com.example.dreamshops.kafka.producer.OrderProducer;
import com.example.dreamshops.model.*;
import com.example.dreamshops.repository.OrderRepository;
import com.example.dreamshops.repository.ProductRepository;
import com.example.dreamshops.service.user.IUserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.dreamshops.service.cart.CartService;
import com.example.dreamshops.kafka.event.OrderEvent;
import com.example.dreamshops.kafka.event.EmailEvent;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final CartService cartService;
    private final IUserService userService;
    private final ModelMapper mabelMapper;
    private final ProductRepository productRepository;
    private final OrderProducer orderProducer;
    @Autowired
    private EmailProducer emailProducer;

    @Transactional
    @Override
    public OrderDto placeOrder() {
        User user = userService.getAuthenticatedUser();
        Cart cart = cartService.getCartByUserId(user.getId());
        Order order = createOrder(cart);
        List<OrderItem> orderItems = createOrderItems(order, cart);
        order.setOrderItems(new HashSet<>(orderItems));
        order.setTotalAmount(calculateTotalAmount(orderItems));
        Order savedOrder = orderRepository.save(order);
        cartService.clearCart();

        OrderEvent event = new OrderEvent(
                savedOrder.getOrderId(),
                savedOrder.getUser().getId(),
                savedOrder.getOrderDate(),
                savedOrder.getEstimatedDeliveryDate(),
                savedOrder.getTotalAmount(),
                savedOrder.getOrderStatus().name()
        );

        emailProducer.sendEmailEvent(new EmailEvent(
                user.getEmail(),
                "Your Order Has Been Received ✔️",
                "Hello " + user.getFirstName() + ",\n\nYour order has been created successfully..",
                "ORDER_CONFIRMATION"
        ));

        orderProducer.sendOrderEvent(event);
        return convertToDto(savedOrder);
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
