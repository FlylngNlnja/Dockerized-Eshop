package com.eshop.demo.controller;

import com.eshop.demo.entity.Product;
import com.eshop.demo.entity.User;
import com.eshop.demo.exception.CategoryNotFound;
import com.eshop.demo.exception.ProductNotFound;
import com.eshop.demo.model.ProductBody;
import com.eshop.demo.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController{
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/ShopNow")
    public ResponseEntity<List<Product>> getAllProducts() {
        return new ResponseEntity<>(productService.findAllProducts(),HttpStatus.OK);
    }

    @GetMapping("/ShopNow/search")
    public ResponseEntity<List<Product>> searchProduct(@Param("keyword") String keyword)  {
        return new ResponseEntity<>(productService.searchProducts(keyword),HttpStatus.OK);
    }

    @PostMapping("/Products")
    public ResponseEntity<Product> addProduct(@RequestBody ProductBody productBody) throws CategoryNotFound{
        return new ResponseEntity<>(productService.addProduct(productBody),HttpStatus.OK) ;
    }
    @GetMapping("/Products")
    public ResponseEntity<?> getProducts(@AuthenticationPrincipal User user){
        if(user==null){
            return new ResponseEntity<>("The user is not authorized", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(productService.getProducts(),HttpStatus.OK) ;
    }

    @DeleteMapping("/Products/{productId}")
    public ResponseEntity<String> deleteProduct(@PathVariable int productId) throws ProductNotFound {
        return new ResponseEntity<>(productService.removeProduct(productId), HttpStatus.OK);
    }

    @GetMapping("/ShopNow/{categoryId}")
    public ResponseEntity<List<Product>> getProducts(@PathVariable int categoryId) throws CategoryNotFound {
        return new ResponseEntity<>(productService.getProductsByCategoryId(categoryId),HttpStatus.OK);
    }
}
