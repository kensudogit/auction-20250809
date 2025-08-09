package com.auction.entity.doma;

import org.seasar.doma.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Doma2用商品エンティティクラス
 * データベースのproductsテーブルに対応するDoma2エンティティ
 * 
 * @author Auction System
 * @version 1.0
 */
@Entity(immutable = true)
@Table(name = "products")
public class ProductEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private final Long id;

    @Column(name = "name")
    private final String name;

    @Column(name = "description")
    private final String description;

    @Column(name = "current_price")
    private final BigDecimal currentPrice;

    @Column(name = "min_price")
    private final BigDecimal minPrice;

    @Column(name = "end_time")
    private final LocalDateTime endTime;

    @Column(name = "image_url")
    private final String imageUrl;

    @Column(name = "status")
    private final String status;

    @Column(name = "created_at")
    private final LocalDateTime createdAt;

    /**
     * コンストラクタ
     */
    public ProductEntity(
            Long id,
            String name,
            String description,
            BigDecimal currentPrice,
            BigDecimal minPrice,
            LocalDateTime endTime,
            String imageUrl,
            String status,
            LocalDateTime createdAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.currentPrice = currentPrice;
        this.minPrice = minPrice;
        this.endTime = endTime;
        this.imageUrl = imageUrl;
        this.status = status;
        this.createdAt = createdAt;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public BigDecimal getCurrentPrice() {
        return currentPrice;
    }

    public BigDecimal getMinPrice() {
        return minPrice;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * オークションステータス列挙型
     */
    public enum AuctionStatus {
        ACTIVE, ENDED, CANCELLED
    }
}
