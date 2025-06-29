package com.example.dreamshops.controller;

import com.example.dreamshops.dto.OrderDto;
import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.model.User;
import com.example.dreamshops.response.ApiResponse;
import com.example.dreamshops.service.order.IOrderService;
import com.example.dreamshops.model.Order;
import com.example.dreamshops.service.user.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("${api.prefix}/orders")
public class OrderController {
    private final IOrderService orderService;

    @PostMapping("/create")
    public ResponseEntity<ApiResponse> createOrder() {
        try {
            Order order = orderService.placeOrder();
            OrderDto orderDto = orderService.convertToDto(order);
            return ResponseEntity.ok(new ApiResponse("Order created successfully", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Failed to create order: " + e.getMessage(), null));
        }
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse> getOrderById(@PathVariable Long orderId) {
        try {
            OrderDto order = orderService.getOrderById(orderId);
            return ResponseEntity.ok(new ApiResponse("Order retrieved successfully", order));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Order not found: " + e.getMessage(), null));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getUserOrders() {
        try {
            List<OrderDto> orders = orderService.getUserOrders();
            return ResponseEntity.ok(new ApiResponse("User orders retrieved successfully", orders));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("No orders found for user: " + e.getMessage(), null));
        }
    }
}
