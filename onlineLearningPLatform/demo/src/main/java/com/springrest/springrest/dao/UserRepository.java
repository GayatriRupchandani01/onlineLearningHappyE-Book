package com.springrest.springrest.dao;

import com.springrest.springrest.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity,Long> {
    UserEntity findByUserName(String userId);
}
