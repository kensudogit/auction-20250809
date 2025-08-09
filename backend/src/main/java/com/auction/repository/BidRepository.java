package com.auction.repository;

import com.auction.entity.Bid;
import com.auction.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * 入札リポジトリインターフェース
 * 入札エンティティのデータベース操作を提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Repository
public interface BidRepository extends JpaRepository<Bid, Long> {

    /**
     * 商品の入札履歴を入札時間の降順で取得する
     * 
     * @param product 対象商品
     * @return 入札履歴リスト（最新順）
     */
    List<Bid> findByProductOrderByBidTimeDesc(Product product);

    /**
     * 商品の入札を金額の降順で取得する
     * 
     * @param product 対象商品
     * @return 入札リスト（金額順）
     */
    @Query("SELECT b FROM Bid b WHERE b.product = ?1 ORDER BY b.amount DESC")
    List<Bid> findTopBidsByProduct(Product product);

    /**
     * 商品の最高入札を取得する
     * 
     * @param product 対象商品
     * @return 最高入札（存在しない場合は空）
     */
    @Query("SELECT b FROM Bid b WHERE b.product = ?1 ORDER BY b.amount DESC LIMIT 1")
    Optional<Bid> findHighestBidByProduct(Product product);

    /**
     * 商品の入札数を取得する
     * 
     * @param product 対象商品
     * @return 入札数
     */
    @Query("SELECT COUNT(b) FROM Bid b WHERE b.product = ?1")
    Long countBidsByProduct(Product product);
}
