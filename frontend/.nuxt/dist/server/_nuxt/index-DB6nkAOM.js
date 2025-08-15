import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from "vue/server-renderer";
import "h3";
import "C:/dev2508/auction/frontend/node_modules/hookable/dist/index.mjs";
[
  {
    id: 1,
    name: "高級腕時計",
    description: "スイス製の高級機械式腕時計",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 60 * 60 * 1e3).toISOString(),
    // 60分後
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3600,
    bidCount: 5,
    highestBidder: "田中太郎"
  },
  {
    id: 2,
    name: "アンティーク花瓶",
    description: "江戸時代の有田焼花瓶",
    currentPrice: 25e3,
    minPrice: 15e3,
    endTime: new Date(Date.now() + 55 * 60 * 1e3).toISOString(),
    // 55分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3300,
    bidCount: 3,
    highestBidder: "佐藤花子"
  },
  {
    id: 3,
    name: "絵画作品",
    description: "印象派画家による油絵",
    currentPrice: 8e4,
    minPrice: 5e4,
    endTime: new Date(Date.now() + 50 * 60 * 1e3).toISOString(),
    // 50分後
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3e3,
    bidCount: 8,
    highestBidder: "山田次郎"
  },
  {
    id: 4,
    name: "宝石ネックレス",
    description: "ダイヤモンドとサファイアのネックレス",
    currentPrice: 12e4,
    minPrice: 8e4,
    endTime: new Date(Date.now() + 45 * 60 * 1e3).toISOString(),
    // 45分後
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2700,
    bidCount: 12,
    highestBidder: "鈴木美咲"
  },
  {
    id: 5,
    name: "古書",
    description: "明治時代の初版本",
    currentPrice: 35e3,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 40 * 60 * 1e3).toISOString(),
    // 40分後
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2400,
    bidCount: 6,
    highestBidder: "高橋一郎"
  },
  {
    id: 6,
    name: "陶器セット",
    description: "美濃焼の茶器セット",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 35 * 60 * 1e3).toISOString(),
    // 35分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2100,
    bidCount: 4,
    highestBidder: "伊藤雅子"
  },
  {
    id: 7,
    name: "銀食器",
    description: "19世紀の銀製カトラリー",
    currentPrice: 45e3,
    minPrice: 3e4,
    endTime: new Date(Date.now() + 30 * 60 * 1e3).toISOString(),
    // 30分後
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1800,
    bidCount: 7,
    highestBidder: "渡辺健太"
  },
  {
    id: 8,
    name: "彫刻作品",
    description: "ブロンズ製の彫刻作品",
    currentPrice: 65e3,
    minPrice: 4e4,
    endTime: new Date(Date.now() + 25 * 60 * 1e3).toISOString(),
    // 25分後
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1500,
    bidCount: 9,
    highestBidder: "中村真理"
  },
  {
    id: 9,
    name: "骨董品",
    description: "中国明代の青花磁器",
    currentPrice: 95e3,
    minPrice: 6e4,
    endTime: new Date(Date.now() + 20 * 60 * 1e3).toISOString(),
    // 20分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1200,
    bidCount: 11,
    highestBidder: "小林正男"
  },
  {
    id: 10,
    name: "真珠ネックレス",
    description: "天然真珠のネックレス",
    currentPrice: 75e3,
    minPrice: 5e4,
    endTime: new Date(Date.now() + 18 * 60 * 1e3).toISOString(),
    // 18分後
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1080,
    bidCount: 8,
    highestBidder: "佐々木恵子"
  },
  {
    id: 11,
    name: "アンティーク家具",
    description: "明治時代の桐箪笥",
    currentPrice: 85e3,
    minPrice: 6e4,
    endTime: new Date(Date.now() + 16 * 60 * 1e3).toISOString(),
    // 16分後
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 960,
    bidCount: 6,
    highestBidder: "田村健一"
  },
  {
    id: 12,
    name: "古銭コレクション",
    description: "江戸時代の古銭セット",
    currentPrice: 55e3,
    minPrice: 35e3,
    endTime: new Date(Date.now() + 14 * 60 * 1e3).toISOString(),
    // 14分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 840,
    bidCount: 10,
    highestBidder: "井上博文"
  },
  {
    id: 13,
    name: "書道作品",
    description: "有名書道家の作品",
    currentPrice: 4e4,
    minPrice: 25e3,
    endTime: new Date(Date.now() + 12 * 60 * 1e3).toISOString(),
    // 12分後
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 720,
    bidCount: 7,
    highestBidder: "松本美咲"
  },
  {
    id: 14,
    name: "漆器セット",
    description: "輪島塗の漆器セット",
    currentPrice: 3e4,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 10 * 60 * 1e3).toISOString(),
    // 10分後
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 600,
    bidCount: 5,
    highestBidder: "山本太郎"
  },
  {
    id: 15,
    name: "刀剣",
    description: "日本刀の名刀",
    currentPrice: 15e4,
    minPrice: 1e5,
    endTime: new Date(Date.now() + 8 * 60 * 1e3).toISOString(),
    // 8分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 480,
    bidCount: 15,
    highestBidder: "武田信玄"
  },
  {
    id: 16,
    name: "仏像",
    description: "平安時代の仏像",
    currentPrice: 2e5,
    minPrice: 15e4,
    endTime: new Date(Date.now() + 6 * 60 * 1e3).toISOString(),
    // 6分後
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 360,
    bidCount: 20,
    highestBidder: "織田信長"
  },
  // 追加の商品データ（17-50）
  {
    id: 17,
    name: "掛け軸",
    description: "江戸時代の山水画",
    currentPrice: 45e3,
    minPrice: 3e4,
    endTime: new Date(Date.now() + 5 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 300,
    bidCount: 8,
    highestBidder: "徳川家康"
  },
  {
    id: 18,
    name: "茶器",
    description: "楽焼の茶器",
    currentPrice: 35e3,
    minPrice: 25e3,
    endTime: new Date(Date.now() + 4 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 240,
    bidCount: 6,
    highestBidder: "千利休"
  },
  {
    id: 19,
    name: "香炉",
    description: "青銅製の香炉",
    currentPrice: 28e3,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 3 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 180,
    bidCount: 5,
    highestBidder: "明智光秀"
  },
  {
    id: 20,
    name: "屏風",
    description: "六曲屏風",
    currentPrice: 12e4,
    minPrice: 8e4,
    endTime: new Date(Date.now() + 2 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 120,
    bidCount: 12,
    highestBidder: "豊臣秀吉"
  },
  {
    id: 21,
    name: "鏡",
    description: "江戸時代の鏡",
    currentPrice: 22e3,
    minPrice: 15e3,
    endTime: new Date(Date.now() + 1 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 60,
    bidCount: 4,
    highestBidder: "北条氏康"
  },
  {
    id: 22,
    name: "櫛",
    description: "象牙製の櫛",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 55 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3300,
    bidCount: 3,
    highestBidder: "今川義元"
  },
  {
    id: 23,
    name: "簪",
    description: "珊瑚の簪",
    currentPrice: 32e3,
    minPrice: 25e3,
    endTime: new Date(Date.now() + 50 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3e3,
    bidCount: 7,
    highestBidder: "武田信玄"
  },
  {
    id: 24,
    name: "帯留め",
    description: "金工の帯留め",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 45 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2700,
    bidCount: 5,
    highestBidder: "上杉謙信"
  },
  {
    id: 25,
    name: "印籠",
    description: "蒔絵の印籠",
    currentPrice: 38e3,
    minPrice: 28e3,
    endTime: new Date(Date.now() + 40 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2400,
    bidCount: 9,
    highestBidder: "毛利元就"
  },
  {
    id: 26,
    name: "根付",
    description: "象牙の根付",
    currentPrice: 12e3,
    minPrice: 8e3,
    endTime: new Date(Date.now() + 35 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2100,
    bidCount: 6,
    highestBidder: "島津義弘"
  },
  {
    id: 27,
    name: "煙管",
    description: "銀製の煙管",
    currentPrice: 8500,
    minPrice: 6e3,
    endTime: new Date(Date.now() + 30 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1800,
    bidCount: 4,
    highestBidder: "長宗我部元親"
  },
  {
    id: 28,
    name: "硯",
    description: "端渓の硯",
    currentPrice: 42e3,
    minPrice: 32e3,
    endTime: new Date(Date.now() + 25 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1500,
    bidCount: 11,
    highestBidder: "伊達政宗"
  },
  {
    id: 29,
    name: "筆",
    description: "鼈甲の筆",
    currentPrice: 28e3,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 20 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1200,
    bidCount: 8,
    highestBidder: "真田幸村"
  },
  {
    id: 30,
    name: "墨",
    description: "古墨",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 15 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 900,
    bidCount: 5,
    highestBidder: "石田三成"
  },
  {
    id: 31,
    name: "和紙",
    description: "越前和紙",
    currentPrice: 8e3,
    minPrice: 5e3,
    endTime: new Date(Date.now() + 10 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 600,
    bidCount: 3,
    highestBidder: "大谷吉継"
  },
  {
    id: 32,
    name: "扇子",
    description: "金箔の扇子",
    currentPrice: 22e3,
    minPrice: 15e3,
    endTime: new Date(Date.now() + 8 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 480,
    bidCount: 7,
    highestBidder: "小早川秀秋"
  },
  {
    id: 33,
    name: "提灯",
    description: "ガラス製の提灯",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 6 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 360,
    bidCount: 4,
    highestBidder: "福島正則"
  },
  {
    id: 34,
    name: "風鈴",
    description: "江戸風鈴",
    currentPrice: 12e3,
    minPrice: 8e3,
    endTime: new Date(Date.now() + 4 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 240,
    bidCount: 6,
    highestBidder: "加藤清正"
  },
  {
    id: 35,
    name: "置物",
    description: "陶器の置物",
    currentPrice: 25e3,
    minPrice: 18e3,
    endTime: new Date(Date.now() + 2 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 120,
    bidCount: 9,
    highestBidder: "黒田長政"
  },
  {
    id: 36,
    name: "花瓶",
    description: "九谷焼の花瓶",
    currentPrice: 35e3,
    minPrice: 25e3,
    endTime: new Date(Date.now() + 58 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3480,
    bidCount: 8,
    highestBidder: "細川忠興"
  },
  {
    id: 37,
    name: "皿",
    description: "有田焼の皿",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 56 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3360,
    bidCount: 5,
    highestBidder: "池田輝政"
  },
  {
    id: 38,
    name: "碗",
    description: "美濃焼の碗",
    currentPrice: 12e3,
    minPrice: 8e3,
    endTime: new Date(Date.now() + 54 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3240,
    bidCount: 4,
    highestBidder: "浅野幸長"
  },
  {
    id: 39,
    name: "箸",
    description: "漆塗りの箸",
    currentPrice: 8e3,
    minPrice: 5e3,
    endTime: new Date(Date.now() + 52 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3120,
    bidCount: 3,
    highestBidder: "蜂須賀家政"
  },
  {
    id: 40,
    name: "箸置き",
    description: "銀製の箸置き",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 50 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3e3,
    bidCount: 7,
    highestBidder: "山内一豊"
  },
  {
    id: 41,
    name: "湯呑み",
    description: "楽焼の湯呑み",
    currentPrice: 1e4,
    minPrice: 7e3,
    endTime: new Date(Date.now() + 48 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2880,
    bidCount: 5,
    highestBidder: "藤堂高虎"
  },
  {
    id: 42,
    name: "急須",
    description: "急須",
    currentPrice: 22e3,
    minPrice: 15e3,
    endTime: new Date(Date.now() + 46 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2760,
    bidCount: 8,
    highestBidder: "井伊直政"
  },
  {
    id: 43,
    name: "茶托",
    description: "茶托",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 44 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2640,
    bidCount: 6,
    highestBidder: "本多忠勝"
  },
  {
    id: 44,
    name: "茶筒",
    description: "茶筒",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 42 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2520,
    bidCount: 7,
    highestBidder: "榊原康政"
  },
  {
    id: 45,
    name: "茶筅",
    description: "茶筅",
    currentPrice: 12e3,
    minPrice: 8e3,
    endTime: new Date(Date.now() + 40 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2400,
    bidCount: 4,
    highestBidder: "酒井忠次"
  },
  {
    id: 46,
    name: "茶杓",
    description: "茶杓",
    currentPrice: 8e3,
    minPrice: 5e3,
    endTime: new Date(Date.now() + 38 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2280,
    bidCount: 3,
    highestBidder: "鳥居元忠"
  },
  {
    id: 47,
    name: "茶巾",
    description: "茶巾",
    currentPrice: 5e3,
    minPrice: 3e3,
    endTime: new Date(Date.now() + 36 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2160,
    bidCount: 2,
    highestBidder: "大久保忠世"
  },
  {
    id: 48,
    name: "茶釜",
    description: "茶釜",
    currentPrice: 45e3,
    minPrice: 3e4,
    endTime: new Date(Date.now() + 34 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2040,
    bidCount: 12,
    highestBidder: "服部正成"
  },
  {
    id: 49,
    name: "茶炉",
    description: "茶炉",
    currentPrice: 28e3,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 32 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1920,
    bidCount: 8,
    highestBidder: "柳生宗矩"
  },
  {
    id: 50,
    name: "茶室",
    description: "茶室",
    currentPrice: 15e4,
    minPrice: 1e5,
    endTime: new Date(Date.now() + 30 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1800,
    bidCount: 25,
    highestBidder: "千宗室"
  }
];
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const itemsPerPage = 16;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const products = ref([]);
    const loading = ref(true);
    const errorMessage = ref("");
    const successMessage = ref("");
    const isBidding = ref(false);
    const bidAmounts = ref({});
    const bidderNames = ref({});
    const countdownInterval = ref(null);
    const auctionStarted = ref(false);
    const currentTime = ref(Date.now());
    ref(null);
    const biddingProducts = ref(/* @__PURE__ */ new Set());
    const flashingProducts = ref(/* @__PURE__ */ new Set());
    const flashingPrices = ref(/* @__PURE__ */ new Set());
    const imageErrors = ref(/* @__PURE__ */ new Set());
    const showDropdown = ref(false);
    const showTimeModal = ref(false);
    const customTimes = ref({});
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));
    const paginatedProducts = computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginated = products.value.slice(startIndex, endIndex);
      paginated.forEach((product) => {
        if (!bidAmounts.value[product.id]) {
          bidAmounts.value[product.id] = product.currentPrice + 1e3;
        }
        if (!bidderNames.value[product.id]) {
          bidderNames.value[product.id] = "";
        }
      });
      return paginated;
    });
    const visiblePages = computed(() => {
      const total = totalPages.value;
      const current = currentPage.value;
      const pages = [];
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        if (current <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push(-1);
          pages.push(total);
        } else if (current >= total - 3) {
          pages.push(1);
          pages.push(-1);
          for (let i = total - 4; i <= total; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push(-1);
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i);
          }
          pages.push(-1);
          pages.push(total);
        }
      }
      return pages;
    });
    const fallbackImages = [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center"
    ];
    const getProductImage = (productId) => {
      const product = products.value.find((p) => p.id === productId);
      if (!product) {
        console.log(`商品が見つかりません: ID ${productId}`);
        return fallbackImages[0];
      }
      if (imageErrors.value.has(productId)) {
        const fallbackImage2 = fallbackImages[productId % fallbackImages.length];
        console.log(`代替画像を使用: 商品ID ${productId}, URL: ${fallbackImage2}`);
        return fallbackImage2;
      }
      const imageUrl = product.imageUrl;
      if (imageUrl && imageUrl.trim() !== "") {
        console.log(`商品画像を使用: 商品ID ${productId}, URL: ${imageUrl}`);
        return imageUrl;
      }
      const fallbackImage = fallbackImages[productId % fallbackImages.length];
      console.log(`代替画像を使用（imageUrlなし）: 商品ID ${productId}, URL: ${fallbackImage}`);
      return fallbackImage;
    };
    const getBidButtonText = (productId) => {
      if (biddingProducts.value.has(productId)) {
        return "入札中...";
      }
      return "入札";
    };
    const getTimeRemaining = (product) => {
      const endTime = new Date(product.endTime).getTime();
      const now = currentTime.value;
      const remaining = Math.max(0, Math.floor((endTime - now) / 1e3));
      return remaining;
    };
    const formatTime = (seconds) => {
      if (seconds <= 0) return "00:00:00";
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      const secs = seconds % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };
    const formatPrice = (price) => {
      return price.toLocaleString();
    };
    const startCountdown = () => {
      if (countdownInterval.value) {
        clearInterval(countdownInterval.value);
        console.log("🔄 既存のカウントダウンタイマーをクリアしました");
      }
      console.log("⏱️ リアルタイムカウントダウンを開始します");
      countdownInterval.value = setInterval();
      console.log("✅ カウントダウンタイマーが設定されました");
    };
    watch(products, (newProducts) => {
      if (newProducts.length > 0) {
        newProducts.forEach((product) => {
          if (!bidAmounts.value[product.id]) {
            bidAmounts.value[product.id] = product.currentPrice + 1e3;
          }
          if (!bidderNames.value[product.id]) {
            bidderNames.value[product.id] = "";
          }
        });
        if (!auctionStarted.value) {
          auctionStarted.value = true;
          console.log("🎉 オークションが開始されました！");
          startCountdown();
        } else if (!countdownInterval.value) {
          console.log("🔄 カウントダウンが停止しているため再開始します");
          startCountdown();
        }
      }
    }, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container" }, _attrs))}>`);
      if (errorMessage.value) {
        _push(`<div class="error-message">${ssrInterpolate(errorMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (successMessage.value) {
        _push(`<div class="success-message">${ssrInterpolate(successMessage.value)}</div>`);
      } else {
        _push(`<!---->`);
      }
      if (loading.value) {
        _push(`<div class="loading"><div class="spinner"></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && products.value.length > 0) {
        _push(`<div class="dropdown-section"><div class="${ssrRenderClass([{ "open": showDropdown.value }, "dropdown"])}"><button class="dropdown-toggle"> ▼ オークション時間設定 </button><div class="dropdown-menu"><div class="dropdown-item"> 🔄 オークション時間リセット </div><div class="dropdown-item"> ⏰ 個別時間設定 </div><div class="dropdown-item danger"> 🗑️ 完全リセット </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showDropdown.value) {
        _push(`<div class="dropdown-overlay"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showTimeModal.value) {
        _push(`<div class="modal-overlay"><div class="modal-content"><h3>商品ごとのオークション時間設定</h3><div class="time-settings"><!--[-->`);
        ssrRenderList(products.value, (product) => {
          _push(`<div class="time-setting-item"><div class="product-info"><span class="product-name-small">${ssrInterpolate(product.name)}</span><span class="current-time">現在: ${ssrInterpolate(formatTime(getTimeRemaining(product)))}</span></div><div class="time-inputs"><select class="time-range-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "") : ssrLooseEqual(customTimes.value[product.id].timeRange, "")) ? " selected" : ""}>時間を選択</option><option value="5"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "5") : ssrLooseEqual(customTimes.value[product.id].timeRange, "5")) ? " selected" : ""}>5分</option><option value="10"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "10") : ssrLooseEqual(customTimes.value[product.id].timeRange, "10")) ? " selected" : ""}>10分</option><option value="15"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "15") : ssrLooseEqual(customTimes.value[product.id].timeRange, "15")) ? " selected" : ""}>15分</option><option value="20"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "20") : ssrLooseEqual(customTimes.value[product.id].timeRange, "20")) ? " selected" : ""}>20分</option><option value="30"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "30") : ssrLooseEqual(customTimes.value[product.id].timeRange, "30")) ? " selected" : ""}>30分</option><option value="45"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "45") : ssrLooseEqual(customTimes.value[product.id].timeRange, "45")) ? " selected" : ""}>45分</option><option value="60"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "60") : ssrLooseEqual(customTimes.value[product.id].timeRange, "60")) ? " selected" : ""}>1時間</option><option value="90"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "90") : ssrLooseEqual(customTimes.value[product.id].timeRange, "90")) ? " selected" : ""}>1.5時間</option><option value="120"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "120") : ssrLooseEqual(customTimes.value[product.id].timeRange, "120")) ? " selected" : ""}>2時間</option><option value="180"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "180") : ssrLooseEqual(customTimes.value[product.id].timeRange, "180")) ? " selected" : ""}>3時間</option><option value="240"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "240") : ssrLooseEqual(customTimes.value[product.id].timeRange, "240")) ? " selected" : ""}>4時間</option><option value="300"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "300") : ssrLooseEqual(customTimes.value[product.id].timeRange, "300")) ? " selected" : ""}>5時間</option><option value="360"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "360") : ssrLooseEqual(customTimes.value[product.id].timeRange, "360")) ? " selected" : ""}>6時間</option><option value="480"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "480") : ssrLooseEqual(customTimes.value[product.id].timeRange, "480")) ? " selected" : ""}>8時間</option><option value="600"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "600") : ssrLooseEqual(customTimes.value[product.id].timeRange, "600")) ? " selected" : ""}>10時間</option><option value="720"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "720") : ssrLooseEqual(customTimes.value[product.id].timeRange, "720")) ? " selected" : ""}>12時間</option><option value="1440"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "1440") : ssrLooseEqual(customTimes.value[product.id].timeRange, "1440")) ? " selected" : ""}>24時間</option></select></div></div>`);
        });
        _push(`<!--]--></div><div class="preset-times"><h4>プリセット時間</h4><div class="preset-buttons"><button class="preset-button">15分</button><button class="preset-button">30分</button><button class="preset-button">45分</button><button class="preset-button">1時間</button><button class="preset-button">1.5時間</button><button class="preset-button">2時間</button></div></div><div class="modal-actions"><button class="apply-button">適用</button><button class="cancel-button">キャンセル</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value) {
        _push(`<div class="auction-grid"><!--[-->`);
        ssrRenderList(paginatedProducts.value, (product) => {
          _push(`<div class="${ssrRenderClass([{ ended: product.status === "ENDED" }, "product-card"])}"><div class="product-image-container"><img${ssrRenderAttr("src", getProductImage(product.id))}${ssrRenderAttr("alt", product.name)}${ssrRenderAttr("data-product-id", product.id)} class="product-image"></div><div class="${ssrRenderClass([product.status === "ACTIVE" ? "status-active" : "status-ended", "status-badge"])}">${ssrInterpolate(product.status === "ACTIVE" ? "進行中" : "終了")}</div><h3 class="product-name">${ssrInterpolate(product.name)}</h3><p class="product-description">${ssrInterpolate(product.description)}</p><div class="${ssrRenderClass([{ "price-flash": flashingPrices.value.has(product.id) }, "product-price"])}"> ¥${ssrInterpolate(formatPrice(product.currentPrice))}</div><div class="${ssrRenderClass([{ urgent: getTimeRemaining(product) <= 300 }, "countdown"])}">${ssrInterpolate(formatTime(getTimeRemaining(product)))}</div>`);
          if (product.status === "ACTIVE") {
            _push(`<div class="time-management"><button class="extend-button small"${ssrIncludeBooleanAttr(getTimeRemaining(product) >= 3600) ? " disabled" : ""}> +5分 </button><button class="extend-button small"${ssrIncludeBooleanAttr(getTimeRemaining(product) >= 3600) ? " disabled" : ""}> +10分 </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="bid-info"><span>入札数: ${ssrInterpolate(product.bidCount)}</span><span>最高入札者: ${ssrInterpolate(product.highestBidder)}</span></div>`);
          if (product.status === "ACTIVE" && getTimeRemaining(product) > 0) {
            _push(`<div class="bid-form"><input${ssrRenderAttr("value", bidAmounts.value[product.id])} type="number"${ssrRenderAttr("min", product.currentPrice + 1)}${ssrRenderAttr("step", 1)} placeholder="入札金額" class="bid-input"><button${ssrIncludeBooleanAttr(!bidAmounts.value[product.id] || isBidding.value) ? " disabled" : ""} class="${ssrRenderClass([{
              bidding: biddingProducts.value.has(product.id),
              flash: flashingProducts.value.has(product.id)
            }, "bid-button"])}">${ssrInterpolate(getBidButtonText(product.id))}</button></div>`);
          } else {
            _push(`<!---->`);
          }
          if (product.status === "ACTIVE" && getTimeRemaining(product) > 0) {
            _push(`<div class="bid-form"><input${ssrRenderAttr("value", bidderNames.value[product.id])} type="text" placeholder="入札者名" class="bid-input"></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value && totalPages.value > 1) {
        _push(`<div class="pagination"><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-button"> 前へ </button><div class="page-numbers"><!--[-->`);
        ssrRenderList(visiblePages.value, (page) => {
          _push(`<button class="${ssrRenderClass([{ active: page === currentPage.value }, "page-button"])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-button"> 次へ </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
