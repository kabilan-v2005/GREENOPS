package com.greenops.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "ResaleItems")
public class ResaleItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ProductId")
    private Integer productId;

    @Column(name = "UserId")
    private Integer userId;

    @Column(name = "ProductName")
    private String productName;

    @Column(name = "ProductDetails")
    private String productDetails;

    @Column(name = "UsageYears")
    private Integer usageYears;

    @Column(name = "ProductPrice")
    private BigDecimal productPrice;

    @Column(name = "ProductImage")
    private String productImage;

    @Column(name = "PostedDate")
    private LocalDateTime postedDate;

    @Column(name = "ProductStatus")
    private String productStatus;

    public ResaleItem() {
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(String productDetails) {
        this.productDetails = productDetails;
    }

    public Integer getUsageYears() {
        return usageYears;
    }

    public void setUsageYears(Integer usageYears) {
        this.usageYears = usageYears;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
    }

    public String getProductStatus() {
        return productStatus;
    }

    public void setProductStatus(String productStatus) {
        this.productStatus = productStatus;
    }
}