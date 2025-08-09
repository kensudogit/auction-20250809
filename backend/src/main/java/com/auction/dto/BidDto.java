package com.auction.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BidDto {
    private Long id;
    private Long productId;
    private String bidderName;
    private BigDecimal amount;
    private LocalDateTime bidTime;
}
