package com.example.dreamshops.kafka.producer;

import com.example.dreamshops.kafka.event.UserDeletedEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String TOPIC = "user-topic";

    public void sendUserDeletedEvent(UserDeletedEvent event) {
        try {
            String json = objectMapper.writeValueAsString(event);
            kafkaTemplate.send(TOPIC, event.getUserId(), json);
            System.out.printf("📤 UserDeletedEvent sent to Kafka: %s%n", json);
        } catch (Exception e) {
            System.err.println("❌ UserProducer error: " + e.getMessage());
        }
    }
}
