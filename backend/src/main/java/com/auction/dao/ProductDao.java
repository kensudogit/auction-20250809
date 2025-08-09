package com.auction.dao;

import com.auction.entity.doma.ProductEntity;
import org.seasar.doma.*;
import org.seasar.doma.jdbc.Result;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Doma2用商品DAOインターフェース
 * 商品情報のデータベース操作を提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Dao
@ConfigAutowireable
public interface ProductDao {

    /**
     * 全商品情報を取得
     * 
     * @return 商品情報のリスト
     */
    @Select
    List<ProductEntity> selectAll();

    /**
     * 商品IDで商品情報を取得
     * 
     * @param id 商品ID
     * @return 商品情報
     */
    @Select
    Optional<ProductEntity> selectById(Long id);

    /**
     * 商品名で商品情報を検索（部分一致）
     * 
     * @param name 商品名（部分一致）
     * @return 商品情報のリスト
     */
    @Select
    List<ProductEntity> selectByNameContaining(String name);

    /**
     * オークションステータスで商品情報を検索
     * 
     * @param status オークションステータス
     * @return 商品情報のリスト
     */
    @Select
    List<ProductEntity> selectByStatus(String status);

    /**
     * 価格範囲で商品情報を検索
     * 
     * @param minPrice 最低価格
     * @param maxPrice 最高価格
     * @return 商品情報のリスト
     */
    @Select
    List<ProductEntity> selectByPriceRange(BigDecimal minPrice, BigDecimal maxPrice);

    /**
     * 終了時間範囲で商品情報を検索
     * 
     * @param startTime 開始時間
     * @param endTime   終了時間
     * @return 商品情報のリスト
     */
    @Select
    List<ProductEntity> selectByEndTimeRange(LocalDateTime startTime, LocalDateTime endTime);

    /**
     * アクティブな商品情報を取得
     * 
     * @return アクティブな商品情報のリスト
     */
    @Select
    List<ProductEntity> selectActive();

    /**
     * 終了した商品情報を取得
     * 
     * @return 終了した商品情報のリスト
     */
    @Select
    List<ProductEntity> selectEnded();

    /**
     * 商品情報を新規登録
     * 
     * @param product 商品情報
     * @return 登録結果
     */
    @Insert
    Result<ProductEntity> insert(ProductEntity product);

    /**
     * 商品情報を更新
     * 
     * @param product 商品情報
     * @return 更新結果
     */
    @Update
    Result<ProductEntity> update(ProductEntity product);

    /**
     * 商品情報を削除
     * 
     * @param product 商品情報
     * @return 削除結果
     */
    @Delete
    Result<ProductEntity> delete(ProductEntity product);

    /**
     * 商品IDで商品情報を削除
     * 
     * @param id 商品ID
     * @return 削除件数
     */
    @Delete(sqlFile = true)
    int deleteById(Long id);

    /**
     * 商品価格を更新
     * 
     * @param id           商品ID
     * @param currentPrice 新しい現在価格
     * @return 更新件数
     */
    @Update(sqlFile = true)
    int updatePrice(Long id, BigDecimal currentPrice);

    /**
     * 商品ステータスを更新
     * 
     * @param id     商品ID
     * @param status 新しいステータス
     * @return 更新件数
     */
    @Update(sqlFile = true)
    int updateStatus(Long id, String status);

    /**
     * 商品終了時間を更新
     * 
     * @param id      商品ID
     * @param endTime 新しい終了時間
     * @return 更新件数
     */
    @Update(sqlFile = true)
    int updateEndTime(Long id, LocalDateTime endTime);
}
