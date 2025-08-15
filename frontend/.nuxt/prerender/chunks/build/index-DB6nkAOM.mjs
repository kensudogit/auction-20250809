import { defineComponent, ref, computed, watch, mergeProps, useSSRContext } from 'file://C:/dev2508/auction/frontend/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'file://C:/dev2508/auction/frontend/node_modules/vue/server-renderer/index.mjs';

[
  {
    id: 1,
    name: "\u9AD8\u7D1A\u8155\u6642\u8A08",
    description: "\u30B9\u30A4\u30B9\u88FD\u306E\u9AD8\u7D1A\u6A5F\u68B0\u5F0F\u8155\u6642\u8A08",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 60 * 60 * 1e3).toISOString(),
    // 60分後
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3600,
    bidCount: 5,
    highestBidder: "\u7530\u4E2D\u592A\u90CE"
  },
  {
    id: 2,
    name: "\u30A2\u30F3\u30C6\u30A3\u30FC\u30AF\u82B1\u74F6",
    description: "\u6C5F\u6238\u6642\u4EE3\u306E\u6709\u7530\u713C\u82B1\u74F6",
    currentPrice: 25e3,
    minPrice: 15e3,
    endTime: new Date(Date.now() + 55 * 60 * 1e3).toISOString(),
    // 55分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3300,
    bidCount: 3,
    highestBidder: "\u4F50\u85E4\u82B1\u5B50"
  },
  {
    id: 3,
    name: "\u7D75\u753B\u4F5C\u54C1",
    description: "\u5370\u8C61\u6D3E\u753B\u5BB6\u306B\u3088\u308B\u6CB9\u7D75",
    currentPrice: 8e4,
    minPrice: 5e4,
    endTime: new Date(Date.now() + 50 * 60 * 1e3).toISOString(),
    // 50分後
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3e3,
    bidCount: 8,
    highestBidder: "\u5C71\u7530\u6B21\u90CE"
  },
  {
    id: 4,
    name: "\u5B9D\u77F3\u30CD\u30C3\u30AF\u30EC\u30B9",
    description: "\u30C0\u30A4\u30E4\u30E2\u30F3\u30C9\u3068\u30B5\u30D5\u30A1\u30A4\u30A2\u306E\u30CD\u30C3\u30AF\u30EC\u30B9",
    currentPrice: 12e4,
    minPrice: 8e4,
    endTime: new Date(Date.now() + 45 * 60 * 1e3).toISOString(),
    // 45分後
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2700,
    bidCount: 12,
    highestBidder: "\u9234\u6728\u7F8E\u54B2"
  },
  {
    id: 5,
    name: "\u53E4\u66F8",
    description: "\u660E\u6CBB\u6642\u4EE3\u306E\u521D\u7248\u672C",
    currentPrice: 35e3,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 40 * 60 * 1e3).toISOString(),
    // 40分後
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2400,
    bidCount: 6,
    highestBidder: "\u9AD8\u6A4B\u4E00\u90CE"
  },
  {
    id: 6,
    name: "\u9676\u5668\u30BB\u30C3\u30C8",
    description: "\u7F8E\u6FC3\u713C\u306E\u8336\u5668\u30BB\u30C3\u30C8",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 35 * 60 * 1e3).toISOString(),
    // 35分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2100,
    bidCount: 4,
    highestBidder: "\u4F0A\u85E4\u96C5\u5B50"
  },
  {
    id: 7,
    name: "\u9280\u98DF\u5668",
    description: "19\u4E16\u7D00\u306E\u9280\u88FD\u30AB\u30C8\u30E9\u30EA\u30FC",
    currentPrice: 45e3,
    minPrice: 3e4,
    endTime: new Date(Date.now() + 30 * 60 * 1e3).toISOString(),
    // 30分後
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1800,
    bidCount: 7,
    highestBidder: "\u6E21\u8FBA\u5065\u592A"
  },
  {
    id: 8,
    name: "\u5F6B\u523B\u4F5C\u54C1",
    description: "\u30D6\u30ED\u30F3\u30BA\u88FD\u306E\u5F6B\u523B\u4F5C\u54C1",
    currentPrice: 65e3,
    minPrice: 4e4,
    endTime: new Date(Date.now() + 25 * 60 * 1e3).toISOString(),
    // 25分後
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1500,
    bidCount: 9,
    highestBidder: "\u4E2D\u6751\u771F\u7406"
  },
  {
    id: 9,
    name: "\u9AA8\u8463\u54C1",
    description: "\u4E2D\u56FD\u660E\u4EE3\u306E\u9752\u82B1\u78C1\u5668",
    currentPrice: 95e3,
    minPrice: 6e4,
    endTime: new Date(Date.now() + 20 * 60 * 1e3).toISOString(),
    // 20分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1200,
    bidCount: 11,
    highestBidder: "\u5C0F\u6797\u6B63\u7537"
  },
  {
    id: 10,
    name: "\u771F\u73E0\u30CD\u30C3\u30AF\u30EC\u30B9",
    description: "\u5929\u7136\u771F\u73E0\u306E\u30CD\u30C3\u30AF\u30EC\u30B9",
    currentPrice: 75e3,
    minPrice: 5e4,
    endTime: new Date(Date.now() + 18 * 60 * 1e3).toISOString(),
    // 18分後
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1080,
    bidCount: 8,
    highestBidder: "\u4F50\u3005\u6728\u6075\u5B50"
  },
  {
    id: 11,
    name: "\u30A2\u30F3\u30C6\u30A3\u30FC\u30AF\u5BB6\u5177",
    description: "\u660E\u6CBB\u6642\u4EE3\u306E\u6850\u7BAA\u7B25",
    currentPrice: 85e3,
    minPrice: 6e4,
    endTime: new Date(Date.now() + 16 * 60 * 1e3).toISOString(),
    // 16分後
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 960,
    bidCount: 6,
    highestBidder: "\u7530\u6751\u5065\u4E00"
  },
  {
    id: 12,
    name: "\u53E4\u92AD\u30B3\u30EC\u30AF\u30B7\u30E7\u30F3",
    description: "\u6C5F\u6238\u6642\u4EE3\u306E\u53E4\u92AD\u30BB\u30C3\u30C8",
    currentPrice: 55e3,
    minPrice: 35e3,
    endTime: new Date(Date.now() + 14 * 60 * 1e3).toISOString(),
    // 14分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 840,
    bidCount: 10,
    highestBidder: "\u4E95\u4E0A\u535A\u6587"
  },
  {
    id: 13,
    name: "\u66F8\u9053\u4F5C\u54C1",
    description: "\u6709\u540D\u66F8\u9053\u5BB6\u306E\u4F5C\u54C1",
    currentPrice: 4e4,
    minPrice: 25e3,
    endTime: new Date(Date.now() + 12 * 60 * 1e3).toISOString(),
    // 12分後
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 720,
    bidCount: 7,
    highestBidder: "\u677E\u672C\u7F8E\u54B2"
  },
  {
    id: 14,
    name: "\u6F06\u5668\u30BB\u30C3\u30C8",
    description: "\u8F2A\u5CF6\u5857\u306E\u6F06\u5668\u30BB\u30C3\u30C8",
    currentPrice: 3e4,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 10 * 60 * 1e3).toISOString(),
    // 10分後
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 600,
    bidCount: 5,
    highestBidder: "\u5C71\u672C\u592A\u90CE"
  },
  {
    id: 15,
    name: "\u5200\u5263",
    description: "\u65E5\u672C\u5200\u306E\u540D\u5200",
    currentPrice: 15e4,
    minPrice: 1e5,
    endTime: new Date(Date.now() + 8 * 60 * 1e3).toISOString(),
    // 8分後
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 480,
    bidCount: 15,
    highestBidder: "\u6B66\u7530\u4FE1\u7384"
  },
  {
    id: 16,
    name: "\u4ECF\u50CF",
    description: "\u5E73\u5B89\u6642\u4EE3\u306E\u4ECF\u50CF",
    currentPrice: 2e5,
    minPrice: 15e4,
    endTime: new Date(Date.now() + 6 * 60 * 1e3).toISOString(),
    // 6分後
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 360,
    bidCount: 20,
    highestBidder: "\u7E54\u7530\u4FE1\u9577"
  },
  // 追加の商品データ（17-50）
  {
    id: 17,
    name: "\u639B\u3051\u8EF8",
    description: "\u6C5F\u6238\u6642\u4EE3\u306E\u5C71\u6C34\u753B",
    currentPrice: 45e3,
    minPrice: 3e4,
    endTime: new Date(Date.now() + 5 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 300,
    bidCount: 8,
    highestBidder: "\u5FB3\u5DDD\u5BB6\u5EB7"
  },
  {
    id: 18,
    name: "\u8336\u5668",
    description: "\u697D\u713C\u306E\u8336\u5668",
    currentPrice: 35e3,
    minPrice: 25e3,
    endTime: new Date(Date.now() + 4 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 240,
    bidCount: 6,
    highestBidder: "\u5343\u5229\u4F11"
  },
  {
    id: 19,
    name: "\u9999\u7089",
    description: "\u9752\u9285\u88FD\u306E\u9999\u7089",
    currentPrice: 28e3,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 3 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 180,
    bidCount: 5,
    highestBidder: "\u660E\u667A\u5149\u79C0"
  },
  {
    id: 20,
    name: "\u5C4F\u98A8",
    description: "\u516D\u66F2\u5C4F\u98A8",
    currentPrice: 12e4,
    minPrice: 8e4,
    endTime: new Date(Date.now() + 2 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 120,
    bidCount: 12,
    highestBidder: "\u8C4A\u81E3\u79C0\u5409"
  },
  {
    id: 21,
    name: "\u93E1",
    description: "\u6C5F\u6238\u6642\u4EE3\u306E\u93E1",
    currentPrice: 22e3,
    minPrice: 15e3,
    endTime: new Date(Date.now() + 1 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 60,
    bidCount: 4,
    highestBidder: "\u5317\u6761\u6C0F\u5EB7"
  },
  {
    id: 22,
    name: "\u6ADB",
    description: "\u8C61\u7259\u88FD\u306E\u6ADB",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 55 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3300,
    bidCount: 3,
    highestBidder: "\u4ECA\u5DDD\u7FA9\u5143"
  },
  {
    id: 23,
    name: "\u7C2A",
    description: "\u73CA\u745A\u306E\u7C2A",
    currentPrice: 32e3,
    minPrice: 25e3,
    endTime: new Date(Date.now() + 50 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3e3,
    bidCount: 7,
    highestBidder: "\u6B66\u7530\u4FE1\u7384"
  },
  {
    id: 24,
    name: "\u5E2F\u7559\u3081",
    description: "\u91D1\u5DE5\u306E\u5E2F\u7559\u3081",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 45 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2700,
    bidCount: 5,
    highestBidder: "\u4E0A\u6749\u8B19\u4FE1"
  },
  {
    id: 25,
    name: "\u5370\u7C60",
    description: "\u8494\u7D75\u306E\u5370\u7C60",
    currentPrice: 38e3,
    minPrice: 28e3,
    endTime: new Date(Date.now() + 40 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2400,
    bidCount: 9,
    highestBidder: "\u6BDB\u5229\u5143\u5C31"
  },
  {
    id: 26,
    name: "\u6839\u4ED8",
    description: "\u8C61\u7259\u306E\u6839\u4ED8",
    currentPrice: 12e3,
    minPrice: 8e3,
    endTime: new Date(Date.now() + 35 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2100,
    bidCount: 6,
    highestBidder: "\u5CF6\u6D25\u7FA9\u5F18"
  },
  {
    id: 27,
    name: "\u7159\u7BA1",
    description: "\u9280\u88FD\u306E\u7159\u7BA1",
    currentPrice: 8500,
    minPrice: 6e3,
    endTime: new Date(Date.now() + 30 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1800,
    bidCount: 4,
    highestBidder: "\u9577\u5B97\u6211\u90E8\u5143\u89AA"
  },
  {
    id: 28,
    name: "\u786F",
    description: "\u7AEF\u6E13\u306E\u786F",
    currentPrice: 42e3,
    minPrice: 32e3,
    endTime: new Date(Date.now() + 25 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1500,
    bidCount: 11,
    highestBidder: "\u4F0A\u9054\u653F\u5B97"
  },
  {
    id: 29,
    name: "\u7B46",
    description: "\u9F08\u7532\u306E\u7B46",
    currentPrice: 28e3,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 20 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1200,
    bidCount: 8,
    highestBidder: "\u771F\u7530\u5E78\u6751"
  },
  {
    id: 30,
    name: "\u58A8",
    description: "\u53E4\u58A8",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 15 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 900,
    bidCount: 5,
    highestBidder: "\u77F3\u7530\u4E09\u6210"
  },
  {
    id: 31,
    name: "\u548C\u7D19",
    description: "\u8D8A\u524D\u548C\u7D19",
    currentPrice: 8e3,
    minPrice: 5e3,
    endTime: new Date(Date.now() + 10 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 600,
    bidCount: 3,
    highestBidder: "\u5927\u8C37\u5409\u7D99"
  },
  {
    id: 32,
    name: "\u6247\u5B50",
    description: "\u91D1\u7B94\u306E\u6247\u5B50",
    currentPrice: 22e3,
    minPrice: 15e3,
    endTime: new Date(Date.now() + 8 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 480,
    bidCount: 7,
    highestBidder: "\u5C0F\u65E9\u5DDD\u79C0\u79CB"
  },
  {
    id: 33,
    name: "\u63D0\u706F",
    description: "\u30AC\u30E9\u30B9\u88FD\u306E\u63D0\u706F",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 6 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 360,
    bidCount: 4,
    highestBidder: "\u798F\u5CF6\u6B63\u5247"
  },
  {
    id: 34,
    name: "\u98A8\u9234",
    description: "\u6C5F\u6238\u98A8\u9234",
    currentPrice: 12e3,
    minPrice: 8e3,
    endTime: new Date(Date.now() + 4 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 240,
    bidCount: 6,
    highestBidder: "\u52A0\u85E4\u6E05\u6B63"
  },
  {
    id: 35,
    name: "\u7F6E\u7269",
    description: "\u9676\u5668\u306E\u7F6E\u7269",
    currentPrice: 25e3,
    minPrice: 18e3,
    endTime: new Date(Date.now() + 2 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 120,
    bidCount: 9,
    highestBidder: "\u9ED2\u7530\u9577\u653F"
  },
  {
    id: 36,
    name: "\u82B1\u74F6",
    description: "\u4E5D\u8C37\u713C\u306E\u82B1\u74F6",
    currentPrice: 35e3,
    minPrice: 25e3,
    endTime: new Date(Date.now() + 58 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3480,
    bidCount: 8,
    highestBidder: "\u7D30\u5DDD\u5FE0\u8208"
  },
  {
    id: 37,
    name: "\u76BF",
    description: "\u6709\u7530\u713C\u306E\u76BF",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 56 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3360,
    bidCount: 5,
    highestBidder: "\u6C60\u7530\u8F1D\u653F"
  },
  {
    id: 38,
    name: "\u7897",
    description: "\u7F8E\u6FC3\u713C\u306E\u7897",
    currentPrice: 12e3,
    minPrice: 8e3,
    endTime: new Date(Date.now() + 54 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3240,
    bidCount: 4,
    highestBidder: "\u6D45\u91CE\u5E78\u9577"
  },
  {
    id: 39,
    name: "\u7BB8",
    description: "\u6F06\u5857\u308A\u306E\u7BB8",
    currentPrice: 8e3,
    minPrice: 5e3,
    endTime: new Date(Date.now() + 52 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3120,
    bidCount: 3,
    highestBidder: "\u8702\u9808\u8CC0\u5BB6\u653F"
  },
  {
    id: 40,
    name: "\u7BB8\u7F6E\u304D",
    description: "\u9280\u88FD\u306E\u7BB8\u7F6E\u304D",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 50 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 3e3,
    bidCount: 7,
    highestBidder: "\u5C71\u5185\u4E00\u8C4A"
  },
  {
    id: 41,
    name: "\u6E6F\u5451\u307F",
    description: "\u697D\u713C\u306E\u6E6F\u5451\u307F",
    currentPrice: 1e4,
    minPrice: 7e3,
    endTime: new Date(Date.now() + 48 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2880,
    bidCount: 5,
    highestBidder: "\u85E4\u5802\u9AD8\u864E"
  },
  {
    id: 42,
    name: "\u6025\u9808",
    description: "\u6025\u9808",
    currentPrice: 22e3,
    minPrice: 15e3,
    endTime: new Date(Date.now() + 46 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2760,
    bidCount: 8,
    highestBidder: "\u4E95\u4F0A\u76F4\u653F"
  },
  {
    id: 43,
    name: "\u8336\u6258",
    description: "\u8336\u6258",
    currentPrice: 15e3,
    minPrice: 1e4,
    endTime: new Date(Date.now() + 44 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2640,
    bidCount: 6,
    highestBidder: "\u672C\u591A\u5FE0\u52DD"
  },
  {
    id: 44,
    name: "\u8336\u7B52",
    description: "\u8336\u7B52",
    currentPrice: 18e3,
    minPrice: 12e3,
    endTime: new Date(Date.now() + 42 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2520,
    bidCount: 7,
    highestBidder: "\u698A\u539F\u5EB7\u653F"
  },
  {
    id: 45,
    name: "\u8336\u7B45",
    description: "\u8336\u7B45",
    currentPrice: 12e3,
    minPrice: 8e3,
    endTime: new Date(Date.now() + 40 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2400,
    bidCount: 4,
    highestBidder: "\u9152\u4E95\u5FE0\u6B21"
  },
  {
    id: 46,
    name: "\u8336\u6753",
    description: "\u8336\u6753",
    currentPrice: 8e3,
    minPrice: 5e3,
    endTime: new Date(Date.now() + 38 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2280,
    bidCount: 3,
    highestBidder: "\u9CE5\u5C45\u5143\u5FE0"
  },
  {
    id: 47,
    name: "\u8336\u5DFE",
    description: "\u8336\u5DFE",
    currentPrice: 5e3,
    minPrice: 3e3,
    endTime: new Date(Date.now() + 36 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2160,
    bidCount: 2,
    highestBidder: "\u5927\u4E45\u4FDD\u5FE0\u4E16"
  },
  {
    id: 48,
    name: "\u8336\u91DC",
    description: "\u8336\u91DC",
    currentPrice: 45e3,
    minPrice: 3e4,
    endTime: new Date(Date.now() + 34 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 2040,
    bidCount: 12,
    highestBidder: "\u670D\u90E8\u6B63\u6210"
  },
  {
    id: 49,
    name: "\u8336\u7089",
    description: "\u8336\u7089",
    currentPrice: 28e3,
    minPrice: 2e4,
    endTime: new Date(Date.now() + 32 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1920,
    bidCount: 8,
    highestBidder: "\u67F3\u751F\u5B97\u77E9"
  },
  {
    id: 50,
    name: "\u8336\u5BA4",
    description: "\u8336\u5BA4",
    currentPrice: 15e4,
    minPrice: 1e5,
    endTime: new Date(Date.now() + 30 * 60 * 1e3).toISOString(),
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop&crop=center",
    status: "ACTIVE",
    timeRemaining: 1800,
    bidCount: 25,
    highestBidder: "\u5343\u5B97\u5BA4"
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
        console.log(`\u5546\u54C1\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093: ID ${productId}`);
        return fallbackImages[0];
      }
      if (imageErrors.value.has(productId)) {
        const fallbackImage2 = fallbackImages[productId % fallbackImages.length];
        console.log(`\u4EE3\u66FF\u753B\u50CF\u3092\u4F7F\u7528: \u5546\u54C1ID ${productId}, URL: ${fallbackImage2}`);
        return fallbackImage2;
      }
      const imageUrl = product.imageUrl;
      if (imageUrl && imageUrl.trim() !== "") {
        console.log(`\u5546\u54C1\u753B\u50CF\u3092\u4F7F\u7528: \u5546\u54C1ID ${productId}, URL: ${imageUrl}`);
        return imageUrl;
      }
      const fallbackImage = fallbackImages[productId % fallbackImages.length];
      console.log(`\u4EE3\u66FF\u753B\u50CF\u3092\u4F7F\u7528\uFF08imageUrl\u306A\u3057\uFF09: \u5546\u54C1ID ${productId}, URL: ${fallbackImage}`);
      return fallbackImage;
    };
    const getBidButtonText = (productId) => {
      if (biddingProducts.value.has(productId)) {
        return "\u5165\u672D\u4E2D...";
      }
      return "\u5165\u672D";
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
        console.log("\u{1F504} \u65E2\u5B58\u306E\u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u30BF\u30A4\u30DE\u30FC\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3057\u305F");
      }
      console.log("\u23F1\uFE0F \u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u3092\u958B\u59CB\u3057\u307E\u3059");
      countdownInterval.value = setInterval();
      console.log("\u2705 \u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u30BF\u30A4\u30DE\u30FC\u304C\u8A2D\u5B9A\u3055\u308C\u307E\u3057\u305F");
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
          console.log("\u{1F389} \u30AA\u30FC\u30AF\u30B7\u30E7\u30F3\u304C\u958B\u59CB\u3055\u308C\u307E\u3057\u305F\uFF01");
          startCountdown();
        } else if (!countdownInterval.value) {
          console.log("\u{1F504} \u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u304C\u505C\u6B62\u3057\u3066\u3044\u308B\u305F\u3081\u518D\u958B\u59CB\u3057\u307E\u3059");
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
        _push(`<div class="dropdown-section"><div class="${ssrRenderClass([{ "open": showDropdown.value }, "dropdown"])}"><button class="dropdown-toggle"> \u25BC \u30AA\u30FC\u30AF\u30B7\u30E7\u30F3\u6642\u9593\u8A2D\u5B9A </button><div class="dropdown-menu"><div class="dropdown-item"> \u{1F504} \u30AA\u30FC\u30AF\u30B7\u30E7\u30F3\u6642\u9593\u30EA\u30BB\u30C3\u30C8 </div><div class="dropdown-item"> \u23F0 \u500B\u5225\u6642\u9593\u8A2D\u5B9A </div><div class="dropdown-item danger"> \u{1F5D1}\uFE0F \u5B8C\u5168\u30EA\u30BB\u30C3\u30C8 </div></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showDropdown.value) {
        _push(`<div class="dropdown-overlay"></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showTimeModal.value) {
        _push(`<div class="modal-overlay"><div class="modal-content"><h3>\u5546\u54C1\u3054\u3068\u306E\u30AA\u30FC\u30AF\u30B7\u30E7\u30F3\u6642\u9593\u8A2D\u5B9A</h3><div class="time-settings"><!--[-->`);
        ssrRenderList(products.value, (product) => {
          _push(`<div class="time-setting-item"><div class="product-info"><span class="product-name-small">${ssrInterpolate(product.name)}</span><span class="current-time">\u73FE\u5728: ${ssrInterpolate(formatTime(getTimeRemaining(product)))}</span></div><div class="time-inputs"><select class="time-range-select"><option value=""${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "") : ssrLooseEqual(customTimes.value[product.id].timeRange, "")) ? " selected" : ""}>\u6642\u9593\u3092\u9078\u629E</option><option value="5"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "5") : ssrLooseEqual(customTimes.value[product.id].timeRange, "5")) ? " selected" : ""}>5\u5206</option><option value="10"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "10") : ssrLooseEqual(customTimes.value[product.id].timeRange, "10")) ? " selected" : ""}>10\u5206</option><option value="15"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "15") : ssrLooseEqual(customTimes.value[product.id].timeRange, "15")) ? " selected" : ""}>15\u5206</option><option value="20"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "20") : ssrLooseEqual(customTimes.value[product.id].timeRange, "20")) ? " selected" : ""}>20\u5206</option><option value="30"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "30") : ssrLooseEqual(customTimes.value[product.id].timeRange, "30")) ? " selected" : ""}>30\u5206</option><option value="45"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "45") : ssrLooseEqual(customTimes.value[product.id].timeRange, "45")) ? " selected" : ""}>45\u5206</option><option value="60"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "60") : ssrLooseEqual(customTimes.value[product.id].timeRange, "60")) ? " selected" : ""}>1\u6642\u9593</option><option value="90"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "90") : ssrLooseEqual(customTimes.value[product.id].timeRange, "90")) ? " selected" : ""}>1.5\u6642\u9593</option><option value="120"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "120") : ssrLooseEqual(customTimes.value[product.id].timeRange, "120")) ? " selected" : ""}>2\u6642\u9593</option><option value="180"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "180") : ssrLooseEqual(customTimes.value[product.id].timeRange, "180")) ? " selected" : ""}>3\u6642\u9593</option><option value="240"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "240") : ssrLooseEqual(customTimes.value[product.id].timeRange, "240")) ? " selected" : ""}>4\u6642\u9593</option><option value="300"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "300") : ssrLooseEqual(customTimes.value[product.id].timeRange, "300")) ? " selected" : ""}>5\u6642\u9593</option><option value="360"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "360") : ssrLooseEqual(customTimes.value[product.id].timeRange, "360")) ? " selected" : ""}>6\u6642\u9593</option><option value="480"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "480") : ssrLooseEqual(customTimes.value[product.id].timeRange, "480")) ? " selected" : ""}>8\u6642\u9593</option><option value="600"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "600") : ssrLooseEqual(customTimes.value[product.id].timeRange, "600")) ? " selected" : ""}>10\u6642\u9593</option><option value="720"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "720") : ssrLooseEqual(customTimes.value[product.id].timeRange, "720")) ? " selected" : ""}>12\u6642\u9593</option><option value="1440"${ssrIncludeBooleanAttr(Array.isArray(customTimes.value[product.id].timeRange) ? ssrLooseContain(customTimes.value[product.id].timeRange, "1440") : ssrLooseEqual(customTimes.value[product.id].timeRange, "1440")) ? " selected" : ""}>24\u6642\u9593</option></select></div></div>`);
        });
        _push(`<!--]--></div><div class="preset-times"><h4>\u30D7\u30EA\u30BB\u30C3\u30C8\u6642\u9593</h4><div class="preset-buttons"><button class="preset-button">15\u5206</button><button class="preset-button">30\u5206</button><button class="preset-button">45\u5206</button><button class="preset-button">1\u6642\u9593</button><button class="preset-button">1.5\u6642\u9593</button><button class="preset-button">2\u6642\u9593</button></div></div><div class="modal-actions"><button class="apply-button">\u9069\u7528</button><button class="cancel-button">\u30AD\u30E3\u30F3\u30BB\u30EB</button></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (!loading.value) {
        _push(`<div class="auction-grid"><!--[-->`);
        ssrRenderList(paginatedProducts.value, (product) => {
          _push(`<div class="${ssrRenderClass([{ ended: product.status === "ENDED" }, "product-card"])}"><div class="product-image-container"><img${ssrRenderAttr("src", getProductImage(product.id))}${ssrRenderAttr("alt", product.name)}${ssrRenderAttr("data-product-id", product.id)} class="product-image"></div><div class="${ssrRenderClass([product.status === "ACTIVE" ? "status-active" : "status-ended", "status-badge"])}">${ssrInterpolate(product.status === "ACTIVE" ? "\u9032\u884C\u4E2D" : "\u7D42\u4E86")}</div><h3 class="product-name">${ssrInterpolate(product.name)}</h3><p class="product-description">${ssrInterpolate(product.description)}</p><div class="${ssrRenderClass([{ "price-flash": flashingPrices.value.has(product.id) }, "product-price"])}"> \xA5${ssrInterpolate(formatPrice(product.currentPrice))}</div><div class="${ssrRenderClass([{ urgent: getTimeRemaining(product) <= 300 }, "countdown"])}">${ssrInterpolate(formatTime(getTimeRemaining(product)))}</div>`);
          if (product.status === "ACTIVE") {
            _push(`<div class="time-management"><button class="extend-button small"${ssrIncludeBooleanAttr(getTimeRemaining(product) >= 3600) ? " disabled" : ""}> +5\u5206 </button><button class="extend-button small"${ssrIncludeBooleanAttr(getTimeRemaining(product) >= 3600) ? " disabled" : ""}> +10\u5206 </button></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="bid-info"><span>\u5165\u672D\u6570: ${ssrInterpolate(product.bidCount)}</span><span>\u6700\u9AD8\u5165\u672D\u8005: ${ssrInterpolate(product.highestBidder)}</span></div>`);
          if (product.status === "ACTIVE" && getTimeRemaining(product) > 0) {
            _push(`<div class="bid-form"><input${ssrRenderAttr("value", bidAmounts.value[product.id])} type="number"${ssrRenderAttr("min", product.currentPrice + 1)}${ssrRenderAttr("step", 1)} placeholder="\u5165\u672D\u91D1\u984D" class="bid-input"><button${ssrIncludeBooleanAttr(!bidAmounts.value[product.id] || isBidding.value) ? " disabled" : ""} class="${ssrRenderClass([{
              bidding: biddingProducts.value.has(product.id),
              flash: flashingProducts.value.has(product.id)
            }, "bid-button"])}">${ssrInterpolate(getBidButtonText(product.id))}</button></div>`);
          } else {
            _push(`<!---->`);
          }
          if (product.status === "ACTIVE" && getTimeRemaining(product) > 0) {
            _push(`<div class="bid-form"><input${ssrRenderAttr("value", bidderNames.value[product.id])} type="text" placeholder="\u5165\u672D\u8005\u540D" class="bid-input"></div>`);
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
        _push(`<div class="pagination"><button${ssrIncludeBooleanAttr(currentPage.value === 1) ? " disabled" : ""} class="pagination-button"> \u524D\u3078 </button><div class="page-numbers"><!--[-->`);
        ssrRenderList(visiblePages.value, (page) => {
          _push(`<button class="${ssrRenderClass([{ active: page === currentPage.value }, "page-button"])}">${ssrInterpolate(page)}</button>`);
        });
        _push(`<!--]--></div><button${ssrIncludeBooleanAttr(currentPage.value === totalPages.value) ? " disabled" : ""} class="pagination-button"> \u6B21\u3078 </button></div>`);
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

export { _sfc_main as default };
