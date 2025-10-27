import type { X402PaymentRequest, X402PaymentResponse } from "./x402-types"

export class X402Client {
  private facilitatorUrl: string

  constructor(facilitatorUrl = "https://x402.org/facilitator") {
    this.facilitatorUrl = facilitatorUrl
  }

  /**
   * Create a payment request for x402 protocol
   */
  createPaymentRequest(params: X402PaymentRequest): string {
    const paymentData = {
      amount: params.amount,
      currency: params.currency,
      network: params.network,
      recipient: params.recipient,
      description: params.description || "",
      facilitator: params.facilitator || this.facilitatorUrl,
    }

    return JSON.stringify(paymentData)
  }

  /**
   * Verify a payment response
   */
  async verifyPayment(transactionHash: string, network: string): Promise<boolean> {
    try {
      // In production, verify the transaction on-chain
      // This is a simplified version
      const response = await fetch(`${this.facilitatorUrl}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionHash,
          network,
        }),
      })

      if (!response.ok) {
        return false
      }

      const result = await response.json()
      return result.verified === true
    } catch (error) {
      console.error("Payment verification failed:", error)
      return false
    }
  }

  /**
   * Process a payment through the facilitator
   */
  async processPayment(paymentRequest: X402PaymentRequest, senderAddress: string): Promise<X402PaymentResponse | null> {
    try {
      const response = await fetch(`${this.facilitatorUrl}/process`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...paymentRequest,
          sender: senderAddress,
        }),
      })

      if (!response.ok) {
        throw new Error("Payment processing failed")
      }

      return await response.json()
    } catch (error) {
      console.error("Payment processing error:", error)
      return null
    }
  }
}
