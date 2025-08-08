package com.example.dreamshops.service.ws;

import com.example.dreamshops.dto.LowStockAlert;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StockAlertPublisher {
    private final SimpMessagingTemplate messagingTemplate;
    public void broadcastLowStock(LowStockAlert alert) {
        messagingTemplate.convertAndSend("/topic/stock-alerts", alert);
    }
}