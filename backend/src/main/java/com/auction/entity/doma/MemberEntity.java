package com.auction.entity.doma;

import org.seasar.doma.*;

import java.time.LocalDateTime;

/**
 * Doma2用会員エンティティクラス
 * データベースのmembersテーブルに対応するDoma2エンティティ
 * 
 * @author Auction System
 * @version 1.0
 */
@Entity(immutable = true)
@Table(name = "members")
public class MemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private final Long id;

    @Column(name = "username")
    private final String username;

    @Column(name = "email")
    private final String email;

    @Column(name = "password")
    private final String password;

    @Column(name = "full_name")
    private final String fullName;

    @Column(name = "phone_number")
    private final String phoneNumber;

    @Column(name = "address")
    private final String address;

    @Column(name = "status")
    private final String status;

    @Column(name = "member_type")
    private final String memberType;

    @Column(name = "registered_at")
    private final LocalDateTime registeredAt;

    @Column(name = "updated_at")
    private final LocalDateTime updatedAt;

    /**
     * コンストラクタ
     */
    public MemberEntity(
            Long id,
            String username,
            String email,
            String password,
            String fullName,
            String phoneNumber,
            String address,
            String status,
            String memberType,
            LocalDateTime registeredAt,
            LocalDateTime updatedAt) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.status = status;
        this.memberType = memberType;
        this.registeredAt = registeredAt;
        this.updatedAt = updatedAt;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFullName() {
        return fullName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public String getStatus() {
        return status;
    }

    public String getMemberType() {
        return memberType;
    }

    public LocalDateTime getRegisteredAt() {
        return registeredAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    /**
     * 会員ステータス列挙型
     */
    public enum MemberStatus {
        ACTIVE, INACTIVE, SUSPENDED
    }

    /**
     * 会員種別列挙型
     */
    public enum MemberType {
        REGULAR, PREMIUM, ADMIN
    }
}
