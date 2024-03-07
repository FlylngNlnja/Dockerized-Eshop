package com.eshop.demo.controller;
import com.eshop.demo.entity.Role;
import com.eshop.demo.entity.User;
import com.eshop.demo.exception.ProductNotFound;
import com.eshop.demo.exception.UserNotFound;
import com.eshop.demo.exception.UsernameOrEmailAlreadyExists;
import com.eshop.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController{
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/ShopNow/profile")
    public ResponseEntity<?> profile(@AuthenticationPrincipal User user){//this will run before profile method as a result will inject the user instance even if is not authorize
        if(user==null){
            return new ResponseEntity<>("The user is not authorized serv", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @DeleteMapping("/Users/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable int userId) throws UserNotFound {
        return new ResponseEntity<>(userService.deleteUser(userId),HttpStatus.OK);
    }
    @PutMapping("/Users")
    public ResponseEntity<?> updateUser(@AuthenticationPrincipal User user,@RequestBody User newUser) throws UsernameOrEmailAlreadyExists {
        if(user==null){
            return new ResponseEntity<>("The user is not authorized", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(userService.updateUser(user,newUser),HttpStatus.OK);
    }



    @GetMapping("/admin")
    public ResponseEntity<?> defineRole(@AuthenticationPrincipal User user){
        if(user==null){
            return new ResponseEntity<>(false,HttpStatus.OK);
        }else{
            return  new ResponseEntity<>(userService.defineUser(user.getUsername()),HttpStatus.OK);
        }
    }








}
