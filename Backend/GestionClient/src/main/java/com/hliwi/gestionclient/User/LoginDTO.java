package com.hliwi.gestionclient.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class LoginDTO {

    private String username;
    private String password;
}
