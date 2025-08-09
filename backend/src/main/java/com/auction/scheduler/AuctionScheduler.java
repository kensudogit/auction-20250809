package com.auction.scheduler;

import com.auction.dto.ProductDto;
import com.auction.entity.Product;
import com.auction.repository.ProductRepository;
import com.auction.service.AuctionService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.List;

@Component
@RequiredArgsConstructor
public class AuctionScheduler {
    
    private final ProductRepository productRepository;
    private final AuctionService auctionService;
    private final SimpMessagingTemplate messagingTemplate;
    
    // 1秒毎にカウントダウンを更新
    @Scheduled(fixedRate = 1000)
    public void updateCountdown() {
        List<Product> activeProducts = productRepository.findActiveAuctions(LocalDateTime.now());
        
        for (Product product : activeProducts) {
            ProductDto productDto = auctionService.getProductById(product.getId());
            messagingTemplate.convertAndSend("/topic/product/" + product.getId(), productDto);
        }
        
        // 全体のオークション一覧も更新
        messagingTemplate.convertAndSend("/topic/auctions", auctionService.getActiveAuctions());
    }
    
    // 1分毎にオークション終了処理
    @Scheduled(fixedRate = 60000)
    public void checkExpiredAuctions() {
        List<Product> expiredProducts = productRepository.findExpiredAuctions(LocalDateTime.now());
        
        for (Product product : expiredProducts) {
            product.setStatus(Product.AuctionStatus.ENDED);
            productRepository.save(product);
            
            // 終了通知を送信
            ProductDto productDto = auctionService.getProductById(product.getId());
            messagingTemplate.convertAndSend("/topic/product/" + product.getId(), productDto);
        }
    }
}
