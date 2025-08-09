import type { Product } from '~/types/auction';

export class WebSocketService {
  private stompClient: any = null;
  private isConnected = false;
  private subscriptions: Map<string, any> = new Map();

  // WebSocket接続を確立
  async connect(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // 動的インポートでSockJSとStompを読み込み
        const SockJS = (await import('sockjs-client')).default;
        const { Stomp } = await import('webstomp-client');
        
        const socket = new SockJS('http://localhost:8080/ws');
        this.stompClient = Stomp.over(socket);

        this.stompClient.connect(
          {},
          () => {
            this.isConnected = true;
            console.log('WebSocket connected');
            resolve();
          },
          (error: any) => {
            console.error('WebSocket connection failed:', error);
            reject(error);
          }
        );
      } catch (error) {
        console.error('Failed to load WebSocket libraries:', error);
        reject(error);
      }
    });
  }

  // 接続を切断
  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect();
      this.isConnected = false;
      this.subscriptions.clear();
      console.log('WebSocket disconnected');
    }
  }

  // 特定の商品の更新を購読
  subscribeToProduct(productId: number, callback: (product: Product) => void): void {
    if (!this.isConnected) {
      console.error('WebSocket not connected');
      return;
    }

    const topic = `/topic/product/${productId}`;
    const subscription = this.stompClient.subscribe(topic, (message: any) => {
      try {
        const product: Product = JSON.parse(message.body);
        callback(product);
      } catch (error) {
        console.error('Failed to parse product message:', error);
      }
    });

    this.subscriptions.set(topic, subscription);
  }

  // 全体のオークション更新を購読
  subscribeToAuctions(callback: (products: Product[]) => void): void {
    if (!this.isConnected) {
      console.error('WebSocket not connected');
      return;
    }

    const topic = '/topic/auctions';
    const subscription = this.stompClient.subscribe(topic, (message: any) => {
      try {
        const products: Product[] = JSON.parse(message.body);
        callback(products);
      } catch (error) {
        console.error('Failed to parse auctions message:', error);
      }
    });

    this.subscriptions.set(topic, subscription);
  }

  // 購読を解除
  unsubscribe(topic: string): void {
    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(topic);
    }
  }

  // 接続状態を取得
  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}
