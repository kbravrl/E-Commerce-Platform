package com.example.dreamshops.kafka.consumer;

import com.example.dreamshops.kafka.event.ProductEvent;
import com.example.dreamshops.dto.ProductNotification;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductWebSocketTriggerConsumer {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @KafkaListener(topics = "product-topic", groupId = "product-ws-group")
    public void listen(ConsumerRecord<String, String> record) {
        try {
            ProductEvent event = objectMapper.readValue(record.value(), ProductEvent.class);

            ProductNotification notification = new ProductNotification(
                    "Product " + event.getEventType().toLowerCase() + ": " + event.getName(),
                    event.getEventType(),
                    event.getProductId()
            );


            messagingTemplate.convertAndSend("/topic/products", notification);
            System.out.printf("📢 ProductNotification sent to WebSocket: %s%n", notification);

        } catch (Exception e) {
            System.err.println("❌ ProductWebSocketTriggerConsumer error: " + e.getMessage());
        }
    }
}

