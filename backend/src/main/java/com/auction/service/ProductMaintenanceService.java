package main.java.com.auction.service;

import com.auction.dto.ProductDto;
import com.auction.entity.Product;
import com.auction.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 商品情報メンテナンスサービスクラス
 * 商品情報の管理機能を提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Service
@Transactional
public class ProductMaintenanceService {

    @Autowired
    private ProductRepository productRepository;

    /**
     * 全商品情報を取得
     * 
     * @return 商品情報のリスト
     */
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
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
        return productRepository.findById(id)
                .map(this::convertToDto);
    }

    /**
     * 商品名で商品情報を検索
     * 
     * @param name 商品名（部分一致）
     * @return 商品情報のリスト
     */
    public List<ProductDto> searchProductsByName(String name) {
        return productRepository.findByNameContaining(name).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * オークションステータスで商品情報を検索
     * 
     * @param status オークションステータス
     * @return 商品情報のリスト
     */
    public List<ProductDto> getProductsByStatus(Product.AuctionStatus status) {
        return productRepository.findByStatus(status).stream()
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
        return productRepository.findByCurrentPriceBetween(minPrice, maxPrice).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 終了時間で商品情報を検索
     * 
     * @param startTime 開始時間
     * @param endTime 終了時間
     * @return 商品情報のリスト
     */
    public List<ProductDto> getProductsByEndTimeRange(LocalDateTime startTime, LocalDateTime endTime) {
        return productRepository.findByEndTimeBetween(startTime, endTime).stream()
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

        Product product = convertToEntity(productDto);
        Product savedProduct = productRepository.save(product);
        return convertToDto(savedProduct);
    }

    /**
     * 商品情報を更新
     * 
     * @param id 商品ID
     * @param productDto 更新する商品情報DTO
     * @return 更新された商品情報
     */
    public ProductDto updateProduct(Long id, ProductDto productDto) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isEmpty()) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }

        // バリデーション
        validateProduct(productDto);

        Product product = existingProduct.get();
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setCurrentPrice(productDto.getCurrentPrice());
        product.setMinPrice(productDto.getMinPrice());
        product.setEndTime(productDto.getEndTime());
        product.setImageUrl(productDto.getImageUrl());
        product.setStatus(Product.AuctionStatus.valueOf(productDto.getStatus()));

        Product updatedProduct = productRepository.save(product);
        return convertToDto(updatedProduct);
    }

    /**
     * 商品情報を削除
     * 
     * @param id 商品ID
     */
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }
        productRepository.deleteById(id);
    }

    /**
     * 商品ステータスを変更
     * 
     * @param id 商品ID
     * @param status 新しいステータス
     * @return 更新された商品情報
     */
    public ProductDto updateProductStatus(Long id, Product.AuctionStatus status) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isEmpty()) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }

        Product product = existingProduct.get();
        product.setStatus(status);
        Product updatedProduct = productRepository.save(product);
        return convertToDto(updatedProduct);
    }

    /**
     * 商品価格を更新
     * 
     * @param id 商品ID
     * @param currentPrice 新しい現在価格
     * @return 更新された商品情報
     */
    public ProductDto updateProductPrice(Long id, BigDecimal currentPrice) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isEmpty()) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }

        if (currentPrice.compareTo(BigDecimal.ZERO) <= 0) {
            throw new RuntimeException("価格は0より大きい値である必要があります");
        }

        Product product = existingProduct.get();
        product.setCurrentPrice(currentPrice);
        Product updatedProduct = productRepository.save(product);
        return convertToDto(updatedProduct);
    }

    /**
     * 商品終了時間を更新
     * 
     * @param id 商品ID
     * @param endTime 新しい終了時間
     * @return 更新された商品情報
     */
    public ProductDto updateProductEndTime(Long id, LocalDateTime endTime) {
        Optional<Product> existingProduct = productRepository.findById(id);
        if (existingProduct.isEmpty()) {
            throw new RuntimeException("商品が見つかりません: " + id);
        }

        if (endTime.isBefore(LocalDateTime.now())) {
            throw new RuntimeException("終了時間は現在時刻より後の時間である必要があります");
        }

        Product product = existingProduct.get();
        product.setEndTime(endTime);
        Product updatedProduct = productRepository.save(product);
        return convertToDto(updatedProduct);
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
     * ProductエンティティをDTOに変換
     * 
     * @param product Productエンティティ
     * @return ProductDto
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
        if (product.getEndTime() != null) {
            long timeRemaining = java.time.Duration.between(LocalDateTime.now(), product.getEndTime()).getSeconds();
            dto.setTimeRemaining(timeRemaining > 0 ? timeRemaining : 0L);
        }
        
        return dto;
    }

    /**
     * DTOをProductエンティティに変換
     * 
     * @param productDto ProductDto
     * @return Productエンティティ
     */
    private Product convertToEntity(ProductDto productDto) {
        Product product = new Product();
        product.setId(productDto.getId());
        product.setName(productDto.getName());
        product.setDescription(productDto.getDescription());
        product.setCurrentPrice(productDto.getCurrentPrice());
        product.setMinPrice(productDto.getMinPrice());
        product.setEndTime(productDto.getEndTime());
        product.setImageUrl(productDto.getImageUrl());
        if (productDto.getStatus() != null) {
            product.setStatus(Product.AuctionStatus.valueOf(productDto.getStatus()));
        }
        return product;
    }
}
