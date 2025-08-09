package com.auction.dto;

import lombok.Data;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

@Data
public class BidRequest {
    @NotNull(message = "商品IDは必須です")
    private Long productId;

    @NotNull(message = "入札者名は必須です")
    private String bidderName;

    @NotNull(message = "入札金額は必須です")
    @DecimalMin(value = "0.01", message = "入札金額は0.01以上である必要があります")
    private BigDecimal amount;
}
