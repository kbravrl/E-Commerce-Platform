package com.example.dreamshops.kafka.producer;

import com.example.dreamshops.kafka.event.EmailEvent;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private final ObjectMapper objectMapper = new ObjectMapper();
    private static final String TOPIC = "email-topic";
    public void sendEmailEvent(EmailEvent event) {
        try {
            String json = objectMapper.writeValueAsString(event);
            kafkaTemplate.send(TOPIC, event.getTo(), json);
            System.out.printf("📤 EmailEvent sent to Kafka: %s%n", json);
        } catch (JsonProcessingException e) {
            System.err.println("❌ EmailEvent could not be converted to JSON: " + e.getMessage());
        }
    }
}
