# core402 - x402 P2P Trading Marketplace

A fully decentralized peer-to-peer trading marketplace built with the x402 payment protocol, enabling seamless USDC payments on Base network with user-to-user trading capabilities.

## Features

- 🔐 **x402 Protocol Integration** - Native support for HTTP 402 Payment Required
- 💰 **USDC Payments** - Fast, low-cost payments using USDC stablecoin
- 🌐 **Base Network** - Built on Coinbase's Base L2 for optimal performance
- 🛍️ **P2P Marketplace** - Buy and sell digital goods and services between users
- 👛 **Wallet Integration** - Connect your wallet to trade items
- 📦 **Inventory Management** - View and manage your purchased items
- 💱 **User Listings** - List your items for resale at custom prices
- 🔍 **Search & Filter** - Easy discovery of items by category
- 📱 **Responsive Design** - Works on all devices

## What is x402?

x402 is an open protocol for internet-native payments built on HTTP. It leverages the HTTP 402 "Payment Required" status code to enable simple, stateless blockchain transactions using cryptocurrencies like USDC.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Modern styling
- **x402 Protocol** - Payment infrastructure
- **Base Network** - Ethereum L2 for USDC transactions

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A crypto wallet (MetaMask, Coinbase Wallet, etc.)
- USDC on Base network for testing

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/core402.git
cd core402
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/core402)

Or deploy manually:

\`\`\`bash
npm run build
npm start
\`\`\`

## Configuration

### Environment Variables

Create a `.env.local` file for local development:

\`\`\`env
# Optional: Custom x402 facilitator URL
NEXT_PUBLIC_X402_FACILITATOR_URL=https://x402.org/facilitator

# Optional: Your seller wallet address
NEXT_PUBLIC_SELLER_WALLET=0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
\`\`\`

### Adding Items

Edit `lib/marketplace-data.ts` to add your own items:

\`\`\`typescript
{
  id: 'unique-id',
  name: 'Your Item Name',
  description: 'Item description',
  price: '10.00',
  currency: 'USDC',
  network: 'base-mainnet',
  seller: 'your-wallet-address',
  category: 'Category',
  listedForSale: true,
  listedAt: Date.now(),
}
\`\`\`

## How It Works

### Buying Items

1. **Browse Items** - Users browse the marketplace for digital goods/services
2. **Connect Wallet** - Connect your crypto wallet to make purchases
3. **Initiate Purchase** - Click "Purchase with x402" to start payment
4. **Payment Request** - Server responds with HTTP 402 and payment details
5. **Process Payment** - User's wallet sends USDC to seller via x402 facilitator
6. **Verify Payment** - Transaction is verified on-chain
7. **Receive Item** - Item is added to your inventory

### Trading Items

1. **View Inventory** - Navigate to "My Inventory" tab after connecting wallet
2. **List for Sale** - Click "List for Sale" on any item you own
3. **Set Price** - Choose your selling price in USDC
4. **Confirm Listing** - Item appears in marketplace for other users to purchase
5. **Receive Payment** - When sold, USDC is sent to your wallet via x402

## API Routes

### Marketplace
- `GET /api/items` - List all marketplace items
- `GET /api/items/[id]` - Get specific item details

### Payments
- `POST /api/payment/initiate` - Initiate x402 payment (returns 402)
- `POST /api/payment/verify` - Verify payment transaction

### Trading
- `GET /api/inventory?userId={address}` - Get user's inventory
- `POST /api/inventory/list` - List an item for sale
- `GET /api/listings/user?userId={address}` - Get user's active listings

## Production Considerations

For production deployment, you should:

1. **Add Database** - Replace in-memory storage with a real database (Supabase, Neon, etc.)
2. **Implement Real Wallet Auth** - Integrate with Web3 wallet providers (RainbowKit, wagmi, Web3Modal)
3. **On-chain Verification** - Verify transactions directly on Base network using ethers.js or viem
4. **Smart Contract Escrow** - Add escrow smart contracts for secure P2P trading
5. **User Profiles** - Add user profiles with ratings and transaction history
6. **Dispute Resolution** - Implement dispute resolution mechanism for trades
7. **Add Analytics** - Track purchases, listings, and user behavior
8. **Security** - Implement rate limiting, input validation, and security headers
9. **IPFS Storage** - Store item metadata and images on IPFS for decentralization
10. **Notifications** - Add email/push notifications for sales and purchases

## Security Best Practices

- Always verify payment transactions on-chain before granting access
- Implement proper authentication and authorization
- Use environment variables for sensitive data
- Add rate limiting to prevent abuse
- Validate all user inputs
- Use HTTPS in production
- Implement proper error handling

## Resources

- [x402 Protocol Documentation](https://x402.org)
- [x402 GitBook](https://x402.gitbook.io/x402)
- [Coinbase Developer Docs](https://docs.cdp.coinbase.com/x402)
- [Base Network](https://base.org)
- [USDC on Base](https://www.circle.com/en/usdc)

## License

MIT License - feel free to use this code for your own projects!

## Support

For issues or questions:
- Open an issue on GitHub
- Check the [x402 documentation](https://x402.org)
- Visit the [x402 community](https://x402.org/ecosystem)
