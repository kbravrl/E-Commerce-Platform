package com.example.dreamshops.repository;

import com.example.dreamshops.model.VerificationRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

public interface VerificationRequestRepository extends JpaRepository<VerificationRequest, Long> {
    Optional<VerificationRequest> findByToken(String token);
    List<VerificationRequest> findAllByCreatedAtBefore(LocalDateTime cutoff);
}