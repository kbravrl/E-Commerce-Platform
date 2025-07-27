package com.example.dreamshops.kafka.consumer;

import com.example.dreamshops.kafka.event.EmailEvent;
import com.example.dreamshops.kafka.event.UserDeletedEvent;
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
public class UserEmailTriggerConsumer {

    private final ObjectMapper objectMapper;
    private final EmailProducer emailProducer;

    @KafkaListener(topics = "user-topic", groupId = "user-email-trigger-group")
    public void listen(@Payload String message, @Header(KafkaHeaders.RECEIVED_KEY) String key) {
        try {
            UserDeletedEvent event = objectMapper.readValue(message, UserDeletedEvent.class);
            System.out.printf("📥 UserEmailTriggerConsumer received UserEvent: %s%n", event);

            EmailEvent emailEvent = new EmailEvent(
                    event.getEmail(),
                    "Your Account Has Been Deleted",
                    "Hello " + event.getFirstName() + ",\n\nYour account has been successfully deleted..",
                    "ACCOUNT_DELETED"
            );

            emailProducer.sendEmailEvent(emailEvent);

        } catch (Exception e) {
            System.err.println("❌ UserEmailTriggerConsumer error: " + e.getMessage());
        }
    }
}
