package com.example.dreamshops.kafka.consumer;

import com.example.dreamshops.kafka.event.EmailEvent;
import com.example.dreamshops.kafka.event.UserDeletedEvent;
import com.example.dreamshops.kafka.producer.EmailProducer;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserConsumer {
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final EmailProducer emailProducer;

    @KafkaListener(topics = "user-topic", groupId = "user-event-group")
    public void listen(ConsumerRecord<String, String> record) {
        try {
            UserDeletedEvent event = objectMapper.readValue(record.value(), UserDeletedEvent.class);
            System.out.printf("📥 User deleted event received: %s%n", event);

            EmailEvent emailEvent = new EmailEvent(
                    event.getEmail(),
                    "Your Account Has Been Deleted",
                    "Hello " + event.getFirstName() + ",\n\nYour account has been successfully deleted..",
                    "ACCOUNT_DELETED");

            emailProducer.sendEmailEvent(emailEvent);

        } catch (Exception e) {
            System.err.println("❌ UserEventConsumer error: " + e.getMessage());
        }
    }
}
