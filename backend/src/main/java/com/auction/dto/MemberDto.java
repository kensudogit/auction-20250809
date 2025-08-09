package main.java.com.auction.dto;

import main.java.com.auction.entity.Member;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

/**
 * 会員情報DTOクラス
 * フロントエンドとのデータ交換に使用する
 * 
 * @author Auction System
 * @version 1.0
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberDto {

    /** 会員ID */
    private Long id;

    /** ユーザー名 */
    private String username;

    /** メールアドレス */
    private String email;

    /** 氏名 */
    private String fullName;

    /** 電話番号 */
    private String phoneNumber;

    /** 住所 */
    private String address;

    /** 会員ステータス */
    private String status;

    /** 会員種別 */
    private String memberType;

    /** 登録日時 */
    private LocalDateTime registeredAt;

    /** 最終更新日時 */
    private LocalDateTime updatedAt;

    /**
     * MemberエンティティからDTOを作成
     * 
     * @param member Memberエンティティ
     * @return MemberDto
     */
    public static MemberDto fromEntity(Member member) {
        MemberDto dto = new MemberDto();
        dto.setId(member.getId());
        dto.setUsername(member.getUsername());
        dto.setEmail(member.getEmail());
        dto.setFullName(member.getFullName());
        dto.setPhoneNumber(member.getPhoneNumber());
        dto.setAddress(member.getAddress());
        dto.setStatus(member.getStatus().name());
        dto.setMemberType(member.getMemberType().name());
        dto.setRegisteredAt(member.getRegisteredAt());
        dto.setUpdatedAt(member.getUpdatedAt());
        return dto;
    }

    /**
     * DTOからMemberエンティティを作成
     * 
     * @return Memberエンティティ
     */
    public Member toEntity() {
        Member member = new Member();
        member.setId(this.id);
        member.setUsername(this.username);
        member.setEmail(this.email);
        member.setFullName(this.fullName);
        member.setPhoneNumber(this.phoneNumber);
        member.setAddress(this.address);
        member.setStatus(Member.MemberStatus.valueOf(this.status));
        member.setMemberType(Member.MemberType.valueOf(this.memberType));
        member.setRegisteredAt(this.registeredAt);
        member.setUpdatedAt(this.updatedAt);
        return member;
    }
}
