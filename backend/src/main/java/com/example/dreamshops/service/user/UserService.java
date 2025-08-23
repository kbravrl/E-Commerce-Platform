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
import com.example.dreamshops.service.notification.TwilioVerifyService;
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
    private final TwilioVerifyService twilioVerifyService;

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
    }

    @Override
    public String createVerificationBySms(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail()))
            throw new AlreadyExistsException("User with this email already exists: " + request.getEmail());

        String token = UUID.randomUUID().toString();
        VerificationRequest vr = new VerificationRequest(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPhone(),
                passwordEncoder.encode(request.getPassword()),
                token
        );
        vReqRepo.save(vr);

        twilioVerifyService.sendSmsCode(request.getPhone());

        return token;
    }

    @Override
    public boolean confirmAndCreateUserBySms(String token, String code) {
        VerificationRequest vr = vReqRepo.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired token."));

        boolean ok = twilioVerifyService.checkCode(vr.getPhone(), code);
        if (!ok) return false;

        User user = new User();
        user.setFirstName(vr.getFirstName());
        user.setLastName(vr.getLastName());
        user.setEmail(vr.getEmail());
        user.setPhone(vr.getPhone());
        user.setPassword(vr.getPassword());
        user.setEnabled(true);
        userRepository.save(user);

        vReqRepo.delete(vr);
        return true;
    }

    @Override
    public String createVerificationByEmail(CreateUserRequest request) {
        if (userRepository.existsByEmail(request.getEmail()))
            throw new AlreadyExistsException("User with this email already exists: " + request.getEmail());

        String token = UUID.randomUUID().toString();
        VerificationRequest vr = new VerificationRequest(
                request.getFirstName(),
                request.getLastName(),
                request.getEmail(),
                request.getPhone(),
                passwordEncoder.encode(request.getPassword()),
                token
        );
        vReqRepo.save(vr);

        return token;
    }

    @Override
    public Boolean confirmAndCreateUserByEmail(String token) {
        VerificationRequest vr = vReqRepo.findByToken(token)
                .orElseThrow(() -> new ResourceNotFoundException("Invalid or expired token."));

        User user = new User();
        user.setFirstName(vr.getFirstName());
        user.setLastName(vr.getLastName());
        user.setEmail(vr.getEmail());
        user.setPhone(vr.getPhone());
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
