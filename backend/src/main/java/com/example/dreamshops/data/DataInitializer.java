package com.example.dreamshops.data;

import com.example.dreamshops.model.User;
import com.example.dreamshops.model.Role;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import com.example.dreamshops.repository.UserRepository;

import java.util.Set;

@Transactional
@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationListener<ApplicationReadyEvent> {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        createDefaultRolesIfNotExist(Set.of("ROLE_USER", "ROLE_ADMIN"));
        createDefaultAdminsIfNotExist();
        createDefaultUsersIfNotExist();
    }

    private Role getOrCreateRole(String name) {
        return roleRepository.findByName(name).orElseGet(() -> {
            Role r = new Role();
            r.setName(name);
            return roleRepository.save(r);
        });
    }

    private void createDefaultRolesIfNotExist(Set<String> roles) {
        for (String name : roles) {
            getOrCreateRole(name);
        }
    }

    private void createDefaultUsersIfNotExist() {
        Role userRole = getOrCreateRole("ROLE_USER");

        for (int i = 1; i <= 5; i++) {
            String email = "user" + i + "@email.com";
            if (userRepository.existsByEmail(email)) continue;

            User user = new User();
            user.setFirstName("The");
            user.setLastName("User " + i);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode("123456"));
            user.setEnabled(true);
            user.setRoles(Set.of(userRole));

            userRepository.save(user);
            System.out.println("[Seed] Default user created: " + email);
        }
    }

    private void createDefaultAdminsIfNotExist() {
        Role adminRole = getOrCreateRole("ROLE_ADMIN");

        for (int i = 1; i <= 2; i++) {
            String email = "admin" + i + "@email.com";
            if (userRepository.existsByEmail(email)) continue;

            User user = new User();
            user.setFirstName("Admin");
            user.setLastName("Admin " + i);
            user.setEmail(email);
            user.setPassword(passwordEncoder.encode("123456"));
            user.setEnabled(true);
            user.setRoles(Set.of(adminRole));

            userRepository.save(user);
            System.out.println("[Seed] Default admin created: " + email);
        }
    }
}