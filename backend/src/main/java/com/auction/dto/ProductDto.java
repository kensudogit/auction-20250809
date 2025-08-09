package com.auction.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal currentPrice;
    private BigDecimal minPrice;
    private LocalDateTime endTime;
    private String imageUrl;
    private String status;
    private Long timeRemaining; // 秒単位
    private Long bidCount;
    private String highestBidder;
}
