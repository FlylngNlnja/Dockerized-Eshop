package com.eshop.demo.DAO;

import com.eshop.demo.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class ProductDAOImpl implements ProductDAO{
    private EntityManager entityManager;
    @Autowired
    public ProductDAOImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }
    //return 3 random products from each category(phone,tv,laptop)
    @Override
    public List<Product> findProducts(){
        List<Product> products = new ArrayList<>();
        for(int i=1;i<=3;i++) {
            TypedQuery<Product> query = entityManager.createQuery("SELECT p.name,p.price,p.photo FROM Product p WHERE p.category.id=:data", Product.class);
            query.setParameter("data",i);
            query.setMaxResults(3);
            products.addAll(query.getResultList());
        }
        return products;
    }

    @Override
    public List<Product> findAll(){
        TypedQuery<Product> query = entityManager.createQuery("FROM Product p", Product.class);
        return query.getResultList();
    }

    @Override
    public List<Product> searchProducts(String keyword) {
        String nativeQ = "SELECT p.* FROM product p " +
                "INNER JOIN category c " +
                "ON p.category_id = c.id " +
                "WHERE MATCH(name,long_desc,brand_name) " +
                "AGAINST(:data IN NATURAL LANGUAGE MODE) " +
                "OR category_name like (:data)";
        List <Product> query = entityManager.createNativeQuery(nativeQ, Product.class)
                        .setParameter("data",keyword)
                .getResultList();

        return query;
    }


    @Override
    @Transactional
    public Product addProduct(Product product){
        return entityManager.merge(product);
    }

    @Override
    public Product findProductById(int id) {
        return entityManager.find(Product.class, id);

    }

    @Override
    @Transactional
    public void deleteProduct(Product product) {
        entityManager.remove(product);
    }


    @Override
    public List<Product> getProductByCategory(int id) {
        TypedQuery<Product> query = entityManager.createQuery("FROM Product p WHERE p.category.id=:data", Product.class);
        query.setParameter("data",id);
        return query.getResultList();
    }

    @Override
    public List<Product> cart(List<String> ids) {
        ArrayList<Product> products =new ArrayList<>();
        for(var elem:ids) {
            products.add(entityManager.find(Product.class,Integer.parseInt(elem)));
        }
        return products;
    }
}
