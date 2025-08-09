package com.auction.repository;

import com.auction.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 商品リポジトリインターフェース
 * 商品エンティティのデータベース操作を提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    /**
     * ステータスで商品を検索する
     * 
     * @param status オークションステータス
     * @return 指定されたステータスの商品リスト
     */
    List<Product> findByStatus(Product.AuctionStatus status);

    /**
     * 現在進行中のオークション商品を検索する
     * 終了時間が現在時刻より後で、ステータスがACTIVEの商品を取得
     * 
     * @param now 現在時刻
     * @return 進行中のオークション商品リスト
     */
    @Query("SELECT p FROM Product p WHERE p.endTime > ?1 AND p.status = 'ACTIVE'")
    List<Product> findActiveAuctions(LocalDateTime now);

    /**
     * 期限切れのオークション商品を検索する
     * 終了時間が現在時刻以前で、ステータスがACTIVEの商品を取得
     * 
     * @param now 現在時刻
     * @return 期限切れのオークション商品リスト
     */
    @Query("SELECT p FROM Product p WHERE p.endTime <= ?1 AND p.status = 'ACTIVE'")
    List<Product> findExpiredAuctions(LocalDateTime now);
}
