package com.springrest.springrest.entities;

import com.springrest.springrest.RoleTypeEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "users")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String userName;
    private String password;
    private String firstName;
    private String middleName;
    private String lastName;
    private RoleTypeEnum role;

}
