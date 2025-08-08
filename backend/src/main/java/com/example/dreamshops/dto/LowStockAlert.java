package com.example.dreamshops.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LowStockAlert {
    private Long productId;
    private String productName;
    private int remaining;
    private String message;
}
