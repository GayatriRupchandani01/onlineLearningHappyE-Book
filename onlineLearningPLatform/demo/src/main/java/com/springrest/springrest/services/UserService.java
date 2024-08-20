package com.springrest.springrest.services;

import com.springrest.springrest.dao.UserRepository;
import com.springrest.springrest.dtos.UserDto;
import com.springrest.springrest.entities.UserEntity;
import com.springrest.springrest.exceptions.MyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userDao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserDto signUp(UserDto user) {
        UserEntity dbUser = userDao.findByUserName(user.getUserName());
        if (dbUser != null) {
            throw new MyException("User already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        UserEntity details = user.toUserEntity(user);
        userDao.save(details);
        return new UserDto(details);
    }

    public UserDto validateUser(String userName, String password) {
        UserEntity dbUser = userDao.findByUserName(userName);
        if (dbUser == null) {
            throw new MyException("User not found, please sign up");
        } else if (!passwordEncoder.matches(password, dbUser.getPassword())) {
            throw new MyException("Password is incorrect");
        }

        return new UserDto(dbUser);
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        UserEntity user = userDao.findByUserName(userName);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), new ArrayList<>());
    }
}