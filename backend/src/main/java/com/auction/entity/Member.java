package main.java.com.auction.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

/**
 * 会員情報エンティティクラス
 * データベースのmembersテーブルに対応するJPAエンティティ
 * 
 * @author Auction System
 * @version 1.0
 */
@Entity
@Table(name = "members")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    /** 会員ID（主キー、自動生成） */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** ユーザー名（必須項目、一意） */
    @Column(nullable = false, unique = true)
    private String username;

    /** メールアドレス（必須項目、一意） */
    @Column(nullable = false, unique = true)
    private String email;

    /** パスワード（必須項目） */
    @Column(nullable = false)
    private String password;

    /** 氏名（必須項目） */
    @Column(nullable = false)
    private String fullName;

    /** 電話番号 */
    @Column
    private String phoneNumber;

    /** 住所 */
    @Column
    private String address;

    /** 会員ステータス（デフォルト：ACTIVE） */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberStatus status = MemberStatus.ACTIVE;

    /** 会員種別（デフォルト：REGULAR） */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MemberType memberType = MemberType.REGULAR;

    /** 登録日時（必須項目） */
    @Column(nullable = false)
    private LocalDateTime registeredAt;

    /** 最終更新日時 */
    @Column
    private LocalDateTime updatedAt;

    /**
     * エンティティ保存前の処理
     * 登録日時を現在時刻に設定する
     */
    @PrePersist
    protected void onCreate() {
        registeredAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    /**
     * エンティティ更新前の処理
     * 最終更新日時を現在時刻に設定する
     */
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    /**
     * 会員ステータス列挙型
     * ACTIVE: 有効
     * INACTIVE: 無効
     * SUSPENDED: 停止
     */
    public enum MemberStatus {
        ACTIVE, INACTIVE, SUSPENDED
    }

    /**
     * 会員種別列挙型
     * REGULAR: 一般会員
     * PREMIUM: プレミアム会員
     * ADMIN: 管理者
     */
    public enum MemberType {
        REGULAR, PREMIUM, ADMIN
    }
}
