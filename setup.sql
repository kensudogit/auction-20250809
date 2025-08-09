-- オークションシステム用データベース作成
CREATE DATABASE IF NOT EXISTS auction_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE auction_db;

-- 会員テーブル
CREATE TABLE IF NOT EXISTS members (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    address TEXT,
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') NOT NULL DEFAULT 'ACTIVE',
    member_type ENUM('REGULAR', 'PREMIUM', 'ADMIN') NOT NULL DEFAULT 'REGULAR',
    registered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email),
    INDEX idx_status (status),
    INDEX idx_member_type (member_type)
);

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
