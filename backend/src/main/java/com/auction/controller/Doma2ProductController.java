package com.auction.controller;

import com.auction.dto.ProductDto;
import main.java.com.auction.entity.doma.ProductEntity;
import main.java.com.auction.service.Doma2ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Doma2用商品情報コントローラークラス
 * Doma2を使用した商品情報のREST APIエンドポイントを提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@RestController
@RequestMapping("/api/doma2/products")
@CrossOrigin(origins = "*")
public class Doma2ProductController {

    @Autowired
    private Doma2ProductService doma2ProductService;

    /**
     * 全商品情報を取得
     * 
     * @return 商品情報のリスト
     */
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        try {
            List<ProductDto> products = doma2ProductService.getAllProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 商品IDで商品情報を取得
     * 
     * @param id 商品ID
     * @return 商品情報
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        try {
            Optional<ProductDto> product = doma2ProductService.getProductById(id);
            return product.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 商品名で商品情報を検索
     * 
     * @param name 商品名（部分一致）
     * @return 商品情報のリスト
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProductDto>> searchProductsByName(@RequestParam String name) {
        try {
            List<ProductDto> products = doma2ProductService.searchProductsByName(name);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * オークションステータスで商品情報を検索
     * 
     * @param status オークションステータス
     * @return 商品情報のリスト
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<ProductDto>> getProductsByStatus(@PathVariable String status) {
        try {
            ProductEntity.AuctionStatus auctionStatus = ProductEntity.AuctionStatus.valueOf(status.toUpperCase());
            List<ProductDto> products = doma2ProductService.getProductsByStatus(auctionStatus);
            return ResponseEntity.ok(products);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 価格範囲で商品情報を検索
     * 
     * @param minPrice 最低価格
     * @param maxPrice 最高価格
     * @return 商品情報のリスト
     */
    @GetMapping("/price-range")
    public ResponseEntity<List<ProductDto>> getProductsByPriceRange(
            @RequestParam BigDecimal minPrice,
            @RequestParam BigDecimal maxPrice) {
        try {
            List<ProductDto> products = doma2ProductService.getProductsByPriceRange(minPrice, maxPrice);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 終了時間範囲で商品情報を検索
     * 
     * @param startTime 開始時間
     * @param endTime   終了時間
     * @return 商品情報のリスト
     */
    @GetMapping("/end-time-range")
    public ResponseEntity<List<ProductDto>> getProductsByEndTimeRange(
            @RequestParam LocalDateTime startTime,
            @RequestParam LocalDateTime endTime) {
        try {
            List<ProductDto> products = doma2ProductService.getProductsByEndTimeRange(startTime, endTime);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * アクティブな商品情報を取得
     * 
     * @return アクティブな商品情報のリスト
     */
    @GetMapping("/active")
    public ResponseEntity<List<ProductDto>> getActiveProducts() {
        try {
            List<ProductDto> products = doma2ProductService.getActiveProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 終了した商品情報を取得
     * 
     * @return 終了した商品情報のリスト
     */
    @GetMapping("/ended")
    public ResponseEntity<List<ProductDto>> getEndedProducts() {
        try {
            List<ProductDto> products = doma2ProductService.getEndedProducts();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 商品情報を新規登録
     * 
     * @param productDto 商品情報DTO
     * @return 登録された商品情報
     */
    @PostMapping
    public ResponseEntity<ProductDto> createProduct(@RequestBody ProductDto productDto) {
        try {
            ProductDto createdProduct = doma2ProductService.createProduct(productDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 商品情報を更新
     * 
     * @param id         商品ID
     * @param productDto 更新する商品情報DTO
     * @return 更新された商品情報
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        try {
            ProductDto updatedProduct = doma2ProductService.updateProduct(id, productDto);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 商品情報を削除
     * 
     * @param id 商品ID
     * @return 削除結果
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        try {
            doma2ProductService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 商品ステータスを変更
     * 
     * @param id     商品ID
     * @param status 新しいステータス
     * @return 更新された商品情報
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ProductDto> updateProductStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            ProductEntity.AuctionStatus auctionStatus = ProductEntity.AuctionStatus.valueOf(status.toUpperCase());
            ProductDto updatedProduct = doma2ProductService.updateProductStatus(id, auctionStatus);
            return ResponseEntity.ok(updatedProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 商品価格を更新
     * 
     * @param id           商品ID
     * @param currentPrice 新しい現在価格
     * @return 更新された商品情報
     */
    @PatchMapping("/{id}/price")
    public ResponseEntity<ProductDto> updateProductPrice(@PathVariable Long id, @RequestParam BigDecimal currentPrice) {
        try {
            ProductDto updatedProduct = doma2ProductService.updateProductPrice(id, currentPrice);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 商品終了時間を更新
     * 
     * @param id      商品ID
     * @param endTime 新しい終了時間
     * @return 更新された商品情報
     */
    @PatchMapping("/{id}/end-time")
    public ResponseEntity<ProductDto> updateProductEndTime(@PathVariable Long id, @RequestParam LocalDateTime endTime) {
        try {
            ProductDto updatedProduct = doma2ProductService.updateProductEndTime(id, endTime);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
