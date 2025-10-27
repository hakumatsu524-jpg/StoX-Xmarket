import { NextResponse } from "next/server"
import { marketplaceItems } from "@/lib/marketplace-data"

export async function GET() {
  return NextResponse.json(marketplaceItems)
}
