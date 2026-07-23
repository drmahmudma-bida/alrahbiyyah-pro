import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // 1. Verify the user is logged in
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.emailAddresses[0].emailAddress;
  
  // 2. Catch the plan type sent from our new pricing buttons
  let plan = "desktop"; // Default fallback
  try {
    const body = await request.json();
    if (body.plan) plan = body.plan;
  } catch (e) {
    console.log("No JSON body provided, defaulting to desktop plan");
  }

  // 3. Set dynamic price (Paystack uses kobo)
  let amountInKobo = 15000 * 100; // Default: Desktop Pro (₦15,000)
  
  if (plan === "bundle") {
    amountInKobo = 17500 * 100; // Upgrade: Master Bundle (₦17,500)
  }

  // Dynamically grab the current website URL (works for both localhost and Vercel)
  const origin = new URL(request.url).origin;

  try {
    // 4. Talk to Paystack securely
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
          clerk_user_id: userId,   // This is the secret handshake!
          plan_purchased: plan,    // Pass the plan to the webhook so it knows what to unlock
        },
        callback_url: `${origin}/pro`, // Dynamically sends them back to the dashboard
      }),
    });

    const data = await response.json();

    // 5. Send the secure Paystack checkout link back to the browser
    return NextResponse.json({ url: data.data.authorization_url });
    
  } catch (error) {
    return NextResponse.json({ error: "Payment failed to initialize" }, { status: 500 });
  }
}