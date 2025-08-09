package com.auction.service;

import com.auction.dto.BidDto;
import com.auction.dto.BidRequest;
import com.auction.dto.ProductDto;
import com.auction.entity.Bid;
import com.auction.entity.Product;
import com.auction.repository.BidRepository;
import com.auction.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.Duration;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * オークションサービスクラス
 * オークションのビジネスロジックを提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Service
@RequiredArgsConstructor
public class AuctionService {

    /** 商品リポジトリ */
    private final ProductRepository productRepository;
    /** 入札リポジトリ */
    private final BidRepository bidRepository;

    /**
     * 現在進行中のオークション商品一覧を取得する
     * 
     * @return 進行中のオークション商品DTOリスト
     */
    public List<ProductDto> getActiveAuctions() {
        List<Product> products = productRepository.findActiveAuctions(LocalDateTime.now());
        return products.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 指定されたIDの商品を取得する
     * 
     * @param id 商品ID
     * @return 商品DTO
     * @throws RuntimeException 商品が見つからない場合
     */
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("商品が見つかりません"));
        return convertToDto(product);
    }

    /**
     * 入札を実行する
     * オークション終了チェック、入札額検証、価格更新、入札保存を行う
     * 
     * @param request 入札リクエスト
     * @return 入札DTO
     * @throws RuntimeException 入札に失敗した場合
     */
    @Transactional
    public BidDto placeBid(BidRequest request) {
        // 商品の存在確認
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("商品が見つかりません"));

        // オークションが終了しているかチェック
        if (product.getEndTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("オークションは終了しています");
        }

        // 現在の最高入札額を取得
        Optional<Bid> highestBid = bidRepository.findHighestBidByProduct(product);
        BigDecimal currentHighestBid = highestBid.map(Bid::getAmount).orElse(product.getMinPrice());

        // 入札額が現在の最高額より高いかチェック
        if (request.getAmount().compareTo(currentHighestBid) <= 0) {
            throw new RuntimeException("入札額は現在の最高額より高くする必要があります");
        }

        // 価格変動ロジック（入札ボタンクリックによる上昇/下降）
        BigDecimal newPrice = calculateNewPrice(product, request.getAmount());
        product.setCurrentPrice(newPrice);
        productRepository.save(product);

        // 入札を保存
        Bid bid = new Bid();
        bid.setProduct(product);
        bid.setBidderName(request.getBidderName());
        bid.setAmount(request.getAmount());

        Bid savedBid = bidRepository.save(bid);
        return convertToBidDto(savedBid);
    }

    /**
     * 商品の新しい価格を計算する
     * 入札額と現在価格の差に基づいて価格変動をシミュレートする
     * 
     * @param product   対象商品
     * @param bidAmount 入札額
     * @return 新しい価格
     */
    private BigDecimal calculateNewPrice(Product product, BigDecimal bidAmount) {
        // 入札ボタンクリックによる価格変動ロジック
        // 現在の価格と入札額の差に基づいて変動
        BigDecimal difference = bidAmount.subtract(product.getCurrentPrice());
        BigDecimal fluctuation = difference.multiply(new BigDecimal("0.1")); // 10%の変動

        // ランダムな要素を加えて上昇/下降を繰り返す
        double random = Math.random();
        if (random > 0.5) {
            return product.getCurrentPrice().add(fluctuation);
        } else {
            return product.getCurrentPrice().subtract(fluctuation);
        }
    }

    /**
     * 商品エンティティをDTOに変換する
     * 残り時間、入札数、最高入札者情報も含めて変換する
     * 
     * @param product 商品エンティティ
     * @return 商品DTO
     */
    private ProductDto convertToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setCurrentPrice(product.getCurrentPrice());
        dto.setMinPrice(product.getMinPrice());
        dto.setEndTime(product.getEndTime());
        dto.setImageUrl(product.getImageUrl());
        dto.setStatus(product.getStatus().name());

        // 残り時間を計算
        LocalDateTime now = LocalDateTime.now();
        if (product.getEndTime().isAfter(now)) {
            Duration duration = Duration.between(now, product.getEndTime());
            dto.setTimeRemaining(duration.getSeconds());
        } else {
            dto.setTimeRemaining(0L);
        }

        // 入札数を取得
        dto.setBidCount(bidRepository.countBidsByProduct(product));

        // 最高入札者を取得
        Optional<Bid> highestBid = bidRepository.findHighestBidByProduct(product);
        dto.setHighestBidder(highestBid.map(Bid::getBidderName).orElse("なし"));

        return dto;
    }

    /**
     * 入札エンティティをDTOに変換する
     * 
     * @param bid 入札エンティティ
     * @return 入札DTO
     */
    private BidDto convertToBidDto(Bid bid) {
        BidDto dto = new BidDto();
        dto.setId(bid.getId());
        dto.setProductId(bid.getProduct().getId());
        dto.setBidderName(bid.getBidderName());
        dto.setAmount(bid.getAmount());
        dto.setBidTime(bid.getBidTime());
        return dto;
    }
}
