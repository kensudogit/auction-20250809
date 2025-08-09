package main.java.com.auction.repository;

import main.java.com.auction.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 会員情報リポジトリインターフェース
 * 会員情報のデータベース操作を提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    /**
     * ユーザー名で会員を検索
     * 
     * @param username ユーザー名
     * @return 会員情報（存在しない場合は空）
     */
    Optional<Member> findByUsername(String username);

    /**
     * メールアドレスで会員を検索
     * 
     * @param email メールアドレス
     * @return 会員情報（存在しない場合は空）
     */
    Optional<Member> findByEmail(String email);

    /**
     * ユーザー名またはメールアドレスで会員を検索
     * 
     * @param username ユーザー名
     * @param email    メールアドレス
     * @return 会員情報のリスト
     */
    List<Member> findByUsernameOrEmail(String username, String email);

    /**
     * 会員ステータスで会員を検索
     * 
     * @param status 会員ステータス
     * @return 会員情報のリスト
     */
    List<Member> findByStatus(Member.MemberStatus status);

    /**
     * 会員種別で会員を検索
     * 
     * @param memberType 会員種別
     * @return 会員情報のリスト
     */
    List<Member> findByMemberType(Member.MemberType memberType);

    /**
     * 氏名で会員を検索（部分一致）
     * 
     * @param fullName 氏名（部分一致）
     * @return 会員情報のリスト
     */
    @Query("SELECT m FROM Member m WHERE m.fullName LIKE %:fullName%")
    List<Member> findByFullNameContaining(@Param("fullName") String fullName);

    /**
     * ユーザー名が存在するかチェック
     * 
     * @param username ユーザー名
     * @return 存在する場合はtrue
     */
    boolean existsByUsername(String username);

    /**
     * メールアドレスが存在するかチェック
     * 
     * @param email メールアドレス
     * @return 存在する場合はtrue
     */
    boolean existsByEmail(String email);
}
