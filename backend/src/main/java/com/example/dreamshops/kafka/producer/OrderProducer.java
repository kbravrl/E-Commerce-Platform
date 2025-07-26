package com.example.dreamshops.kafka.producer;

import com.example.dreamshops.kafka.event.OrderEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class OrderProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String TOPIC_NAME = "order-topic";
    public OrderProducer(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    public void sendOrderEvent(OrderEvent event) {
        try {
            String jsonMessage = objectMapper.writeValueAsString(event);
            kafkaTemplate.send(TOPIC_NAME, event.getUserId().toString(), jsonMessage);
            System.out.println("✅ Kafka message sent: " + jsonMessage);
        } catch (JsonProcessingException e) {
            System.err.println("❌ Kafka message could not be converted to JSON: " + e.getMessage());
        }
    }
}
