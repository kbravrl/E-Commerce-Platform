package com.example.dreamshops.dto;

import com.example.dreamshops.enums.OrderStatus;
import jakarta.persistence.criteria.Order;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class OrderDto {
    private Long id;
    private Long userId;
    private LocalDate orderDate;
    private LocalDate estimatedDeliveryDate;
    private BigDecimal totalAmount;
    private String statusDisplayName;
    private List<OrderItemDto> items;

}
