import { NextResponse } from "next/server"
import { getUserInventory } from "@/lib/marketplace-data"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 })
  }

  const inventory = getUserInventory(userId)
  return NextResponse.json(inventory)
}
