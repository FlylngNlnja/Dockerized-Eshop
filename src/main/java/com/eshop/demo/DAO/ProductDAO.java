package com.eshop.demo.DAO;

import com.eshop.demo.entity.Product;
import com.eshop.demo.entity.User;
import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


public interface ProductDAO{
    List<Product> findProducts();
    List<Product> findAll();
    List<Product> searchProducts(String keyword);
    Product addProduct(Product product);
    void deleteProduct(Product product);
    Product findProductById(int id);
    List<Product> getProductByCategory(int id);
    List<Product> cart(List<String> ids);


}
