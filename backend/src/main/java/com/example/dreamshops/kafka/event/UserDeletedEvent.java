package com.example.dreamshops.kafka.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDeletedEvent {
    private String userId;
    private String email;
    private String firstName;
    private String lastName;
}
