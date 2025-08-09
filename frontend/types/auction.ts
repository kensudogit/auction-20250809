export interface Product {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  minPrice: number;
  endTime: string;
  imageUrl: string;
  status: 'ACTIVE' | 'ENDED' | 'CANCELLED';
  timeRemaining: number;
  bidCount: number;
  highestBidder: string;
}

export interface Bid {
  id: number;
  productId: number;
  bidderName: string;
  amount: number;
  bidTime: string;
}

export interface BidRequest {
  productId: number;
  bidderName: string;
  amount: number;
}
