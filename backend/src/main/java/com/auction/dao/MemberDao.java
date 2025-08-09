package com.auction.dao;

import com.auction.entity.doma.MemberEntity;
import org.seasar.doma.*;
import org.seasar.doma.jdbc.Result;

import java.util.List;
import java.util.Optional;

/**
 * Doma2用会員DAOインターフェース
 * 会員情報のデータベース操作を提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Dao
@ConfigAutowireable
public interface MemberDao {

    /**
     * 全会員情報を取得
     * 
     * @return 会員情報のリスト
     */
    @Select
    List<MemberEntity> selectAll();

    /**
     * 会員IDで会員情報を取得
     * 
     * @param id 会員ID
     * @return 会員情報
     */
    @Select
    Optional<MemberEntity> selectById(Long id);

    /**
     * ユーザー名で会員情報を取得
     * 
     * @param username ユーザー名
     * @return 会員情報
     */
    @Select
    Optional<MemberEntity> selectByUsername(String username);

    /**
     * メールアドレスで会員情報を取得
     * 
     * @param email メールアドレス
     * @return 会員情報
     */
    @Select
    Optional<MemberEntity> selectByEmail(String email);

    /**
     * ユーザー名またはメールアドレスで会員情報を検索
     * 
     * @param username ユーザー名
     * @param email    メールアドレス
     * @return 会員情報のリスト
     */
    @Select
    List<MemberEntity> selectByUsernameOrEmail(String username, String email);

    /**
     * 会員ステータスで会員情報を検索
     * 
     * @param status 会員ステータス
     * @return 会員情報のリスト
     */
    @Select
    List<MemberEntity> selectByStatus(String status);

    /**
     * 会員種別で会員情報を検索
     * 
     * @param memberType 会員種別
     * @return 会員情報のリスト
     */
    @Select
    List<MemberEntity> selectByMemberType(String memberType);

    /**
     * 氏名で会員情報を検索（部分一致）
     * 
     * @param fullName 氏名（部分一致）
     * @return 会員情報のリスト
     */
    @Select
    List<MemberEntity> selectByFullNameContaining(String fullName);

    /**
     * ユーザー名が存在するかチェック
     * 
     * @param username ユーザー名
     * @return 存在する場合はtrue
     */
    @Select
    boolean existsByUsername(String username);

    /**
     * メールアドレスが存在するかチェック
     * 
     * @param email メールアドレス
     * @return 存在する場合はtrue
     */
    @Select
    boolean existsByEmail(String email);

    /**
     * 会員情報を新規登録
     * 
     * @param member 会員情報
     * @return 登録結果
     */
    @Insert
    Result<MemberEntity> insert(MemberEntity member);

    /**
     * 会員情報を更新
     * 
     * @param member 会員情報
     * @return 更新結果
     */
    @Update
    Result<MemberEntity> update(MemberEntity member);

    /**
     * 会員情報を削除
     * 
     * @param member 会員情報
     * @return 削除結果
     */
    @Delete
    Result<MemberEntity> delete(MemberEntity member);

    /**
     * 会員IDで会員情報を削除
     * 
     * @param id 会員ID
     * @return 削除件数
     */
    @Delete(sqlFile = true)
    int deleteById(Long id);
}
