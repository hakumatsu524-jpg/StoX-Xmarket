import { NextResponse } from "next/server"
import { X402Client } from "@/lib/x402-client"
import { getItemById } from "@/lib/marketplace-data"

export async function POST(request: Request) {
  try {
    const { itemId } = await request.json()

    const item = getItemById(itemId)
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 })
    }

    const x402Client = new X402Client()
    const paymentRequest = x402Client.createPaymentRequest({
      amount: item.price,
      currency: item.currency,
      network: item.network,
      recipient: item.seller,
      description: `Purchase: ${item.name}`,
    })

    // Return 402 Payment Required with payment instructions
    return new NextResponse(
      JSON.stringify({
        message: "Payment Required",
        paymentRequest: JSON.parse(paymentRequest),
        item: item,
      }),
      {
        status: 402,
        headers: {
          "Content-Type": "application/json",
          "X-Payment-Required": "x402",
        },
      },
    )
  } catch (error) {
    console.error("Payment initiation error:", error)
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 })
  }
}
