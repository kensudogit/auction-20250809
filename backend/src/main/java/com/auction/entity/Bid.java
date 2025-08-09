package com.auction.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * 入札エンティティクラス
 * データベースのbidsテーブルに対応するJPAエンティティ
 * 
 * @author Auction System
 * @version 1.0
 */
@Entity
@Table(name = "bids")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Bid {

    /** 入札ID（主キー、自動生成） */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** 入札対象の商品（多対一の関係） */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    /** 入札者名（必須項目） */
    @Column(nullable = false)
    private String bidderName;

    /** 入札金額（必須項目） */
    @Column(nullable = false)
    private BigDecimal amount;

    /** 入札日時（必須項目） */
    @Column(nullable = false)
    private LocalDateTime bidTime;

    /**
     * エンティティ保存前の処理
     * 入札日時を現在時刻に設定する
     */
    @PrePersist
    protected void onCreate() {
        bidTime = LocalDateTime.now();
    }
}
