package com.example.dreamshops.kafka.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductEvent {
    private Long productId;
    private String name;
    private String brand;
    private String eventType; // ADDED, UPDATED, DELETED
}

