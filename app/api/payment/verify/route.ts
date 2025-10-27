import { NextResponse } from "next/server"
import { X402Client } from "@/lib/x402-client"

export async function POST(request: Request) {
  try {
    const { transactionHash, network, itemId } = await request.json()

    if (!transactionHash || !network) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const x402Client = new X402Client()
    const isValid = await x402Client.verifyPayment(transactionHash, network)

    if (isValid) {
      // In production, grant access to the purchased item here
      // Store the purchase record in a database
      return NextResponse.json({
        success: true,
        message: "Payment verified successfully",
        itemId,
        transactionHash,
      })
    } else {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Failed to verify payment" }, { status: 500 })
  }
}
