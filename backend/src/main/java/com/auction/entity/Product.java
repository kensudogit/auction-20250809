package com.auction.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * オークション商品エンティティクラス
 * データベースのproductsテーブルに対応するJPAエンティティ
 * 
 * @author Auction System
 * @version 1.0
 */
@Entity
@Table(name = "products")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    /** 商品ID（主キー、自動生成） */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 商品名（必須項目） */
    @Column(nullable = false)
    private String name;

    /** 商品説明（最大1000文字） */
    @Column(length = 1000)
    private String description;

    /** 現在価格（必須項目） */
    @Column(nullable = false)
    private BigDecimal currentPrice;

    /** 最低価格（必須項目） */
    @Column(nullable = false)
    private BigDecimal minPrice;

    /** オークション終了時間（必須項目） */
    @Column(nullable = false)
    private LocalDateTime endTime;

    /** 商品画像URL（必須項目） */
    @Column(nullable = false)
    private String imageUrl;

    /** オークションステータス（デフォルト：ACTIVE） */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuctionStatus status = AuctionStatus.ACTIVE;

    /** 作成日時（必須項目） */
    @Column(nullable = false)
    private LocalDateTime createdAt;

    /**
     * エンティティ保存前の処理
     * 作成日時を現在時刻に設定する
     */
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    /**
     * オークションステータス列挙型
     * ACTIVE: 進行中
     * ENDED: 終了
     * CANCELLED: キャンセル
     */
    public enum AuctionStatus {
        ACTIVE, ENDED, CANCELLED
    }
}
