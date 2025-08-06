package com.example.dreamshops.service.user;

import com.example.dreamshops.dto.UserDto;
import com.example.dreamshops.exceptions.AlreadyExistsException;
import com.example.dreamshops.exceptions.ResourceNotFoundException;
import com.example.dreamshops.kafka.producer.UserProducer;
import com.example.dreamshops.model.User;
import com.example.dreamshops.model.VerificationRequest;
import com.example.dreamshops.repository.VerificationRequestRepository;
import com.example.dreamshops.repository.UserRepository;
import com.example.dreamshops.request.CreateUserRequest;
import com.example.dreamshops.request.UserUpdateRequest;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;
import com.example.dreamshops.kafka.event.UserDeletedEvent;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService{
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;
    private final UserProducer userProducer;
    private final VerificationRequestRepository vReqRepo;

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    public String createVerification(CreateUserRequest request) {
        return Optional.of(request)
                .filter(user -> !userRepository.existsByEmail(request.getEmail()))
                .map(req -> {
                    String token = UUID.randomUUID().toString();
                    VerificationRequest vr = new VerificationRequest(
                            request.getFirstName(),
                            request.getLastName(),
                            request.getEmail(),
                            passwordEncoder.encode(request.getPassword()),
                            token
                    );
                    vReqRepo.save(vr);
                    return token;
                }).orElseThrow(() -> new AlreadyExistsException("User with this email already exists: " + request.getEmail()));
    }

    @Override
    public Boolean confirmAndCreateUser(String token) {
        Optional<VerificationRequest> opt = vReqRepo.findByToken(token);
        if (opt.isEmpty()) return false;

        VerificationRequest vr = opt.get();
        User user = new User();
        user.setFirstName(vr.getFirstName());
        user.setLastName(vr.getLastName());
        user.setEmail(vr.getEmail());
        user.setPassword(vr.getPassword());
        user.setEnabled(true);
        userRepository.save(user);

        vReqRepo.delete(vr);
        return true;
    }

    @Override
    public void purgeExpired(long hours) {
        LocalDateTime cutoff = LocalDateTime.now().minusHours(hours);
        vReqRepo.findAllByCreatedAtBefore(cutoff).forEach(vReqRepo::delete);
    }

    @Override
    public User updateUser(Long userId, UserUpdateRequest request) {
        return userRepository.findById(userId).map(existingUser -> {
            existingUser.setFirstName(request.getFirstName());
            existingUser.setLastName(request.getLastName());
            return userRepository.save(existingUser);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.findById(userId).ifPresentOrElse(user -> {
            userRepository.delete(user);

            UserDeletedEvent event = new UserDeletedEvent(
                    user.getId().toString(),
                    user.getEmail(),
                    user.getFirstName(),
                    user.getLastName()
            );
            userProducer.sendUserDeletedEvent(event);

        }, () -> {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        });
    }

    @Override
    public UserDto convertUserToDto(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userRepository.findByEmail(email);

    }


}
