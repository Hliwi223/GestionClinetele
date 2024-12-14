package com.hliwi.gestionclient.User;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDTO registerUser(UserDTO userDTO) {
        User user = UserDTO.toEntity(userDTO);
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setRole(Role.valueOf("ADMIN"));
        return UserDTO.fromEntity(userRepository.save(user));
    }

    public UserDTO authenticateUser(String userName, String password) {
        Optional<User> user = userRepository.findByFirstname(userName);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            return UserDTO.fromEntity(user.get());
        }
        return null;
    }
}
