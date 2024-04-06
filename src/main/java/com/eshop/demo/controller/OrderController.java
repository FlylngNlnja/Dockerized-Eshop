package com.eshop.demo.controller;

import com.eshop.demo.entity.User;
import com.eshop.demo.entity.WebOrder;
import com.eshop.demo.model.OrderBody;
import com.eshop.demo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
public class OrderController {
    private final OrderService orderService;
    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/orders")
    public ResponseEntity<?> addOrder(@AuthenticationPrincipal User user, @RequestBody OrderBody orders){
        if(user==null){
            return new ResponseEntity<>("The user is not authorize",HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(orderService.saveOrder(user, orders), HttpStatus.OK);
    }
    //TODO: SHOW ORDERS
    @GetMapping("/orders")
    public ResponseEntity<?> showOrders(@AuthenticationPrincipal User user)  {
        //List<WebOrder> orders;
        if(user==null){
            return new ResponseEntity<>("The user is not authorize",HttpStatus.UNAUTHORIZED);
        }else {
            return new ResponseEntity<>(orderService.showOrders(user), HttpStatus.OK);
        }
    }
}