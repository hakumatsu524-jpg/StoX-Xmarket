import { NextResponse } from "next/server"
import { listItemForSale } from "@/lib/marketplace-data"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, itemId, price } = body

    if (!userId || !itemId || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    listItemForSale(userId, itemId, price)

    return NextResponse.json({ success: true, message: "Item listed for sale" })
  } catch (error) {
    console.error("Error listing item:", error)
    return NextResponse.json({ error: "Failed to list item" }, { status: 500 })
  }
}
