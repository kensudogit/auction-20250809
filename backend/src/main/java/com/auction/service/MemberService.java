package main.java.com.auction.service;

import main.java.com.auction.dto.MemberDto;
import main.java.com.auction.entity.Member;
import main.java.com.auction.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * 会員情報サービスクラス
 * 会員情報のビジネスロジックを提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@Service
@Transactional
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    /**
     * 全会員情報を取得
     * 
     * @return 会員情報のリスト
     */
    public List<MemberDto> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(MemberDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 会員IDで会員情報を取得
     * 
     * @param id 会員ID
     * @return 会員情報（存在しない場合は空）
     */
    public Optional<MemberDto> getMemberById(Long id) {
        return memberRepository.findById(id)
                .map(MemberDto::fromEntity);
    }

    /**
     * ユーザー名で会員情報を取得
     * 
     * @param username ユーザー名
     * @return 会員情報（存在しない場合は空）
     */
    public Optional<MemberDto> getMemberByUsername(String username) {
        return memberRepository.findByUsername(username)
                .map(MemberDto::fromEntity);
    }

    /**
     * メールアドレスで会員情報を取得
     * 
     * @param email メールアドレス
     * @return 会員情報（存在しない場合は空）
     */
    public Optional<MemberDto> getMemberByEmail(String email) {
        return memberRepository.findByEmail(email)
                .map(MemberDto::fromEntity);
    }

    /**
     * 氏名で会員情報を検索
     * 
     * @param fullName 氏名（部分一致）
     * @return 会員情報のリスト
     */
    public List<MemberDto> searchMembersByFullName(String fullName) {
        return memberRepository.findByFullNameContaining(fullName).stream()
                .map(MemberDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 会員ステータスで会員情報を検索
     * 
     * @param status 会員ステータス
     * @return 会員情報のリスト
     */
    public List<MemberDto> getMembersByStatus(Member.MemberStatus status) {
        return memberRepository.findByStatus(status).stream()
                .map(MemberDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 会員種別で会員情報を検索
     * 
     * @param memberType 会員種別
     * @return 会員情報のリスト
     */
    public List<MemberDto> getMembersByType(Member.MemberType memberType) {
        return memberRepository.findByMemberType(memberType).stream()
                .map(MemberDto::fromEntity)
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
        if (memberRepository.existsByUsername(memberDto.getUsername())) {
            throw new RuntimeException("ユーザー名が既に使用されています: " + memberDto.getUsername());
        }
        if (memberRepository.existsByEmail(memberDto.getEmail())) {
            throw new RuntimeException("メールアドレスが既に使用されています: " + memberDto.getEmail());
        }

        Member member = memberDto.toEntity();
        // パスワードの暗号化（実際の実装ではBCrypt等を使用）
        member.setPassword(encryptPassword(memberDto.getPassword()));
        
        Member savedMember = memberRepository.save(member);
        return MemberDto.fromEntity(savedMember);
    }

    /**
     * 会員情報を更新
     * 
     * @param id 会員ID
     * @param memberDto 更新する会員情報DTO
     * @return 更新された会員情報
     */
    public MemberDto updateMember(Long id, MemberDto memberDto) {
        Optional<Member> existingMember = memberRepository.findById(id);
        if (existingMember.isEmpty()) {
            throw new RuntimeException("会員が見つかりません: " + id);
        }

        Member member = existingMember.get();
        
        // ユーザー名の重複チェック（自分以外）
        if (!member.getUsername().equals(memberDto.getUsername()) && 
            memberRepository.existsByUsername(memberDto.getUsername())) {
            throw new RuntimeException("ユーザー名が既に使用されています: " + memberDto.getUsername());
        }
        
        // メールアドレスの重複チェック（自分以外）
        if (!member.getEmail().equals(memberDto.getEmail()) && 
            memberRepository.existsByEmail(memberDto.getEmail())) {
            throw new RuntimeException("メールアドレスが既に使用されています: " + memberDto.getEmail());
        }

        // 更新
        member.setUsername(memberDto.getUsername());
        member.setEmail(memberDto.getEmail());
        member.setFullName(memberDto.getFullName());
        member.setPhoneNumber(memberDto.getPhoneNumber());
        member.setAddress(memberDto.getAddress());
        member.setStatus(Member.MemberStatus.valueOf(memberDto.getStatus()));
        member.setMemberType(Member.MemberType.valueOf(memberDto.getMemberType()));

        // パスワードが変更されている場合のみ更新
        if (memberDto.getPassword() != null && !memberDto.getPassword().isEmpty()) {
            member.setPassword(encryptPassword(memberDto.getPassword()));
        }

        Member updatedMember = memberRepository.save(member);
        return MemberDto.fromEntity(updatedMember);
    }

    /**
     * 会員情報を削除
     * 
     * @param id 会員ID
     */
    public void deleteMember(Long id) {
        if (!memberRepository.existsById(id)) {
            throw new RuntimeException("会員が見つかりません: " + id);
        }
        memberRepository.deleteById(id);
    }

    /**
     * 会員ステータスを変更
     * 
     * @param id 会員ID
     * @param status 新しいステータス
     * @return 更新された会員情報
     */
    public MemberDto updateMemberStatus(Long id, Member.MemberStatus status) {
        Optional<Member> existingMember = memberRepository.findById(id);
        if (existingMember.isEmpty()) {
            throw new RuntimeException("会員が見つかりません: " + id);
        }

        Member member = existingMember.get();
        member.setStatus(status);
        Member updatedMember = memberRepository.save(member);
        return MemberDto.fromEntity(updatedMember);
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
