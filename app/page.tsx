"use client"

import { useState, useEffect } from "react"
import type { MarketplaceItem } from "@/lib/x402-types"
import { MarketplaceItemCard } from "@/components/marketplace-item-card"
import { PaymentModal } from "@/components/payment-modal"
import { InventoryPanel } from "@/components/inventory-panel"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Wallet, Store, Package } from "lucide-react"
import Image from "next/image"

export default function Home() {
  const [items, setItems] = useState<MarketplaceItem[]>([])
  const [filteredItems, setFilteredItems] = useState<MarketplaceItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    fetchItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [items, searchQuery, selectedCategory])

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/items")
      const data = await response.json()
      setItems(data)
      setFilteredItems(data)
    } catch (error) {
      console.error("Failed to fetch items:", error)
    }
  }

  const filterItems = () => {
    let filtered = items

    if (selectedCategory !== "all") {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredItems(filtered)
  }

  const handlePurchase = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setIsPaymentModalOpen(true)
  }

  const handleConnectWallet = () => {
    // Simulate wallet connection
    const mockAddress = "0x" + Math.random().toString(16).substring(2, 42)
    setWalletAddress(mockAddress)
    setIsConnected(true)
  }

  const categories = ["all", ...Array.from(new Set(items.map((item) => item.category)))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="Core402" width={48} height={48} className="rounded-lg" />
              <div>
                <h1 className="text-3xl font-bold">core402</h1>
                <p className="text-sm text-muted-foreground mt-1">Decentralized P2P marketplace powered by x402</p>
              </div>
            </div>
            <Button variant={isConnected ? "outline" : "default"} size="lg" onClick={handleConnectWallet}>
              <Wallet className="mr-2 h-4 w-4" />
              {isConnected ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "Connect Wallet"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="marketplace" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="marketplace" className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              Marketplace
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2" disabled={!isConnected}>
              <Package className="h-4 w-4" />
              My Inventory
            </TabsTrigger>
          </TabsList>

          <TabsContent value="marketplace" className="space-y-6">
            {/* Search and Filters */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Items Grid */}
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <MarketplaceItemCard key={item.id} item={item} onPurchase={handlePurchase} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="inventory">
            {isConnected ? (
              <InventoryPanel userId={walletAddress} />
            ) : (
              <div className="text-center py-12">
                <Wallet className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Connect your wallet to view your inventory</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <p>Built with x402 protocol • USDC payments on Base • Peer-to-peer trading</p>
            </div>
            <div className="flex gap-4 text-sm">
              <a href="https://x402.org" target="_blank" rel="noopener noreferrer" className="hover:underline">
                About x402
              </a>
              <a href="https://github.com" className="hover:underline">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Payment Modal */}
      <PaymentModal item={selectedItem} isOpen={isPaymentModalOpen} onClose={() => setIsPaymentModalOpen(false)} />
    </div>
  )
}
