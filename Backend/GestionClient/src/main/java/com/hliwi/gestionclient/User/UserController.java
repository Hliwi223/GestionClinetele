package com.hliwi.gestionclient.User;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/auth")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserDTO register(@RequestBody UserDTO userDTO) {
        return userService.registerUser(userDTO);
    }

    @PostMapping("/login")
    public UserDTO loginUser(@RequestBody LoginRequest loginRequest) {
        return userService.authenticateUser(loginRequest.getUserName(), loginRequest.getPassword());
    }
}
