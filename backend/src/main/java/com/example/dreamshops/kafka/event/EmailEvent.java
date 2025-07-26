package com.example.dreamshops.kafka.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailEvent {
    private String to;
    private String subject;
    private String body;
    private String eventType;
}
