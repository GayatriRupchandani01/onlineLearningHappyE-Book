package com.springrest.springrest.services;

import com.springrest.springrest.dao.UserRepository;
import com.springrest.springrest.dtos.UserDto;
import com.springrest.springrest.entities.UserEntity;
import com.springrest.springrest.exceptions.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userDao;

    public UserDto signUp(UserDto user) {
        UserEntity dbUser = userDao.findByUserName(user.getUserName());
        if(dbUser != null) {
            throw new MyException("User already Exist");
        }
        UserEntity details = user.toUserEntity(user);
        userDao.save(details);
        return new UserDto(details);
    }

    public UserDto validateUser(String userName, String password) {
        UserEntity dbUser = userDao.findByUserName(userName);
        if(dbUser == null) {
            throw new MyException("User not Found, please sign up");
        }
        else if(dbUser != null && !dbUser.getPassword().equals(password)) {
            throw new MyException("Password is incorrect");
        }

        return new UserDto(dbUser);
    }
}
