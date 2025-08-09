package com.auction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * オークションアプリケーションのメインクラス
 * Spring Bootアプリケーションのエントリーポイント
 * 
 * @author Auction System
 * @version 1.0
 */
@SpringBootApplication
@EnableScheduling // スケジューリング機能を有効化（定期的なタスク実行用）
public class AuctionApplication {

    /**
     * アプリケーションのメインメソッド
     * Spring Bootアプリケーションを起動する
     * 
     * @param args コマンドライン引数
     */
    public static void main(String[] args) {
        SpringApplication.run(AuctionApplication.class, args);
    }
}
