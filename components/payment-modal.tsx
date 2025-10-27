"use client"

import { useState } from "react"
import type { MarketplaceItem } from "@/lib/x402-types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, XCircle } from "lucide-react"

interface PaymentModalProps {
  item: MarketplaceItem | null
  isOpen: boolean
  onClose: () => void
}

export function PaymentModal({ item, isOpen, onClose }: PaymentModalProps) {
  const [walletAddress, setWalletAddress] = useState("")
  const [transactionHash, setTransactionHash] = useState("")
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handlePayment = async () => {
    if (!item || !walletAddress) return

    setStatus("processing")
    setErrorMessage("")

    try {
      // Step 1: Initiate payment
      const initiateResponse = await fetch("/api/payment/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId: item.id }),
      })

      if (initiateResponse.status !== 402) {
        throw new Error("Failed to initiate payment")
      }

      const paymentData = await initiateResponse.json()

      // In a real implementation, this would trigger a wallet transaction
      // For demo purposes, we'll simulate a transaction hash
      const simulatedTxHash = `0x${Math.random().toString(16).substring(2)}${Math.random().toString(16).substring(2)}`
      setTransactionHash(simulatedTxHash)

      // Step 2: Verify payment
      const verifyResponse = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionHash: simulatedTxHash,
          network: item.network,
          itemId: item.id,
        }),
      })

      if (!verifyResponse.ok) {
        throw new Error("Payment verification failed")
      }

      setStatus("success")
    } catch (error) {
      console.error("Payment error:", error)
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Payment failed")
    }
  }

  const handleClose = () => {
    setWalletAddress("")
    setTransactionHash("")
    setStatus("idle")
    setErrorMessage("")
    onClose()
  }

  if (!item) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Purchase</DialogTitle>
          <DialogDescription>Pay with USDC using the x402 protocol</DialogDescription>
        </DialogHeader>

        {status === "idle" && (
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <h4 className="font-medium">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>

            <div className="flex items-baseline gap-2 p-4 bg-muted rounded-lg">
              <span className="text-2xl font-bold">${item.price}</span>
              <span className="text-sm text-muted-foreground">{item.currency}</span>
            </div>

            <div className="space-y-2">
              <Label htmlFor="wallet">Your Wallet Address</Label>
              <Input
                id="wallet"
                placeholder="0x..."
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Network: {item.network}</p>
            </div>
          </div>
        )}

        {status === "processing" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <Spinner className="h-12 w-12" />
            <p className="text-sm text-muted-foreground">Processing payment...</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <div className="text-center space-y-2">
              <p className="font-medium">Payment Successful!</p>
              <p className="text-sm text-muted-foreground">Transaction: {transactionHash.substring(0, 10)}...</p>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <XCircle className="h-12 w-12 text-red-500" />
            <div className="text-center space-y-2">
              <p className="font-medium">Payment Failed</p>
              <p className="text-sm text-muted-foreground">{errorMessage}</p>
            </div>
          </div>
        )}

        <DialogFooter>
          {status === "idle" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handlePayment} disabled={!walletAddress}>
                Pay ${item.price}
              </Button>
            </>
          )}
          {(status === "success" || status === "error") && (
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
