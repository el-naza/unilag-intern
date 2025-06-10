import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { pricePerCoin } from '@/utilities'

// Paystack webhook IP whitelist
const PAYSTACK_IP_WHITELIST = ['52.31.139.75', '52.49.173.169', '52.214.14.220']

// // add the central amplify server ip - from the env var - that receives the webhook and resends to other servers
// if (process.env.AMPLIFY_SERVER_IPS) {
//   PAYSTACK_IP_WHITELIST.push(...process.env.AMPLIFY_SERVER_IPS.split(','))
//   console.log('Added Amplify server IP to Paystack IP whitelist:', process.env.AMPLIFY_SERVER_IP)
// }

/**
 * Verifies that the webhook request came from Paystack
 */
function verifyWebhookSignature(requestBody: string, signature: string | null): boolean {
  if (!signature || !process.env.PAYSTACK_SECRET_KEY) {
    return false
  }

  // Create HMAC hash using the secret key and the payload
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(requestBody)
    .digest('hex')

  // Compare our hash with the Paystack signature
  return hash === signature
}

/**
 * Gets the most reliable client IP address from request headers
 */
function getClientIP(req: NextRequest): string | null {
  // Use req.ip if available
  // @ts-ignore
  if (req.ip) return req.ip

  // Fallbacks to check multiple headers in order of reliability
  const forwardedFor = req.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // Get the first IP in the chain
    return forwardedFor.split(',')[0].trim()
  }

  const xRealIP = req.headers.get('x-real-ip')
  if (xRealIP) return xRealIP

  // Last resort - use whatever header might contain IP info
  return (
    req.headers.get('cf-connecting-ip') || // Cloudflare
    req.headers.get('true-client-ip') || // Akamai and Cloudflare
    null
  )
}

/**
 * Webhook handler for Paystack payment notifications
 * This handler creates a new registration record from payment data
 */
export async function POST(req: NextRequest) {
  let event: any = null

  try {
    // // Verify the request is coming from a Paystack IP
    // const sourceIP = getClientIP(req)

    // if (!sourceIP || !PAYSTACK_IP_WHITELIST.includes(sourceIP)) {
    //   console.error(`Unauthorized webhook request from IP: ${sourceIP}`)
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    // }

    // Get the raw request body as text
    const requestBody = await req.text()

    // Get the Paystack signature from the headers
    const signature = req.headers.get('x-paystack-signature')

    // Verify the webhook signature in production
    if (
      // process.env.NODE_ENV === 'production' &&
      !verifyWebhookSignature(requestBody, signature)
    ) {
      console.error('Invalid webhook signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Parse the payload
    event = JSON.parse(requestBody)

    // Only process charge.success events
    if (event.event !== 'charge.success') {
      return NextResponse.json({ received: true, action: 'ignored' })
    }

    // Extract data from the event
    const { data } = event
    const { reference, customer, amount, metadata, status } = data

    // Verify that this is a successful payment
    if (status !== 'success') {
      return NextResponse.json({ received: true, action: 'ignored' })
    }

    // Initialize Payload
    const payloadClient = await getPayload({ config })

    // Extract custom fields from metadata
    const customFields = metadata?.custom_fields || []
    const customData = {} as any
    // @ts-ignore
    customFields.forEach((field) => {
      // @ts-ignore
      customData[field.variable_name] = field.value
    })

    // Create a new payment record in the database
    const payment = await payloadClient.create({
      collection: 'payments',
      data: {
        student: customData.student_id!,
        amount: amount / 100, // Convert to Naira
        rate: 1 / pricePerCoin,
        metadata: customData as any,

        // Payment information
        paymentProvider: 'Paystack',
        transactionReference: reference,
      },
    })

    console.log(
      `Webhook processed: New payment ${JSON.stringify(payment)} created with payment ref ${reference}`,
    )

    // Return a 200 response to acknowledge receipt of the webhook
    return NextResponse.json({
      received: true,
      action: 'created',
      payment: payment.id,
    })
  } catch (error) {
    console.error('Error processing Paystack webhook:', error)

    // For successful payments that failed document creation, return 500 to allow Paystack to retry
    if (event?.event === 'charge.success' && event?.data?.status === 'success') {
      return NextResponse.json(
        { received: false, error: (error as Error).message },
        { status: 500 },
      )
    }

    // For other errors, return 200 to prevent Paystack from retrying
    return NextResponse.json({ received: true, error: (error as Error).message }, { status: 200 })
  }
}
