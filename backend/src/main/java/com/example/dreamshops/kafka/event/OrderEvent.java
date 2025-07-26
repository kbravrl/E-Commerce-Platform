package com.example.dreamshops.kafka.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderEvent {
    private Long orderId;
    private Long userId;
    private LocalDate orderDate;
    private LocalDate estimatedDeliveryDate;
    private BigDecimal totalAmount;
    private String orderStatus;
}
