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

@RestController
@RequestMapping("/api/auction")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuctionController {
    
    private final AuctionService auctionService;
    private final SimpMessagingTemplate messagingTemplate;
    
    @GetMapping("/products")
    public ResponseEntity<List<ProductDto>> getActiveAuctions() {
        List<ProductDto> products = auctionService.getActiveAuctions();
        return ResponseEntity.ok(products);
    }
    
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
        ProductDto product = auctionService.getProductById(id);
        return ResponseEntity.ok(product);
    }
    
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
