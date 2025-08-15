package com.auction.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructorcd;
import java.time.LocalDateTime;

/**
 * 商品DTOクラス
 * フロントエンドとのデータ転送用オブジェクト
 * 
 * @author Auction System
 * @version 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    /** 商品ID */
    private Long id;
    /** 商品名 */
    private String name;
    /** 商品説明 */
    private String description;
    /** 現在価格 */
    private BigDecimal currentPrice;
    /** 最低価格 */
    private BigDecimal minPrice;
    /** オークション終了時間 */
    private LocalDateTime endTime;
    /** 商品画像URL */
    private String imageUrl;
    /** オークションステータス */
    private String status;
    /** 残り時間（秒単位） */
    private Long timeRemaining;
    /** 入札数 */
    private Long bidCount;
    /** 最高入札者名 */
    private String highestBidder;
}
