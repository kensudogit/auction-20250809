import type { Product, Bid, BidRequest } from '~/types/auction';

const API_BASE_URL = 'http://localhost:8080/api/auction';

// ダミー商品データ
const dummyProducts: Product[] = [
  {
    id: 1,
    name: "高級腕時計",
    description: "スイス製の高級機械式腕時計",
    currentPrice: 15000,
    minPrice: 10000,
    endTime: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 60分後
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
    currentPrice: 25000,
    minPrice: 15000,
    endTime: new Date(Date.now() + 55 * 60 * 1000).toISOString(), // 55分後
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
    currentPrice: 80000,
    minPrice: 50000,
    endTime: new Date(Date.now() + 50 * 60 * 1000).toISOString(), // 50分後
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3000,
    bidCount: 8,
    highestBidder: "山田次郎"
  },
  {
    id: 4,
    name: "宝石ネックレス",
    description: "ダイヤモンドとサファイアのネックレス",
    currentPrice: 120000,
    minPrice: 80000,
    endTime: new Date(Date.now() + 45 * 60 * 1000).toISOString(), // 45分後
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
    currentPrice: 35000,
    minPrice: 20000,
    endTime: new Date(Date.now() + 40 * 60 * 1000).toISOString(), // 40分後
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
    currentPrice: 18000,
    minPrice: 12000,
    endTime: new Date(Date.now() + 35 * 60 * 1000).toISOString(), // 35分後
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
    currentPrice: 45000,
    minPrice: 30000,
    endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30分後
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
    currentPrice: 65000,
    minPrice: 40000,
    endTime: new Date(Date.now() + 25 * 60 * 1000).toISOString(), // 25分後
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
    currentPrice: 95000,
    minPrice: 60000,
    endTime: new Date(Date.now() + 20 * 60 * 1000).toISOString(), // 20分後
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
    currentPrice: 75000,
    minPrice: 50000,
    endTime: new Date(Date.now() + 18 * 60 * 1000).toISOString(), // 18分後
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
    currentPrice: 85000,
    minPrice: 60000,
    endTime: new Date(Date.now() + 16 * 60 * 1000).toISOString(), // 16分後
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
    currentPrice: 55000,
    minPrice: 35000,
    endTime: new Date(Date.now() + 14 * 60 * 1000).toISOString(), // 14分後
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
    currentPrice: 40000,
    minPrice: 25000,
    endTime: new Date(Date.now() + 12 * 60 * 1000).toISOString(), // 12分後
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
    currentPrice: 30000,
    minPrice: 20000,
    endTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(), // 10分後
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
    currentPrice: 150000,
    minPrice: 100000,
    endTime: new Date(Date.now() + 8 * 60 * 1000).toISOString(), // 8分後
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
    currentPrice: 200000,
    minPrice: 150000,
    endTime: new Date(Date.now() + 6 * 60 * 1000).toISOString(), // 6分後
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
    currentPrice: 45000,
    minPrice: 30000,
    endTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
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
    currentPrice: 35000,
    minPrice: 25000,
    endTime: new Date(Date.now() + 4 * 60 * 1000).toISOString(),
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
    currentPrice: 28000,
    minPrice: 20000,
    endTime: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
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
    currentPrice: 120000,
    minPrice: 80000,
    endTime: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
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
    currentPrice: 22000,
    minPrice: 15000,
    endTime: new Date(Date.now() + 1 * 60 * 1000).toISOString(),
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
    currentPrice: 18000,
    minPrice: 12000,
    endTime: new Date(Date.now() + 55 * 60 * 1000).toISOString(),
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
    currentPrice: 32000,
    minPrice: 25000,
    endTime: new Date(Date.now() + 50 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3000,
    bidCount: 7,
    highestBidder: "武田信玄"
  },
  {
    id: 24,
    name: "帯留め",
    description: "金工の帯留め",
    currentPrice: 15000,
    minPrice: 10000,
    endTime: new Date(Date.now() + 45 * 60 * 1000).toISOString(),
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
    currentPrice: 38000,
    minPrice: 28000,
    endTime: new Date(Date.now() + 40 * 60 * 1000).toISOString(),
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
    currentPrice: 12000,
    minPrice: 8000,
    endTime: new Date(Date.now() + 35 * 60 * 1000).toISOString(),
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
    minPrice: 6000,
    endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
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
    currentPrice: 42000,
    minPrice: 32000,
    endTime: new Date(Date.now() + 25 * 60 * 1000).toISOString(),
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
    currentPrice: 28000,
    minPrice: 20000,
    endTime: new Date(Date.now() + 20 * 60 * 1000).toISOString(),
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
    currentPrice: 15000,
    minPrice: 10000,
    endTime: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
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
    currentPrice: 8000,
    minPrice: 5000,
    endTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
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
    currentPrice: 22000,
    minPrice: 15000,
    endTime: new Date(Date.now() + 8 * 60 * 1000).toISOString(),
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
    currentPrice: 18000,
    minPrice: 12000,
    endTime: new Date(Date.now() + 6 * 60 * 1000).toISOString(),
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
    currentPrice: 12000,
    minPrice: 8000,
    endTime: new Date(Date.now() + 4 * 60 * 1000).toISOString(),
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
    currentPrice: 25000,
    minPrice: 18000,
    endTime: new Date(Date.now() + 2 * 60 * 1000).toISOString(),
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
    currentPrice: 35000,
    minPrice: 25000,
    endTime: new Date(Date.now() + 58 * 60 * 1000).toISOString(),
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
    currentPrice: 15000,
    minPrice: 10000,
    endTime: new Date(Date.now() + 56 * 60 * 1000).toISOString(),
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
    currentPrice: 12000,
    minPrice: 8000,
    endTime: new Date(Date.now() + 54 * 60 * 1000).toISOString(),
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
    currentPrice: 8000,
    minPrice: 5000,
    endTime: new Date(Date.now() + 52 * 60 * 1000).toISOString(),
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
    currentPrice: 18000,
    minPrice: 12000,
    endTime: new Date(Date.now() + 50 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3000,
    bidCount: 7,
    highestBidder: "山内一豊"
  },
  {
    id: 41,
    name: "湯呑み",
    description: "楽焼の湯呑み",
    currentPrice: 10000,
    minPrice: 7000,
    endTime: new Date(Date.now() + 48 * 60 * 1000).toISOString(),
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
    currentPrice: 22000,
    minPrice: 15000,
    endTime: new Date(Date.now() + 46 * 60 * 1000).toISOString(),
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
    currentPrice: 15000,
    minPrice: 10000,
    endTime: new Date(Date.now() + 44 * 60 * 1000).toISOString(),
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
    currentPrice: 18000,
    minPrice: 12000,
    endTime: new Date(Date.now() + 42 * 60 * 1000).toISOString(),
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
    currentPrice: 12000,
    minPrice: 8000,
    endTime: new Date(Date.now() + 40 * 60 * 1000).toISOString(),
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
    currentPrice: 8000,
    minPrice: 5000,
    endTime: new Date(Date.now() + 38 * 60 * 1000).toISOString(),
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
    currentPrice: 5000,
    minPrice: 3000,
    endTime: new Date(Date.now() + 36 * 60 * 1000).toISOString(),
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
    currentPrice: 45000,
    minPrice: 30000,
    endTime: new Date(Date.now() + 34 * 60 * 1000).toISOString(),
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
    currentPrice: 28000,
    minPrice: 20000,
    endTime: new Date(Date.now() + 32 * 60 * 1000).toISOString(),
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
    currentPrice: 150000,
    minPrice: 100000,
    endTime: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1800,
    bidCount: 25,
    highestBidder: "千宗室"
  }
];

export class AuctionApiService {
  // アクティブなオークション商品を取得
  static async getActiveAuctions(): Promise<Product[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('バックエンドに接続できません。ダミーデータを表示します。');
      // バックエンドが利用できない場合はダミーデータを返す
      return dummyProducts;
    }
  }

  // 特定の商品を取得
  static async getProduct(id: number): Promise<Product> {
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('バックエンドに接続できません。ダミーデータを表示します。');
      // バックエンドが利用できない場合はダミーデータから該当商品を返す
      const dummyProduct = dummyProducts.find(p => p.id === id);
      if (dummyProduct) {
        return dummyProduct;
      }
      throw new Error('商品が見つかりません');
    }
  }

  // 入札を実行
  static async placeBid(bidRequest: BidRequest): Promise<Bid> {
    try {
      const response = await fetch(`${API_BASE_URL}/bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bidRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.log('バックエンドに接続できません。ダミーの入札処理を実行します。');
      // バックエンドが利用できない場合はダミーの入札レスポンスを返す
      return {
        id: Date.now(),
        productId: bidRequest.productId,
        bidderName: bidRequest.bidderName,
        amount: bidRequest.amount,
        bidTime: new Date().toISOString()
      };
    }
  }
}
