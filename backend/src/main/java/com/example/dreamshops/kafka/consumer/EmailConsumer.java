package com.example.dreamshops.kafka.consumer;

import com.example.dreamshops.kafka.event.EmailEvent;
import com.example.dreamshops.service.notification.EmailService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailConsumer {
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final EmailService emailService;

    @KafkaListener(topics = "email-topic", groupId = "email-group")
    public void listen(ConsumerRecord<String, String> record) {
        try {
            EmailEvent event = objectMapper.readValue(record.value(), EmailEvent.class);
            System.out.printf("📩 EmailEvent received from Kafka: %s%n", event);

            emailService.sendEmail(event.getTo(), event.getSubject(), event.getBody());
        } catch (Exception e) {
            System.err.println("❌ EmailConsumer was unable to process the message: " + e.getMessage());
        }
    }
}
