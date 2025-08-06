package com.example.dreamshops.service.user;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CleanUpService {
    private final UserService userService;

    // Every day at 2 AM, delete temp records older than 24 hours
    @Scheduled(cron = "0 0 2 * * ?")
    public void purgeOldVerifications() {
        userService.purgeExpired(24);
    }
}