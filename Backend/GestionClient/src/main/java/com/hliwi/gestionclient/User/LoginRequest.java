package com.hliwi.gestionclient.User;

import lombok.Data;

@Data
public class LoginRequest {
    private String userName;
    private String password;
}
