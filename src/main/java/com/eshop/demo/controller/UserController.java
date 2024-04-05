package com.eshop.demo.controller;
import com.eshop.demo.entity.User;
import com.eshop.demo.exception.UserNotFound;
import com.eshop.demo.exception.UserAlreadyExists;
import com.eshop.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController{
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/ShopNow/profile")
    public ResponseEntity<?> profile(@AuthenticationPrincipal User user){//this will run before profile method as a result will inject the user instance even if is not authorize
        if(user==null){
            return new ResponseEntity<>("The user is not authorized", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/Admin/Users")
    public ResponseEntity<?> getUsers(@AuthenticationPrincipal User user){
        if(user==null){
            return new ResponseEntity<>("The user is not authorized", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }
    @DeleteMapping("/Users/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable int userId) throws UserNotFound {
        return new ResponseEntity<>(userService.deleteUser(userId),HttpStatus.OK);
    }

    @PutMapping("/Users")
    public ResponseEntity<String> updateUser(@AuthenticationPrincipal User user,@RequestBody User newUser) throws UserAlreadyExists {
        if(user==null){
            return new ResponseEntity<>("The user is not authorized", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>("{\"token\": \"" + userService.updateUser(user,newUser) + "\"}",HttpStatus.OK);
    }
    @GetMapping("/admin")
    public ResponseEntity<?> defineRole(@AuthenticationPrincipal User user){
        if(user==null){
            return new ResponseEntity<>(false,HttpStatus.OK);
        }else{
            return new ResponseEntity<>(userService.defineUser(user.getUsername()),HttpStatus.OK);
        }
    }
}
