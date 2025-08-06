package com.example.dreamshops.service.user;
import com.example.dreamshops.dto.UserDto;
import com.example.dreamshops.model.User;
import com.example.dreamshops.request.CreateUserRequest;
import com.example.dreamshops.request.UserUpdateRequest;

public interface IUserService {
    User getUserById(Long userId);
    String createVerification(CreateUserRequest request);
    Boolean confirmAndCreateUser(String token);
    void purgeExpired(long hours);
    User updateUser(Long userId, UserUpdateRequest request);
    void deleteUser(Long userId);
    UserDto convertUserToDto(User user);
    User getAuthenticatedUser();

}
