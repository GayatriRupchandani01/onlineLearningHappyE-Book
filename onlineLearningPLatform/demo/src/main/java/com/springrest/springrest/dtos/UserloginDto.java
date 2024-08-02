package com.springrest.springrest.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserloginDto {

    @NotBlank(message = "Username is mandatory")
    private String userName;
    @Size(min = 8, message = "password should have at least 8 characters")
    private String password;
}
