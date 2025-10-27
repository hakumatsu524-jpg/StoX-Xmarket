"use client"

import { useState, useEffect } from "react"
import type { MarketplaceItem } from "@/lib/x402-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Package, DollarSign } from "lucide-react"
import Image from "next/image"

interface InventoryPanelProps {
  userId: string
}

export function InventoryPanel({ userId }: InventoryPanelProps) {
  const [inventory, setInventory] = useState<MarketplaceItem[]>([])
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)
  const [listPrice, setListPrice] = useState("")
  const [isListDialogOpen, setIsListDialogOpen] = useState(false)

  useEffect(() => {
    if (userId) {
      fetchInventory()
    }
  }, [userId])

  const fetchInventory = async () => {
    try {
      const response = await fetch(`/api/inventory?userId=${userId}`)
      const data = await response.json()
      setInventory(data)
    } catch (error) {
      console.error("Failed to fetch inventory:", error)
    }
  }

  const handleListItem = (item: MarketplaceItem) => {
    setSelectedItem(item)
    setListPrice(item.price)
    setIsListDialogOpen(true)
  }

  const confirmListing = async () => {
    if (!selectedItem || !listPrice) return

    try {
      const response = await fetch("/api/inventory/list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          itemId: selectedItem.id,
          price: listPrice,
        }),
      })

      if (response.ok) {
        setIsListDialogOpen(false)
        fetchInventory()
      }
    } catch (error) {
      console.error("Failed to list item:", error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6" />
        <h2 className="text-2xl font-bold">My Inventory</h2>
      </div>

      {inventory.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">Your inventory is empty</p>
            <p className="text-sm text-muted-foreground mt-2">Purchase items from the marketplace to get started</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {inventory.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-4">
                {item.imageUrl && (
                  <div className="relative w-full h-32 mb-3 rounded-lg overflow-hidden bg-muted">
                    <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <CardDescription className="text-sm line-clamp-2">{item.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleListItem(item)} className="w-full" variant="outline">
                  <DollarSign className="mr-2 h-4 w-4" />
                  List for Sale
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isListDialogOpen} onOpenChange={setIsListDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>List Item for Sale</DialogTitle>
            <DialogDescription>Set a price for your item in USDC</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USDC)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsListDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmListing}>List Item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
