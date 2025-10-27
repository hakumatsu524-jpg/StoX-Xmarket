import type { MarketplaceItem, UserListing, UserInventory } from "./x402-types"

// In-memory storage for demo purposes
// In production, use a database
export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    name: "Premium API Access",
    description: "Get access to our premium API endpoints with higher rate limits",
    price: "10.00",
    currency: "USDC",
    network: "base-mainnet",
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    category: "API",
    imageUrl: "/api-access-dashboard.jpg",
    listedForSale: true,
    listedAt: Date.now(),
  },
  {
    id: "2",
    name: "AI Model Training Data",
    description: "Curated dataset for training machine learning models",
    price: "25.00",
    currency: "USDC",
    network: "base-mainnet",
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    category: "Data",
    imageUrl: "/ai-neural-network-data.jpg",
    listedForSale: true,
    listedAt: Date.now(),
  },
  {
    id: "3",
    name: "Cloud Storage - 100GB",
    description: "Decentralized cloud storage for your files",
    price: "5.00",
    currency: "USDC",
    network: "base-mainnet",
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    category: "Storage",
    imageUrl: "/cloud-storage-servers.jpg",
    listedForSale: true,
    listedAt: Date.now(),
  },
  {
    id: "4",
    name: "Analytics Dashboard",
    description: "Real-time analytics and insights for your business",
    price: "15.00",
    currency: "USDC",
    network: "base-mainnet",
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    category: "Tools",
    imageUrl: "/analytics-dashboard.png",
    listedForSale: true,
    listedAt: Date.now(),
  },
  {
    id: "5",
    name: "NFT Minting Service",
    description: "Mint your NFTs with our easy-to-use service",
    price: "2.00",
    currency: "USDC",
    network: "base-mainnet",
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    category: "NFT",
    imageUrl: "/nft-digital-art.png",
    listedForSale: true,
    listedAt: Date.now(),
  },
  {
    id: "6",
    name: "Smart Contract Audit",
    description: "Professional security audit for your smart contracts",
    price: "100.00",
    currency: "USDC",
    network: "base-mainnet",
    seller: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    category: "Services",
    imageUrl: "/smart-contract-code-security.jpg",
    listedForSale: true,
    listedAt: Date.now(),
  },
]

export const userInventories: Map<string, UserInventory> = new Map()

export const userListings: UserListing[] = []

export function getItemById(id: string): MarketplaceItem | undefined {
  return marketplaceItems.find((item) => item.id === id)
}

export function getItemsByCategory(category: string): MarketplaceItem[] {
  return marketplaceItems.filter((item) => item.category === category)
}

export function getAllCategories(): string[] {
  return Array.from(new Set(marketplaceItems.map((item) => item.category)))
}

export function getUserInventory(userId: string): MarketplaceItem[] {
  const inventory = userInventories.get(userId)
  return inventory?.items || []
}

export function addItemToInventory(userId: string, item: MarketplaceItem) {
  const inventory = userInventories.get(userId) || { userId, items: [] }
  inventory.items.push(item)
  userInventories.set(userId, inventory)
}

export function removeItemFromInventory(userId: string, itemId: string) {
  const inventory = userInventories.get(userId)
  if (inventory) {
    inventory.items = inventory.items.filter((item) => item.id !== itemId)
    userInventories.set(userId, inventory)
  }
}

export function listItemForSale(userId: string, itemId: string, price: string) {
  const inventory = getUserInventory(userId)
  const item = inventory.find((i) => i.id === itemId)

  if (item) {
    const listing: UserListing = {
      itemId,
      sellerId: userId,
      price,
      currency: "USDC",
      network: "base-mainnet",
      listedAt: Date.now(),
    }
    userListings.push(listing)

    // Update item in marketplace
    const updatedItem = { ...item, price, listedForSale: true, seller: userId }
    marketplaceItems.push(updatedItem)
  }
}

export function getUserListings(userId: string): UserListing[] {
  return userListings.filter((listing) => listing.sellerId === userId)
}
