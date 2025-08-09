package main.java.com.auction.controller;

import com.auction.dto.ProductDto;
import com.auction.entity.Product;
import main.java.com.auction.service.ProductMaintenanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * 商品情報メンテナンスコントローラークラス
 * 商品情報の管理用REST APIエンドポイントを提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@RestController
@RequestMapping("/api/admin/products")
@CrossOrigin(origins = "*")
public class ProductMaintenanceController {

    @Autowired
    private ProductMaintenanceService productMaintenanceService;

    /**
     * 全商品情報を取得
     * 
     * @return 商品情報のリスト
     */
    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProducts() {
        try {
            List<ProductDto> products = productMaintenanceService.getAllProducts();
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
            Optional<ProductDto> product = productMaintenanceService.getProductById(id);
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
            List<ProductDto> products = productMaintenanceService.searchProductsByName(name);
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
            Product.AuctionStatus auctionStatus = Product.AuctionStatus.valueOf(status.toUpperCase());
            List<ProductDto> products = productMaintenanceService.getProductsByStatus(auctionStatus);
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
            List<ProductDto> products = productMaintenanceService.getProductsByPriceRange(minPrice, maxPrice);
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 終了時間範囲で商品情報を検索
     * 
     * @param startTime 開始時間
     * @param endTime 終了時間
     * @return 商品情報のリスト
     */
    @GetMapping("/end-time-range")
    public ResponseEntity<List<ProductDto>> getProductsByEndTimeRange(
            @RequestParam LocalDateTime startTime, 
            @RequestParam LocalDateTime endTime) {
        try {
            List<ProductDto> products = productMaintenanceService.getProductsByEndTimeRange(startTime, endTime);
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
            ProductDto createdProduct = productMaintenanceService.createProduct(productDto);
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
     * @param id 商品ID
     * @param productDto 更新する商品情報DTO
     * @return 更新された商品情報
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProductDto> updateProduct(@PathVariable Long id, @RequestBody ProductDto productDto) {
        try {
            ProductDto updatedProduct = productMaintenanceService.updateProduct(id, productDto);
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
            productMaintenanceService.deleteProduct(id);
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
     * @param id 商品ID
     * @param status 新しいステータス
     * @return 更新された商品情報
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<ProductDto> updateProductStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            Product.AuctionStatus auctionStatus = Product.AuctionStatus.valueOf(status.toUpperCase());
            ProductDto updatedProduct = productMaintenanceService.updateProductStatus(id, auctionStatus);
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
     * @param id 商品ID
     * @param currentPrice 新しい現在価格
     * @return 更新された商品情報
     */
    @PatchMapping("/{id}/price")
    public ResponseEntity<ProductDto> updateProductPrice(@PathVariable Long id, @RequestParam BigDecimal currentPrice) {
        try {
            ProductDto updatedProduct = productMaintenanceService.updateProductPrice(id, currentPrice);
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
     * @param id 商品ID
     * @param endTime 新しい終了時間
     * @return 更新された商品情報
     */
    @PatchMapping("/{id}/end-time")
    public ResponseEntity<ProductDto> updateProductEndTime(@PathVariable Long id, @RequestParam LocalDateTime endTime) {
        try {
            ProductDto updatedProduct = productMaintenanceService.updateProductEndTime(id, endTime);
            return ResponseEntity.ok(updatedProduct);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
