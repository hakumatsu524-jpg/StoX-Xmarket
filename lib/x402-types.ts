export interface X402PaymentRequest {
  amount: string
  currency: string
  network: string
  recipient: string
  description?: string
  facilitator?: string
}

export interface X402PaymentResponse {
  transactionHash: string
  amount: string
  sender: string
  timestamp: number
}

export interface MarketplaceItem {
  id: string
  name: string
  description: string
  price: string
  currency: string
  network: string
  seller: string
  imageUrl?: string
  category: string
  owner?: string
  listedForSale: boolean
  listedAt?: number
}

export interface PurchaseRecord {
  itemId: string
  buyer: string
  transactionHash: string
  timestamp: number
  amount: string
}

export interface UserListing {
  itemId: string
  sellerId: string
  price: string
  currency: string
  network: string
  listedAt: number
}

export interface TradeOffer {
  id: string
  fromUser: string
  toUser: string
  offeredItemId: string
  requestedItemId: string
  status: "pending" | "accepted" | "rejected"
  createdAt: number
}

export interface UserInventory {
  userId: string
  items: MarketplaceItem[]
}
