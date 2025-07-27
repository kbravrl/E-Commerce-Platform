package com.example.dreamshops.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

@Service
public class UserConsumer {

    @KafkaListener(topics = "user-topic", groupId = "user-group")
    public void listen(@Payload String message, @Header(KafkaHeaders.RECEIVED_KEY) String key) {
        System.out.printf("UserConsumer received UserEvent 📥 Message: " + message + " | 🔑 Key: " + key);
    }
}
