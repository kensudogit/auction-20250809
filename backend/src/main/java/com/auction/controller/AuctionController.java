package com.auction.controller;

import com.auction.dto.BidDto;
import com.auction.dto.BidRequest;
import com.auction.dto.ProductDto;
import com.auction.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;

/**
 * オークションコントローラークラス
 * オークション関連のREST APIエンドポイントを提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@RestController
@RequestMapping("/api/auction")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // CORS設定（全オリジンからのアクセスを許可）
public class AuctionController {

    /** オークションサービス */
    private final AuctionService auctionService;
    /** WebSocketメッセージングテンプレート */
    private final SimpMessagingTemplate messagingTemplate;

    /**
     * 現在進行中のオークション商品一覧を取得する
     * 
     * @return 進行中のオークション商品リスト
     */
    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getActiveAuctions() {
        List<ProductDto> products = auctionService.getActiveAuctions();
        return ResponseEntity.ok(products);
    }

    /**
     * 指定されたIDの商品を取得する
     * 
     * @param id 商品ID
     * @return 商品情報
     */
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        ProductDto product = auctionService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    /**
     * 入札を実行する
     * 入札処理後、WebSocketでリアルタイム更新を通知する
     * 
     * @param request 入札リクエスト
     * @return 入札結果
     */
    @PostMapping("/bid")
    public ResponseEntity<BidDto> placeBid(@Valid @RequestBody BidRequest request) {
        BidDto bid = auctionService.placeBid(request);

        // WebSocketでリアルタイム更新を通知
        ProductDto updatedProduct = auctionService.getProductById(request.getProductId());
        messagingTemplate.convertAndSend("/topic/product/" + request.getProductId(), updatedProduct);
        messagingTemplate.convertAndSend("/topic/auctions", auctionService.getActiveAuctions());

        return ResponseEntity.ok(bid);
    }
}
