package com.auction.service;

import com.auction.dto.ProductDto;
import com.auction.dao.ProductDao;
import com.auction.entity.doma.ProductEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Doma2用商品情報サービスクラス
 * Doma2を使用した商品情報のビジネスロジックを提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Service
@Transactional
public class Doma2ProductService {

    @Autowired
    private ProductDao productDao;

    /**
     * 全商品情報を取得
     * 
     * @return 商品情報のリスト
     */
    public List<ProductDto> getAllProducts() {
        return productDao.selectAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 商品IDで商品情報を取得
     * 
     * @param id 商品ID
     * @return 商品情報（存在しない場合は空）
     */
    public Optional<ProductDto> getProductById(Long id) {
        return productDao.selectById(id)
                .map(this::convertToDto);
    }

    /**
     * 商品名で商品情報を検索
     * 
     * @param name 商品名（部分一致）
     * @return 商品情報のリスト
     */
    public List<ProductDto> searchProductsByName(String name) {
        return productDao.selectByNameContaining(name).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * オークションステータスで商品情報を検索
     * 
     * @param status オークションステータス
     * @return 商品情報のリスト
     */
    public List<ProductDto> getProductsByStatus(ProductEntity.AuctionStatus status) {
        return productDao.selectByStatus(status.name()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 価格範囲で商品情報を検索
     * 
     * @param minPrice 最低価格
     * @param maxPrice 最高価格
     * @return 商品情報のリスト
     */
    public List<ProductDto> getProductsByPriceRange(BigDecimal minPrice, BigDecimal maxPrice) {
        return productDao.selectByPriceRange(minPrice, maxPrice).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 終了時間で商品情報を検索
     * 
     * @param startTime 開始時間
     * @param endTime   終了時間
     * @return 商品情報のリスト
     */
    public List<ProductDto> getProductsByEndTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        return productDao.selectByEndTimeRange(startTime, endTime).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * アクティブな商品情報を取得
     * 
     * @return アクティブな商品情報のリスト
     */
    public List<ProductDto> getActiveProducts() {
        return productDao.selectActive().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 終了した商品情報を取得
     * 
     * @return 終了した商品情報のリスト
     */
    public List<ProductDto> getEndedProducts() {
        return productDao.selectEnded().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 商品情報を新規登録
     * 
     * @param productDto 商品情報DTO
     * @return 登録された商品情報
     */
    public ProductDto createProduct(ProductDto productDto) {
        // バリデーション
        validateProduct(productDto);

        LocalDateTime now = LocalDateTime.now();
        ProductEntity product = new ProductEntity(
                null, // IDは自動生成
                productDto.getName(),
                productDto.getDescription(),
                productDto.getCurrentPrice(),
                productDto.getMinPrice(),
                productDto.getEndTime(),
                productDto.getImageUrl(),
                productDto.getStatus() != null ? productDto.getStatus() : "ACTIVE",
                now);

        ProductEntity savedProduct = productDao.insert(product).getEntity();
        return convertToDto(savedProduct);
    }

    /**
     * 商品情報を更新
     * 
     * @param id         商品ID
     * @param productDto 更新する商品情報DTO
     * @return 更新された商品情報
     */
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Optional<ProductEntity> existingProduct = productDao.selectById(id);
        if (existingProduct.isEmpty()) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }

        // バリデーション
        validateProduct(productDto);

        ProductEntity product = existingProduct.get();
        ProductEntity updatedProduct = new ProductEntity(
                product.getId(),
                productDto.getName(),
                productDto.getDescription(),
                productDto.getCurrentPrice(),
                productDto.getMinPrice(),
                productDto.getEndTime(),
                productDto.getImageUrl(),
                productDto.getStatus(),
                product.getCreatedAt());

        ProductEntity savedProduct = productDao.update(updatedProduct).getEntity();
        return convertToDto(savedProduct);
    }

    /**
     * 商品情報を削除
     * 
     * @param id 商品ID
     */
    public void deleteProduct(Long id) {
        if (productDao.deleteById(id) == 0) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }
    }

    /**
     * 商品ステータスを変更
     * 
     * @param id     商品ID
     * @param status 新しいステータス
     * @return 更新された商品情報
     */
    public ProductDto updateProductStatus(Long id, ProductEntity.AuctionStatus status) {
        Optional<ProductEntity> existingProduct = productDao.selectById(id);
        if (existingProduct.isEmpty()) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }

        if (productDao.updateStatus(id, status.name()) == 0) {
            throw new RuntimeException("商品ステータスの更新に失敗しました: " + id);
        }

        return getProductById(id).orElseThrow(() -> new RuntimeException("更新後の商品情報の取得に失敗しました: " + id));
    }

    /**
     * 商品価格を更新
     * 
     * @param id           商品ID
     * @param currentPrice 新しい現在価格
     * @return 更新された商品情報
     */
    public ProductDto updateProductPrice(Long id, BigDecimal currentPrice) {
        Optional<ProductEntity> existingProduct = productDao.selectById(id);
        if (existingProduct.isEmpty()) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }

        if (currentPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("価格は0より大きい値である必要があります");
        }

        if (productDao.updatePrice(id, currentPrice) == 0) {
            throw new RuntimeException("商品価格の更新に失敗しました: " + id);
        }

        return getProductById(id).orElseThrow(() -> new RuntimeException("更新後の商品情報の取得に失敗しました: " + id));
    }

    /**
     * 商品終了時間を更新
     * 
     * @param id      商品ID
     * @param endTime 新しい終了時間
     * @return 更新された商品情報
     */
    public ProductDto updateProductEndTime(Long id, LocalDateTime endTime) {
        Optional<ProductEntity> existingProduct = productDao.selectById(id);
        if (existingProduct.isEmpty()) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }

        if (endTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("終了時間は現在時刻より後の時間である必要があります");
        }

        if (productDao.updateEndTime(id, endTime) == 0) {
            throw new RuntimeException("商品終了時間の更新に失敗しました: " + id);
        }

        return getProductById(id).orElseThrow(() -> new RuntimeException("更新後の商品情報の取得に失敗しました: " + id));
    }

    /**
     * 商品情報のバリデーション
     * 
     * @param productDto 商品情報DTO
     */
    private void validateProduct(ProductDto productDto) {
        if (productDto.getName() == null || productDto.getName().trim().isEmpty()) {
            throw new RuntimeException("商品名は必須です");
        }
        if (productDto.getCurrentPrice() == null || productDto.getCurrentPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("現在価格は0より大きい値である必要があります");
        }
        if (productDto.getMinPrice() == null || productDto.getMinPrice().compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("最低価格は0より大きい値である必要があります");
        }
        if (productDto.getCurrentPrice().compareTo(productDto.getMinPrice()) < 0) {
            throw new RuntimeException("現在価格は最低価格以上である必要があります");
        }
        if (productDto.getEndTime() == null || productDto.getEndTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("終了時間は現在時刻より後の時間である必要があります");
        }
        if (productDto.getImageUrl() == null || productDto.getImageUrl().trim().isEmpty()) {
            throw new RuntimeException("商品画像URLは必須です");
        }
    }

    /**
     * ProductEntityをDTOに変換
     * 
     * @param product ProductEntity
     * @return ProductDto
     */
    private ProductDto convertToDto(ProductEntity product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setDescription(product.getDescription());
        dto.setCurrentPrice(product.getCurrentPrice());
        dto.setMinPrice(product.getMinPrice());
        dto.setEndTime(product.getEndTime());
        dto.setImageUrl(product.getImageUrl());
        dto.setStatus(product.getStatus());

        // 残り時間を計算
        if (product.getEndTime() != null) {
            long timeRemaining = java.time.Duration.between(LocalDateTime.now(), product.getEndTime()).getSeconds();
            dto.setTimeRemaining(timeRemaining > 0 ? timeRemaining : 0L);
        }

        return dto;
    }
}
