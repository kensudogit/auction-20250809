package com.auction.controller;

import main.java.com.auction.dto.MemberDto;
import main.java.com.auction.entity.doma.MemberEntity;
import main.java.com.auction.service.Doma2MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Doma2用会員情報コントローラークラス
 * Doma2を使用した会員情報のREST APIエンドポイントを提供する
 * 
 * @author Auction System
 * @version 1.0
 */
@RestController
@RequestMapping("/api/doma2/members")
@CrossOrigin(origins = "*")
public class Doma2MemberController {

    @Autowired
    private Doma2MemberService doma2MemberService;

    /**
     * 全会員情報を取得
     * 
     * @return 会員情報のリスト
     */
    @GetMapping
    public ResponseEntity<List<MemberDto>> getAllMembers() {
        try {
            List<MemberDto> members = doma2MemberService.getAllMembers();
            return ResponseEntity.ok(members);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 会員IDで会員情報を取得
     * 
     * @param id 会員ID
     * @return 会員情報
     */
    @GetMapping("/{id}")
    public ResponseEntity<MemberDto> getMemberById(@PathVariable Long id) {
        try {
            Optional<MemberDto> member = doma2MemberService.getMemberById(id);
            return member.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * ユーザー名で会員情報を取得
     * 
     * @param username ユーザー名
     * @return 会員情報
     */
    @GetMapping("/username/{username}")
    public ResponseEntity<MemberDto> getMemberByUsername(@PathVariable String username) {
        try {
            Optional<MemberDto> member = doma2MemberService.getMemberByUsername(username);
            return member.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * メールアドレスで会員情報を取得
     * 
     * @param email メールアドレス
     * @return 会員情報
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<MemberDto> getMemberByEmail(@PathVariable String email) {
        try {
            Optional<MemberDto> member = doma2MemberService.getMemberByEmail(email);
            return member.map(ResponseEntity::ok)
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 氏名で会員情報を検索
     * 
     * @param fullName 氏名（部分一致）
     * @return 会員情報のリスト
     */
    @GetMapping("/search")
    public ResponseEntity<List<MemberDto>> searchMembersByFullName(@RequestParam String fullName) {
        try {
            List<MemberDto> members = doma2MemberService.searchMembersByFullName(fullName);
            return ResponseEntity.ok(members);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 会員ステータスで会員情報を検索
     * 
     * @param status 会員ステータス
     * @return 会員情報のリスト
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<MemberDto>> getMembersByStatus(@PathVariable String status) {
        try {
            MemberEntity.MemberStatus memberStatus = MemberEntity.MemberStatus.valueOf(status.toUpperCase());
            List<MemberDto> members = doma2MemberService.getMembersByStatus(memberStatus);
            return ResponseEntity.ok(members);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 会員種別で会員情報を検索
     * 
     * @param memberType 会員種別
     * @return 会員情報のリスト
     */
    @GetMapping("/type/{memberType}")
    public ResponseEntity<List<MemberDto>> getMembersByType(@PathVariable String memberType) {
        try {
            MemberEntity.MemberType type = MemberEntity.MemberType.valueOf(memberType.toUpperCase());
            List<MemberDto> members = doma2MemberService.getMembersByType(type);
            return ResponseEntity.ok(members);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 会員情報を新規登録
     * 
     * @param memberDto 会員情報DTO
     * @return 登録された会員情報
     */
    @PostMapping
    public ResponseEntity<MemberDto> createMember(@RequestBody MemberDto memberDto) {
        try {
            MemberDto createdMember = doma2MemberService.createMember(memberDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMember);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 会員情報を更新
     * 
     * @param id        会員ID
     * @param memberDto 更新する会員情報DTO
     * @return 更新された会員情報
     */
    @PutMapping("/{id}")
    public ResponseEntity<MemberDto> updateMember(@PathVariable Long id, @RequestBody MemberDto memberDto) {
        try {
            MemberDto updatedMember = doma2MemberService.updateMember(id, memberDto);
            return ResponseEntity.ok(updatedMember);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 会員情報を削除
     * 
     * @param id 会員ID
     * @return 削除結果
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMember(@PathVariable Long id) {
        try {
            doma2MemberService.deleteMember(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * 会員ステータスを変更
     * 
     * @param id     会員ID
     * @param status 新しいステータス
     * @return 更新された会員情報
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<MemberDto> updateMemberStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            MemberEntity.MemberStatus memberStatus = MemberEntity.MemberStatus.valueOf(status.toUpperCase());
            MemberDto updatedMember = doma2MemberService.updateMemberStatus(id, memberStatus);
            return ResponseEntity.ok(updatedMember);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
