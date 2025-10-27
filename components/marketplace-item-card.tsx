"use client"

import type { MarketplaceItem } from "@/lib/x402-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface MarketplaceItemCardProps {
  item: MarketplaceItem
  onPurchase: (item: MarketplaceItem) => void
}

export function MarketplaceItemCard({ item, onPurchase }: MarketplaceItemCardProps) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="pb-4">
        {item.imageUrl && (
          <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-muted">
            <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
          </div>
        )}
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{item.name}</CardTitle>
          <Badge variant="secondary">{item.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">${item.price}</span>
            <span className="text-sm text-muted-foreground">{item.currency}</span>
          </div>
          <div className="text-xs text-muted-foreground">Network: {item.network}</div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => onPurchase(item)} className="w-full" size="lg">
          Purchase with x402
        </Button>
      </CardFooter>
    </Card>
  )
}
