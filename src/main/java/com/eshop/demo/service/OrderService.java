package com.eshop.demo.service;

import com.eshop.demo.DAO.*;
import com.eshop.demo.entity.*;
import com.eshop.demo.model.OrderBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final WebOrderDAO webOrderDAO;
    private final AddressDAO addressDAO;
    private final ProductDAO productDAO;
    private final PaymentDAO paymentDAO;
    @Autowired
    public OrderService( WebOrderDAO webOrderDAO, AddressDAO addressDAO,ProductDAO productDAO,PaymentDAO paymentDAO) {
        this.webOrderDAO = webOrderDAO;
        this.addressDAO = addressDAO;
        this.productDAO = productDAO;
        this.paymentDAO = paymentDAO;
    }

    public WebOrder saveOrder(User user, OrderBody orderBody){
        Payment payment = new Payment(orderBody.getCardNumber(), orderBody.getHolderName(), orderBody.getExpireDate());
        Optional<Payment> pay = paymentDAO.findByCardNumber(orderBody.getCardNumber());

        if(pay.isPresent()){
            payment=pay.get();
        }else {
            payment = paymentDAO.save(payment);
        }
        /*int id=0;
        for(var elem:user.getAddresses()){
            if(elem.getAddressLine1().equals(orderBody.getAddressLine1())){//1 user can't have 2 same addresses so this is going to be true 1 only time
                id= elem.getId();//keep the id of the address
                break;
            }
        }*/
        Address address = addressDAO.findById(user.getAddresses().get(0).getId()).get();
        WebOrder webOrder = new WebOrder(user,address,payment);
        for(var elem:orderBody.getProductQuantities().keySet()){
            webOrder.addQuantities(new WebOrderQuantities(webOrder,productDAO.findProductById(elem),orderBody.getProductQuantities().get(elem)));
        }
        webOrderDAO.save(webOrder);
        return webOrder;
    }
    public List<WebOrder> showOrders(User user){
        return webOrderDAO.findByUserId(user.getId());
    }
}
