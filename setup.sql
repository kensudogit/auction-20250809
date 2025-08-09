-- オークションシステム用データベース作成
CREATE DATABASE IF NOT EXISTS auction_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE auction_db;

-- 商品テーブル
CREATE TABLE IF NOT EXISTS products (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    current_price DECIMAL(15,2) NOT NULL,
    min_price DECIMAL(15,2) NOT NULL,
    end_time DATETIME NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    status ENUM('ACTIVE', 'ENDED', 'CANCELLED') NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_end_time (end_time)
);

-- 入札テーブル
CREATE TABLE IF NOT EXISTS bids (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    product_id BIGINT NOT NULL,
    bidder_name VARCHAR(255) NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    bid_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    INDEX idx_product_id (product_id),
    INDEX idx_bid_time (bid_time)
);

-- サンプルデータ挿入（オプション）
-- このスクリプトはSpring BootのDataInitializerで自動的に実行されます
