package com.eshop.demo.service;

import com.eshop.demo.DAO.RoleDAO;
import com.eshop.demo.DAO.UserDAO;
import com.eshop.demo.entity.Address;
import com.eshop.demo.entity.Role;
import com.eshop.demo.entity.User;
import com.eshop.demo.exception.UserNotFound;
import com.eshop.demo.exception.UserNotVerifiedException;
import com.eshop.demo.exception.UserAlreadyExists;
import com.eshop.demo.model.LoginBody;
import com.eshop.demo.model.RegistrationBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserDAO userDAO;
    private final RoleDAO roleDAO;
    private final EncryptionService encryptionService;
    private final JWTService jwtService;

    @Autowired
    public UserService(UserDAO userDAO,RoleDAO roleDAO,EncryptionService encryptionService,JWTService jwtService) {
        this.userDAO = userDAO;
        this.roleDAO=roleDAO;
        this.encryptionService=encryptionService;
        this.jwtService=jwtService;
    }

    public List<User> getUsers(){
        return userDAO.findAll();
    }
    //REGISTER FUNCTION
    public User addUser(RegistrationBody registrationBody) throws UserAlreadyExists {
        //NOT ALLOWED TO PASS 2 SAME RECORDS
        if(userDAO.findByEmailIgnoreCase(registrationBody.getEmail()).isPresent() ||
                userDAO.findByUsernameIgnoreCase(registrationBody.getUsername()).isPresent()){
            throw new UserAlreadyExists("Username or Email already exists");
        }
        User user = new User(registrationBody.getUsername()
                ,encryptionService.encryptPassword(registrationBody.getPassword())
                ,registrationBody.getEmail(),registrationBody.getFirstName()
                ,registrationBody.getLastName(),registrationBody.getPhoneNumber(),registrationBody.getBirthDate()
        );
        Address address = new Address(registrationBody.getAddressLine()
                ,registrationBody.getCity()
                ,registrationBody.getCountry()
                ,registrationBody.getPostCode());
        user.addAddress(address);
        userDAO.save(user);
        Role role = new Role();
        role.setUsername(user.getUsername());
        role.setRoleName("ROLE_USER");
        roleDAO.save(role);
        return user;
    }

    //LOGIN ENGINE
    public String loginUser(LoginBody loginBody) throws UserNotVerifiedException{
        Optional<User> user;
        if((user = userDAO.findByUsernameIgnoreCase(loginBody.getUsername())).isPresent()){
            User us = user.get();
            if(encryptionService.verifyPassword(loginBody.getPassword(),us.getPassword())){
                return jwtService.generateToken(us);
            }else{
                throw new UserNotVerifiedException("Wrong password");
            }
        }else{
            throw new UserNotVerifiedException("Wrong username");
        }
    }

    public String deleteUser(int id) throws UserNotFound{
        Optional<User> user = userDAO.findById(id);

        if(user.isPresent()){
            userDAO.delete(user.get());
            return "The user deleted successfully with id "+id;
        }else{
            throw new UserNotFound("The user is not found ");
        }
    }

    public boolean defineUser(String username){
        Optional<Role> role = roleDAO.findByUsernameIgnoreCase(username);
        //TODO:  LEARN THE BELOW
        return role.map(value -> value.getRoleName().equals("ROLE_ADMIN")).orElse(false);
    }

    public String updateUser(User user,User newUser) throws UserAlreadyExists {
        newUser.setId(user.getId());//get the id !!very important for not inserting again the user
        if(newUser.getPassword().isEmpty()) {
            newUser.setPassword(user.getPassword());//front end will send default pass "" if the user didn't change the password in the update
        }
        else {
            newUser.setPassword(encryptionService.encryptPassword(newUser.getPassword()));//Encrypt the password
        }
        List<Address> add = user.getAddresses();
        List<Address> add1 = newUser.getAddresses();
        //we add the ids and user id of old addresses to the new addresses
        for(int i=0;i<add1.size();i++){
            add1.get(i).setId(add.get(i).getId());
            add1.get(i).setUser(add.get(i).getUser());
        }
        if(user.getUsername().equals(newUser.getUsername()) || userDAO.findByUsernameIgnoreCase(newUser.getUsername()).isEmpty() || userDAO.findByEmailIgnoreCase(newUser.getEmail()).isEmpty()){
            return jwtService.generateToken(userDAO.save(newUser));
        }else{
            throw new UserAlreadyExists("The username or email already exists");
        }
    }
}
