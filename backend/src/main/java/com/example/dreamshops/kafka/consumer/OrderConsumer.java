package com.example.dreamshops.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class OrderConsumer {
    @KafkaListener(topics = "order-topic", groupId = "order-group")
    public void listen(@Payload String message, @Header(KafkaHeaders.RECEIVED_KEY) String key) {
        System.out.println("📥 Message: " + message + " | 🔑 Key: " + key);
    }
}
