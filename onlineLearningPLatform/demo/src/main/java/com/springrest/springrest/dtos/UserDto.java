package com.springrest.springrest.dtos;

import com.springrest.springrest.RoleTypeEnum;
import com.springrest.springrest.entities.UserEntity;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private Long id;

    @NotBlank(message = "Email is mandatory")
    @Email(message = "Invalid email format", regexp = "^[\\w.+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")
    private String email;

    @NotBlank(message = "Username is mandatory")
    private String userName;

    @NotBlank(message = "Password is mandatory")
    @Size(min = 6, message = "password should have at least 6 characters")
    private String password;
    @NotBlank(message = "First name is mandatory")
    private String firstName;
    private String middleName;
    private String lastName;

    @NotNull(message = "Role is mandatory")
    private RoleTypeEnum role;
    private EnrollmentDto enrollment;

    public UserDto(UserEntity userEntity) {
        this.id = userEntity.getId();
        this.email = userEntity.getEmail();
        this.userName = userEntity.getUserName();
        this.password = userEntity.getPassword();
        this.firstName = userEntity.getFirstName();
        this.middleName = userEntity.getMiddleName();
        this.lastName = userEntity.getLastName();
        this.role = userEntity.getRole();
    }

    public UserEntity toUserEntity(UserDto user) {
        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(user.getEmail());
        userEntity.setUserName(user.getUserName());
        userEntity.setPassword(user.getPassword());
        userEntity.setFirstName(user.getFirstName());
        userEntity.setMiddleName(user.getMiddleName());
        userEntity.setLastName(user.getLastName());
        userEntity.setRole(user.getRole());
        return userEntity;
    }
}
