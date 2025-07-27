package com.example.dreamshops.kafka.consumer;

import com.example.dreamshops.kafka.event.EmailEvent;
import com.example.dreamshops.kafka.event.OrderEvent;
import com.example.dreamshops.kafka.producer.EmailProducer;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class OrderEmailTriggerConsumer {

    private final ObjectMapper objectMapper;
    private final EmailProducer emailProducer;

    @KafkaListener(topics = "order-topic", groupId = "email-trigger-group")
    public void listen(@Payload String message, @Header(KafkaHeaders.RECEIVED_KEY) String key) {
        try {
            OrderEvent orderEvent = objectMapper.readValue(message, OrderEvent.class);
            System.out.printf("📥 EmailTriggerConsumer received OrderEvent: %s%n", orderEvent);

            EmailEvent emailEvent = new EmailEvent(
                    orderEvent.getUserEmail(),
                    "Your Order Has Been Received ✔️",
                    "Hello " + orderEvent.getUserFirstName() + ",\n\nYour order has been created successfully.",
                    "ORDER_CONFIRMATION"
            );

            emailProducer.sendEmailEvent(emailEvent);

        } catch (Exception e) {
            System.err.println("❌ EmailTriggerConsumer error: " + e.getMessage());
        }
    }
}

