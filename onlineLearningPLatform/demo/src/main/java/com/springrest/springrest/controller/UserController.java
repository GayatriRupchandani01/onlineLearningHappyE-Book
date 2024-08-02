package com.springrest.springrest.controller;

import com.springrest.springrest.dtos.UserDto;
import com.springrest.springrest.dtos.UserloginDto;
import com.springrest.springrest.exceptions.MyException;
import com.springrest.springrest.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/signUp")
    public ResponseEntity<?> signUp(@Valid @RequestBody UserDto user) {
        try {
            UserDto userNew = userService.signUp(user);
            return new ResponseEntity<>(userNew, HttpStatus.OK);
        }
        catch (MyException e) {
            return new ResponseEntity<>(null,HttpStatus.CONFLICT);
        }
    }

    @PostMapping("/logIn")
    public ResponseEntity<?> login(@RequestBody UserloginDto userDetails) {
        try{
        String userName = userDetails.getUserName();
        String password = userDetails.getPassword();
        UserDto user = userService.validateUser(userName, password);
        return  new ResponseEntity<>(user, HttpStatus.OK);
        }
        catch (Exception e) {

                return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);

        }
    }


}
