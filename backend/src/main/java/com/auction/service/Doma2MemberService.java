package com.auction.service;

import com.auction.dao.MemberDao;
import com.auction.dto.MemberDto;
import com.auction.entity.doma.MemberEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Doma2用会員情報サービスクラス
 * Doma2を使用した会員情報のビジネスロジックを提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Service
@Transactional
public class Doma2MemberService {

    @Autowired
    private MemberDao memberDao;

    /**
     * 全会員情報を取得
     * 
     * @return 会員情報のリスト
     */
    public List<MemberDto> getAllMembers() {
        return memberDao.selectAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 会員IDで会員情報を取得
     * 
     * @param id 会員ID
     * @return 会員情報（存在しない場合は空）
     */
    public Optional<MemberDto> getMemberById(Long id) {
        return memberDao.selectById(id)
                .map(this::convertToDto);
    }

    /**
     * ユーザー名で会員情報を取得
     * 
     * @param username ユーザー名
     * @return 会員情報（存在しない場合は空）
     */
    public Optional<MemberDto> getMemberByUsername(String username) {
        return memberDao.selectByUsername(username)
                .map(this::convertToDto);
    }

    /**
     * メールアドレスで会員情報を取得
     * 
     * @param email メールアドレス
     * @return 会員情報（存在しない場合は空）
     */
    public Optional<MemberDto> getMemberByEmail(String email) {
        return memberDao.selectByEmail(email)
                .map(this::convertToDto);
    }

    /**
     * 氏名で会員情報を検索
     * 
     * @param fullName 氏名（部分一致）
     * @return 会員情報のリスト
     */
    public List<MemberDto> searchMembersByFullName(String fullName) {
        return memberDao.selectByFullNameContaining(fullName).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 会員ステータスで会員情報を検索
     * 
     * @param status 会員ステータス
     * @return 会員情報のリスト
     */
    public List<MemberDto> getMembersByStatus(MemberEntity.MemberStatus status) {
        return memberDao.selectByStatus(status.name()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 会員種別で会員情報を検索
     * 
     * @param memberType 会員種別
     * @return 会員情報のリスト
     */
    public List<MemberDto> getMembersByType(MemberEntity.MemberType memberType) {
        return memberDao.selectByMemberType(memberType.name()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * 会員情報を新規登録
     * 
     * @param memberDto 会員情報DTO
     * @return 登録された会員情報
     */
    public MemberDto createMember(MemberDto memberDto) {
        // 重複チェック
        if (memberDao.existsByUsername(memberDto.getUsername())) {
            throw new RuntimeException("ユーザー名が既に使用されています: " + memberDto.getUsername());
        }
        if (memberDao.existsByEmail(memberDto.getEmail())) {
            throw new RuntimeException("メールアドレスが既に使用されています: " + memberDto.getEmail());
        }

        LocalDateTime now = LocalDateTime.now();
        MemberEntity member = new MemberEntity(
                null, // IDは自動生成
                memberDto.getUsername(),
                memberDto.getEmail(),
                encryptPassword(memberDto.getPassword()),
                memberDto.getFullName(),
                memberDto.getPhoneNumber(),
                memberDto.getAddress(),
                memberDto.getStatus(),
                memberDto.getMemberType(),
                now,
                now);

        MemberEntity savedMember = memberDao.insert(member).getEntity();
        return convertToDto(savedMember);
    }

    /**
     * 会員情報を更新
     * 
     * @param id        会員ID
     * @param memberDto 更新する会員情報DTO
     * @return 更新された会員情報
     */
    public MemberDto updateMember(Long id, MemberDto memberDto) {
        Optional<MemberEntity> existingMember = memberDao.selectById(id);
        if (existingMember.isEmpty()) {
            throw new RuntimeException("会員が見つかりません: " + id);
        }

        MemberEntity member = existingMember.get();

        // ユーザー名の重複チェック（自分以外）
        if (!member.getUsername().equals(memberDto.getUsername()) &&
                memberDao.existsByUsername(memberDto.getUsername())) {
            throw new RuntimeException("ユーザー名が既に使用されています: " + memberDto.getUsername());
        }

        // メールアドレスの重複チェック（自分以外）
        if (!member.getEmail().equals(memberDto.getEmail()) &&
                memberDao.existsByEmail(memberDto.getEmail())) {
            throw new RuntimeException("メールアドレスが既に使用されています: " + memberDto.getEmail());
        }

        // 更新用エンティティを作成
        MemberEntity updatedMember = new MemberEntity(
                member.getId(),
                memberDto.getUsername(),
                memberDto.getEmail(),
                memberDto.getPassword() != null && !memberDto.getPassword().isEmpty()
                        ? encryptPassword(memberDto.getPassword())
                        : member.getPassword(),
                memberDto.getFullName(),
                memberDto.getPhoneNumber(),
                memberDto.getAddress(),
                memberDto.getStatus(),
                memberDto.getMemberType(),
                member.getRegisteredAt(),
                LocalDateTime.now());

        MemberEntity savedMember = memberDao.update(updatedMember).getEntity();
        return convertToDto(savedMember);
    }

    /**
     * 会員情報を削除
     * 
     * @param id 会員ID
     */
    public void deleteMember(Long id) {
        if (memberDao.deleteById(id) == 0) {
            throw new RuntimeException("会員が見つかりません: " + id);
        }
    }

    /**
     * 会員ステータスを変更
     * 
     * @param id     会員ID
     * @param status 新しいステータス
     * @return 更新された会員情報
     */
    public MemberDto updateMemberStatus(Long id, MemberEntity.MemberStatus status) {
        Optional<MemberEntity> existingMember = memberDao.selectById(id);
        if (existingMember.isEmpty()) {
            throw new RuntimeException("会員が見つかりません: " + id);
        }

        MemberEntity member = existingMember.get();
        MemberEntity updatedMember = new MemberEntity(
                member.getId(),
                member.getUsername(),
                member.getEmail(),
                member.getPassword(),
                member.getFullName(),
                member.getPhoneNumber(),
                member.getAddress(),
                status.name(),
                member.getMemberType(),
                member.getRegisteredAt(),
                LocalDateTime.now());

        MemberEntity savedMember = memberDao.update(updatedMember).getEntity();
        return convertToDto(savedMember);
    }

    /**
     * MemberEntityをDTOに変換
     * 
     * @param member MemberEntity
     * @return MemberDto
     */
    private MemberDto convertToDto(MemberEntity member) {
        MemberDto dto = new MemberDto();
        dto.setId(member.getId());
        dto.setUsername(member.getUsername());
        dto.setEmail(member.getEmail());
        dto.setFullName(member.getFullName());
        dto.setPhoneNumber(member.getPhoneNumber());
        dto.setAddress(member.getAddress());
        dto.setStatus(member.getStatus());
        dto.setMemberType(member.getMemberType());
        dto.setRegisteredAt(member.getRegisteredAt());
        dto.setUpdatedAt(member.getUpdatedAt());
        return dto;
    }

    /**
     * パスワードを暗号化（簡易実装）
     * 実際の実装ではBCrypt等のセキュアな暗号化を使用すること
     * 
     * @param password 平文パスワード
     * @return 暗号化されたパスワード
     */
    private String encryptPassword(String password) {
        // 簡易実装（実際の実装ではBCrypt等を使用）
        return "encrypted_" + password;
    }
}
