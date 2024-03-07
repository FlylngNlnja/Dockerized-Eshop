package com.eshop.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
@Table(name = "product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    @Column(name = "name")
    private String name;
    @Column(name = "long_desc")
    private String longDesc;
    @Column(name = "price")
    private float price;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @Column(name = "brand_name")
    private String brandName;
    @Column(name = "photo")
    private String photo;
    @JsonIgnore
    @OneToOne(mappedBy = "product",cascade = CascadeType.REMOVE)//if we delete a product we want to delete also from the inventory.
    private Inventory inventory;
    @JsonIgnore
    @OneToOne(mappedBy = "product",cascade = CascadeType.REMOVE)
    private PhoneDetails phoneDetails;
    @JsonIgnore
    @OneToOne(mappedBy = "product",cascade = CascadeType.REMOVE)
    private LaptopDetails laptopDetails;
    @JsonIgnore
    @OneToOne(mappedBy = "product",cascade = CascadeType.REMOVE)
    private TelevisionDetails televisionDetails;

    public Product() {
    }

    public Product(String name, Float price, String photo) {
        this(name,null,price,null,null,photo);
    }

    public Product(String name, String longDesc, float price, Category category, String brandName, String photo) {
        this.name = name;
        this.longDesc = longDesc;
        this.price = price;
        this.category = category;
        this.brandName = brandName;
        this.photo = photo;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLongDesc() {
        return longDesc;
    }

    public void setLongDesc(String longDesc) {
        this.longDesc = longDesc;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrand_name(String brandName) {
        this.brandName = brandName;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public Inventory getInventory() {
        return inventory;
    }

    public void setInventory(Inventory inventory) {
        this.inventory = inventory;
    }

    public PhoneDetails getPhoneDetails() {
        return phoneDetails;
    }

    public void setPhoneDetails(PhoneDetails phoneDetails) {
        this.phoneDetails = phoneDetails;
    }

    public LaptopDetails getLaptopDetails() {
        return laptopDetails;
    }

    public void setLaptopDetails(LaptopDetails laptopDetails) {
        this.laptopDetails = laptopDetails;
    }

    public TelevisionDetails getTelevisionDetails() {
        return televisionDetails;
    }

    public void setTelevisionDetails(TelevisionDetails televisionDetails) {
        this.televisionDetails = televisionDetails;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", longDesc='" + longDesc + '\'' +
                ", price=" + price +
                ", category=" + category +
                ", brandName='" + brandName + '\'' +
                ", photo='" + photo + '\'' +
                ", inventory=" + inventory +
                ", phoneDetails=" + phoneDetails +
                ", laptopDetails=" + laptopDetails +
                ", televisionDetails=" + televisionDetails +
                '}';
    }
}
