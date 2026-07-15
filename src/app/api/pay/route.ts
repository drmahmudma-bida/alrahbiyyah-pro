import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST() {
  // 1. Verify the user is logged in
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.emailAddresses[0].emailAddress;
  
  // 2. Set your bundle price (Paystack uses kobo for Naira, so multiply by 100)
  // Let's set it to 5,000 Naira for this example
  const amountInKobo = 5000 * 100; 

  try {
    // 3. Talk to Paystack securely
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        amount: amountInKobo,
        metadata: {
          clerk_user_id: userId, // This is the secret handshake!
        },
        callback_url: "http://localhost:3000/pro", // Where they go after paying
      }),
    });

    const data = await response.json();

    // 4. Send the secure Paystack checkout link back to the browser
    return NextResponse.json({ url: data.data.authorization_url });
    
  } catch (error) {
    return NextResponse.json({ error: "Payment failed to initialize" }, { status: 500 });
  }
}