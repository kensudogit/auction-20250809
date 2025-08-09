<template>
  <div class="container">
    <!-- ヘッダー -->
    <!-- エラーメッセージ -->
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>

    <!-- 成功メッセージ -->
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>

    <!-- ローディング -->
    <div v-if="loading" class="loading">
      商品を読み込み中...
    </div>

    <!-- オークション開始メッセージ -->

    <!-- リセットボタン -->
    <div v-if="!loading && products.length > 0" class="reset-section">
      <button @click="resetAuctionTime" class="reset-button">
        🔄 オークション時間をリセット
      </button>
      <button @click="fullReset" class="reset-button full-reset">
        🗑️ 完全リセット
      </button>
    </div>

    <!-- オークショングリッド -->
    <div v-if="!loading" class="auction-grid">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product-card"
        :class="{ ended: product.status === 'ENDED' }"
      >
        <!-- 商品画像 -->
        <div class="product-image-container">
          <img 
            :src="getProductImage(product.id)" 
            :alt="product.name" 
            :data-product-id="product.id"
            class="product-image"
            @error="handleImageError(product.id)"
          />
        </div>
        <!-- ステータスバッジ -->
        <div
          class="status-badge"
          :class="product.status === 'ACTIVE' ? 'status-active' : 'status-ended'"
        >
          {{ product.status === 'ACTIVE' ? '進行中' : '終了' }}
        </div>

        <!-- 商品名 -->
        <h3 class="product-name">{{ product.name }}</h3>

        <!-- 商品説明 -->
        <p class="product-description">{{ product.description }}</p>

        <!-- 現在価格 -->
        <div class="product-price">
          ¥{{ formatPrice(product.currentPrice) }}
        </div>

        <!-- カウントダウン -->
        <div
          class="countdown"
          :class="{ urgent: getTimeRemaining(product) <= 300 }"
        >
          {{ formatTime(getTimeRemaining(product)) }}
        </div>

        <!-- 入札情報 -->
        <div class="bid-info">
          <span>入札数: {{ product.bidCount }}</span>
          <span>最高入札者: {{ product.highestBidder }}</span>
        </div>

        <!-- 入札フォーム -->
        <div v-if="product.status === 'ACTIVE' && getTimeRemaining(product) > 0" class="bid-form">
          <input
            v-model="bidAmounts[product.id]"
            type="number"
            :min="product.currentPrice + 1"
            :step="1"
            placeholder="入札金額"
            class="bid-input"
            @keyup.enter="handleBidClick(product.id)"
          />
          <button
            @click="handleBidClick(product.id)"
            :disabled="!bidAmounts[product.id] || isBidding"
            class="bid-button"
            :class="{ 
              bidding: biddingProducts.has(product.id),
              flash: flashingProducts.has(product.id)
            }"
          >
            {{ getBidButtonText(product.id) }}
          </button>
        </div>

        <!-- 入札者名入力 -->
        <div v-if="product.status === 'ACTIVE' && getTimeRemaining(product) > 0" class="bid-form">
          <input
            v-model="bidderNames[product.id]"
            type="text"
            placeholder="入札者名"
            class="bid-input"
            @keyup.enter="handleBidClick(product.id)"
          />
        </div>
      </div>
    </div>

    <!-- ページネーション -->
    <div v-if="!loading && totalPages > 1" class="pagination">
      <button 
        @click="goToPage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="pagination-button"
      >
        前へ
      </button>
      
      <div class="page-numbers">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="goToPage(page)"
          :class="{ active: page === currentPage }"
          class="page-button"
        >
          {{ page }}
        </button>
      </div>
      
      <button 
        @click="goToPage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="pagination-button"
      >
        次へ
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import { AuctionApiService } from '~/services/api';
import { WebSocketService } from '~/services/websocket';
import type { Product, BidRequest } from '~/types/auction';

// リアクティブな状態
const products = ref<Product[]>([]);
const loading = ref(true);
const errorMessage = ref('');
const successMessage = ref('');
const isBidding = ref(false);
const bidAmounts = ref<Record<number, number>>({});
const bidderNames = ref<Record<number, string>>({});
const countdownInterval = ref<NodeJS.Timeout | null>(null);
const auctionStarted = ref(false);
const currentTime = ref(Date.now());
const auctionStartTime = ref<number | null>(null);
const biddingProducts = ref<Set<number>>(new Set());
const flashingProducts = ref<Set<number>>(new Set());
const imageErrors = ref<Set<number>>(new Set());

// ページネーション関連
const currentPage = ref(1);
const itemsPerPage = 16; // 1ページあたり16個の商品

// WebSocketサービス
const wsService = new WebSocketService();

// ローカルストレージのキー
const STORAGE_KEYS = {
  AUCTION_START_TIME: 'auction_start_time',
  PRODUCTS_DATA: 'auction_products_data'
};

// ページネーション計算
const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage));

const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginated = products.value.slice(startIndex, endIndex);
  
  // ページネーションで表示される商品の入札金額と入札者名を初期化
  paginated.forEach(product => {
    if (!bidAmounts.value[product.id]) {
      bidAmounts.value[product.id] = product.currentPrice + 1000;
    }
    if (!bidderNames.value[product.id]) {
      bidderNames.value[product.id] = '';
    }
  });
  
  return paginated;
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages: number[] = [];
  
  if (total <= 7) {
    // 7ページ以下の場合は全て表示
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // 7ページを超える場合は現在のページ周辺を表示
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
      pages.push(-1); // 省略記号
      pages.push(total);
    } else if (current >= total - 3) {
      pages.push(1);
      pages.push(-1); // 省略記号
      for (let i = total - 4; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push(-1); // 省略記号
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i);
      }
      pages.push(-1); // 省略記号
      pages.push(total);
    }
  }
  
  return pages;
});

// ページ移動
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
    
    // ページ移動時に表示される商品の入札金額と入札者名を初期化
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageProducts = products.value.slice(startIndex, endIndex);
    
    pageProducts.forEach(product => {
      if (!bidAmounts.value[product.id]) {
        bidAmounts.value[product.id] = product.currentPrice + 1000;
      }
      if (!bidderNames.value[product.id]) {
        bidderNames.value[product.id] = '';
      }
    });
    
    // ページトップにスクロール
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// 代替画像の配列
const fallbackImages = [
  'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
  'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center'
];

// 商品画像を取得
const getProductImage = (productId: number): string => {
  const product = products.value.find(p => p.id === productId);
  if (!product) {
    console.log(`商品が見つかりません: ID ${productId}`);
    return fallbackImages[0];
  }
  
  // 画像エラーが発生している場合は代替画像を使用
  if (imageErrors.value.has(productId)) {
    const fallbackImage = fallbackImages[productId % fallbackImages.length];
    console.log(`代替画像を使用: 商品ID ${productId}, URL: ${fallbackImage}`);
    return fallbackImage;
  }
  
  // 商品のimageUrlが存在する場合はそれを使用、なければ代替画像を使用
  const imageUrl = product.imageUrl;
  if (imageUrl && imageUrl.trim() !== '') {
    console.log(`商品画像を使用: 商品ID ${productId}, URL: ${imageUrl}`);
    return imageUrl;
  }
  
  const fallbackImage = fallbackImages[productId % fallbackImages.length];
  console.log(`代替画像を使用（imageUrlなし）: 商品ID ${productId}, URL: ${fallbackImage}`);
  return fallbackImage;
};

// 画像読み込みエラーを処理
const handleImageError = (productId: number) => {
  console.log(`画像読み込みエラー: 商品ID ${productId}`);
  imageErrors.value.add(productId);
  
  // エラーが発生した場合、代替画像を表示
  const imgElement = document.querySelector(`[data-product-id="${productId}"]`) as HTMLImageElement;
  if (imgElement) {
    const fallbackImage = fallbackImages[productId % fallbackImages.length];
    imgElement.src = fallbackImage;
  }
};

// ローカルストレージからデータを読み込み
const loadFromStorage = () => {
  try {
    // オークション開始時間を読み込み
    const savedStartTime = localStorage.getItem(STORAGE_KEYS.AUCTION_START_TIME);
    if (savedStartTime) {
      auctionStartTime.value = parseInt(savedStartTime);
      console.log('📅 保存されたオークション開始時間を復元しました');
    }

    // 商品データを読み込み
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS_DATA);
    if (savedProducts) {
      const parsedProducts = JSON.parse(savedProducts);
      products.value = parsedProducts;
      console.log('💾 保存された商品データを復元しました');
      
      // 入札金額と入札者名の初期化
      products.value.forEach(product => {
        bidAmounts.value[product.id] = product.currentPrice + 1000;
        bidderNames.value[product.id] = '';
      });
    }
  } catch (error) {
    console.error('ローカルストレージからの読み込みに失敗:', error);
  }
};

// ローカルストレージにデータを保存
const saveToStorage = () => {
  try {
    // オークション開始時間を保存
    if (auctionStartTime.value) {
      localStorage.setItem(STORAGE_KEYS.AUCTION_START_TIME, auctionStartTime.value.toString());
    }

    // 商品データを保存
    localStorage.setItem(STORAGE_KEYS.PRODUCTS_DATA, JSON.stringify(products.value));
  } catch (error) {
    console.error('ローカルストレージへの保存に失敗:', error);
  }
};

// 商品データを取得
const fetchProducts = async () => {
  try {
    loading.value = true;
    const data = await AuctionApiService.getActiveAuctions();
    
    // 初回起動時のみオークション開始時間を設定
    if (!auctionStartTime.value) {
      auctionStartTime.value = Date.now();
      console.log('🎉 新しいオークションを開始しました！');
    }

    products.value = data;
    
    // 入札金額と入札者名の初期化
    data.forEach(product => {
      bidAmounts.value[product.id] = product.currentPrice + 1000;
      bidderNames.value[product.id] = '';
      
      // デバッグ用: 各商品の終了時間をログ出力
      const endTime = new Date(product.endTime);
      const now = new Date();
      const remaining = Math.floor((endTime.getTime() - now.getTime()) / 1000);
      console.log(`📦 商品: ${product.name}, 終了時間: ${endTime.toLocaleString()}, 残り時間: ${formatTime(remaining)}`);
    });

    // オークション開始フラグを設定
    if (data.length > 0) {
      auctionStarted.value = true;
      console.log('🎯 商品データ取得完了、オークション開始フラグを設定');
    }

    // データをローカルストレージに保存
    saveToStorage();
    
    // 商品データ取得後にカウントダウンが開始されていない場合は開始
    if (data.length > 0 && !countdownInterval.value) {
      console.log('⏱️ fetchProducts後にカウントダウンを開始します');
      startCountdown();
    }
  } catch (error) {
    errorMessage.value = '商品の取得に失敗しました';
    console.error('Failed to fetch products:', error);
  } finally {
    loading.value = false;
  }
};

// 入札ボタンのテキストを取得
const getBidButtonText = (productId: number): string => {
  if (biddingProducts.value.has(productId)) {
    return '入札中...';
  }
  return '入札';
};

// フラッシュ効果を開始
const startFlash = (productId: number) => {
  flashingProducts.value.add(productId);
  
  // 0.6秒後にフラッシュ効果を削除
  setTimeout(() => {
    flashingProducts.value.delete(productId);
  }, 600);
};

// 入札ボタンクリックハンドラー
const handleBidClick = async (productId: number) => {
  // フラッシュ効果を開始
  startFlash(productId);
  
  // 少し遅延させてから入札処理を実行
  setTimeout(() => {
    placeBid(productId);
  }, 100);
};

// 入札を実行
const placeBid = async (productId: number) => {
  const amount = bidAmounts.value[productId];
  const bidderName = bidderNames.value[productId];

  if (!amount || !bidderName) {
    errorMessage.value = '入札金額と入札者名を入力してください';
    return;
  }

  try {
    // 入札中の商品を追加
    biddingProducts.value.add(productId);
    isBidding.value = true;
    errorMessage.value = '';
    
    const bidRequest: BidRequest = {
      productId,
      bidderName,
      amount
    };

    await AuctionApiService.placeBid(bidRequest);
    
    successMessage.value = '入札が完了しました！';
    
    // 入札金額を更新
    bidAmounts.value[productId] = amount + 1000;
    
    // 3秒後に成功メッセージをクリア
    setTimeout(() => {
      successMessage.value = '';
    }, 3000);
    
  } catch (error: any) {
    errorMessage.value = error.message || '入札に失敗しました';
  } finally {
    // 入札中の商品を削除
    biddingProducts.value.delete(productId);
    isBidding.value = false;
  }
};

// 残り時間を計算（リアクティブ）
const getTimeRemaining = (product: Product): number => {
  const endTime = new Date(product.endTime).getTime();
  const now = currentTime.value;
  const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
  
  return remaining;
};

// 時間をフォーマット（常に時:分:秒の形式）
const formatTime = (seconds: number): string => {
  if (seconds <= 0) return '00:00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

// 価格をフォーマット
const formatPrice = (price: number): string => {
  return price.toLocaleString();
};

// カウントダウン更新
const updateCountdown = () => {
  // 現在時刻を更新（これによりVueのリアクティブシステムが反応）
  currentTime.value = Date.now();
  
  let hasActiveAuctions = false;
  
  products.value.forEach(product => {
    if (product.status === 'ACTIVE') {
      const remaining = getTimeRemaining(product);
      if (remaining <= 0) {
        product.status = 'ENDED';
        console.log(`⏰ オークション終了: ${product.name} (残り時間: ${formatTime(remaining)})`);
      } else {
        hasActiveAuctions = true;
        // デバッグ用: 残り時間が少ない商品をログ出力
        if (remaining <= 60) {
          console.log(`⚠️ 残り時間が少ない商品: ${product.name} (残り時間: ${formatTime(remaining)})`);
        }
      }
    }
  });

  // すべてのオークションが終了した場合
  if (!hasActiveAuctions && auctionStarted.value) {
    console.log('🏁 すべてのオークションが終了しました');
  }

  // 定期的にデータを保存
  saveToStorage();
};

// カウントダウンタイマーを開始
const startCountdown = () => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
    console.log('🔄 既存のカウントダウンタイマーをクリアしました');
  }
  
  console.log('⏱️ リアルタイムカウントダウンを開始します');
  // より滑らかなカウントダウンのため、500ミリ秒間隔で更新
  countdownInterval.value = setInterval(updateCountdown, 500);
  console.log('✅ カウントダウンタイマーが設定されました');
};

// カウントダウンタイマーを停止
const stopCountdown = () => {
  if (countdownInterval.value) {
    clearInterval(countdownInterval.value);
    countdownInterval.value = null;
    console.log('⏹️ カウントダウンタイマーを停止しました');
  }
};

// オークション残り時間を初期値にリセット
const resetAuctionTime = () => {
  // オークション開始時間を現在時刻にリセット
  auctionStartTime.value = Date.now();
  
  // 全商品のステータスをACTIVEに戻し、終了時間を更新
  const now = new Date();
  products.value.forEach((product, index) => {
    product.status = 'ACTIVE';
    
    // 各商品の終了時間を60分後から5分間隔で設定
    const endTime = new Date(now.getTime() + (60 - index * 5) * 60 * 1000);
    product.endTime = endTime.toISOString();
    
    console.log(`🔄 商品: ${product.name}, 新しい終了時間: ${endTime.toLocaleString()}`);
  });
  
  // 入札金額と入札者名を再初期化
  products.value.forEach(product => {
    bidAmounts.value[product.id] = product.currentPrice + 1000;
    bidderNames.value[product.id] = '';
  });
  
  // ローカルストレージに保存
  saveToStorage();
  
  // カウントダウンを再開始
  startCountdown();
  
  console.log('🔄 オークション残り時間を初期値にリセットしました');
  successMessage.value = 'オークション残り時間をリセットしました！';
  
  // 3秒後にメッセージをクリア
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
};

// 完全リセット（ローカルストレージもクリア）
const fullReset = async () => {
  // ローカルストレージをクリア
  localStorage.removeItem(STORAGE_KEYS.AUCTION_START_TIME);
  localStorage.removeItem(STORAGE_KEYS.PRODUCTS_DATA);
  
  // 状態をリセット
  auctionStartTime.value = null;
  auctionStarted.value = false;
  products.value = [];
  
  // 入札金額と入札者名をクリア
  bidAmounts.value = {};
  bidderNames.value = {};
  
  // カウントダウンを停止
  stopCountdown();
  
  console.log('🔄 完全リセットを実行しました');
  successMessage.value = '完全リセットを実行しました！新しいオークションを開始します。';
  
  try {
    // 商品データを再取得
    await fetchProducts();
    
    // 商品データ取得後にカウントダウンを開始
    if (products.value.length > 0) {
      console.log('⏱️ 完全リセット後にカウントダウンを開始します');
      startCountdown();
    }
  } catch (error) {
    console.error('完全リセット後の商品データ取得に失敗:', error);
    errorMessage.value = '商品データの再取得に失敗しました';
  }
  
  // 3秒後にメッセージをクリア
  setTimeout(() => {
    successMessage.value = '';
  }, 3000);
};

// 商品データの変更を監視
watch(products, (newProducts) => {
  if (newProducts.length > 0) {
    // 入札金額と入札者名の初期化を確実に実行
    newProducts.forEach(product => {
      if (!bidAmounts.value[product.id]) {
        bidAmounts.value[product.id] = product.currentPrice + 1000;
      }
      if (!bidderNames.value[product.id]) {
        bidderNames.value[product.id] = '';
      }
    });
    
    if (!auctionStarted.value) {
      auctionStarted.value = true;
      console.log('🎉 オークションが開始されました！');
      startCountdown();
    } else if (!countdownInterval.value) {
      // オークションが開始済みだがカウントダウンが停止している場合は再開始
      console.log('🔄 カウントダウンが停止しているため再開始します');
      startCountdown();
    }
  }
}, { deep: true });

// WebSocket接続と購読
const setupWebSocket = async () => {
  try {
    await wsService.connect();
    
    // 全体のオークション更新を購読
    wsService.subscribeToAuctions((updatedProducts: Product[]) => {
      products.value = updatedProducts;
    });
    
    // 各商品の個別更新を購読
    products.value.forEach(product => {
      wsService.subscribeToProduct(product.id, (updatedProduct: Product) => {
        const index = products.value.findIndex(p => p.id === product.id);
        if (index !== -1) {
          products.value[index] = updatedProduct;
        }
      });
    });
    
  } catch (error) {
    console.error('WebSocket setup failed:', error);
  }
};

// コンポーネントマウント時
onMounted(async () => {
  // まずローカルストレージからデータを読み込み
  loadFromStorage();
  
  // 商品データが保存されていない場合は新しく取得
  if (products.value.length === 0) {
    await fetchProducts();
  } else {
    // 保存されたデータがある場合はオークション開始フラグを設定
    auctionStarted.value = true;
    loading.value = false;
  }
  
  await setupWebSocket();
  
  // カウントダウンを開始
  if (products.value.length > 0) {
    startCountdown();
  }
});

// コンポーネントアンマウント時
onUnmounted(() => {
  wsService.disconnect();
  stopCountdown();
});
</script>
