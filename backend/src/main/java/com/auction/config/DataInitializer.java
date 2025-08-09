package com.auction.config;

import com.auction.entity.Product;
import com.auction.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // サンプルデータが存在しない場合のみ初期化
        if (productRepository.count() == 0) {
            initializeSampleData();
        }
    }

    private void initializeSampleData() {
        LocalDateTime now = LocalDateTime.now();

        // 50個のサンプル商品を作成
        String[] productNames = {
                "高級腕時計", "アンティーク花瓶", "絵画作品", "宝石ネックレス", "古書",
                "陶器セット", "銀食器", "彫刻作品", "骨董品", "真珠ネックレス",
                "アンティーク家具", "古銭コレクション", "書道作品", "漆器セット", "刀剣",
                "仏像", "掛け軸", "茶器", "香炉", "屏風",
                "鏡", "櫛", "簪", "帯留め", "印籠",
                "根付", "煙管", "硯", "筆", "墨",
                "和紙", "扇子", "提灯", "風鈴", "置物",
                "花瓶", "皿", "碗", "箸", "箸置き",
                "湯呑み", "急須", "茶托", "茶筒", "茶筅",
                "茶杓", "茶巾", "茶釜", "茶炉", "茶室"
        };

        String[] descriptions = {
                "スイス製の高級機械式腕時計",
                "江戸時代の有田焼花瓶",
                "印象派画家による油絵",
                "ダイヤモンドとサファイアのネックレス",
                "明治時代の初版本",
                "美濃焼の茶器セット",
                "19世紀の銀製カトラリー",
                "ブロンズ製の彫刻作品",
                "中国明代の青花磁器",
                "天然真珠のネックレス",
                "明治時代の桐箪笥",
                "江戸時代の古銭セット",
                "有名書道家の作品",
                "輪島塗の漆器セット",
                "日本刀の名刀",
                "平安時代の仏像",
                "江戸時代の山水画",
                "楽焼の茶器",
                "青銅製の香炉",
                "六曲屏風",
                "江戸時代の鏡",
                "象牙製の櫛",
                "珊瑚の簪",
                "金工の帯留め",
                "蒔絵の印籠",
                "象牙の根付",
                "銀製の煙管",
                "端渓の硯",
                "鼈甲の筆",
                "古墨",
                "越前和紙",
                "金箔の扇子",
                "ガラス製の提灯",
                "江戸風鈴",
                "陶器の置物",
                "九谷焼の花瓶",
                "有田焼の皿",
                "美濃焼の碗",
                "漆塗りの箸",
                "銀製の箸置き",
                "楽焼の湯呑み",
                "急須",
                "茶托",
                "茶筒",
                "茶筅",
                "茶杓",
                "茶巾",
                "茶釜",
                "茶炉",
                "茶室"
        };

        String[] imageUrls = {
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
                "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center"
        };

        for (int i = 0; i < 50; i++) {
            Product product = new Product();
            product.setName(productNames[i]);
            product.setDescription(descriptions[i]);
            product.setCurrentPrice(new BigDecimal("10000").add(new BigDecimal(i * 5000)));
            product.setMinPrice(new BigDecimal("5000").add(new BigDecimal(i * 2000)));
            product.setEndTime(now.plusHours(1).plusMinutes(i * 5)); // 1時間後から5分間隔で終了
            product.setImageUrl(imageUrls[i]);
            product.setStatus(Product.AuctionStatus.ACTIVE);

            productRepository.save(product);
        }
    }
}
