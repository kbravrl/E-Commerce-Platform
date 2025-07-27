package com.example.dreamshops.kafka.producer;

import com.example.dreamshops.kafka.event.ProductEvent;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductProducer {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper;
    private static final String TOPIC = "product-topic";

    public void sendProductEvent(ProductEvent event) {
        try {
            String json = objectMapper.writeValueAsString(event);
            kafkaTemplate.send(TOPIC, event.getProductId().toString(), json);
            System.out.printf("📤 ProductEvent sent to Kafka: %s%n", json);
        } catch (Exception e) {
            System.err.println("❌ ProductProducer error: " + e.getMessage());
        }
    }
}
