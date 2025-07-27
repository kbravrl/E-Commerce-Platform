package com.example.dreamshops.kafka.producer;

import com.example.dreamshops.kafka.event.OrderEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OrderProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String TOPIC = "order-topic";

    public void sendOrderEvent(OrderEvent event) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(event);
            kafkaTemplate.send(TOPIC, event.getUserId().toString(), jsonMessage);
            System.out.println("📤 OrderEvent sent to Kafka: " + jsonMessage);
        } catch (JsonProcessingException e) {
            System.err.println("❌ OrderProducer error: " + e.getMessage());
        }
    }
}
