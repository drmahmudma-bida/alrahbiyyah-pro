import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/nextjs/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    // 1. Receive the message from Paystack
    const body = await req.text();
    const signature = req.headers.get("x-paystack-signature");

    // 2. Verify it is ACTUALLY from Paystack (Security Check)
    const expectedSignature = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY as string)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const event = JSON.parse(body);

    // 3. If the payment was successful, unlock the account!
    if (event.event === "charge.success") {
      const clerkUserId = event.data.metadata.clerk_user_id;

      if (clerkUserId) {
        // This talks directly to your Clerk database and flips the switch to green
        const client = await clerkClient();
        await client.users.updateUserMetadata(clerkUserId, {
          publicMetadata: {
            hasPaid: true,
          },
        });
      }
    }

    return NextResponse.json({ message: "Webhook processed successfully" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook error" }, { status: 500 });
  }
}