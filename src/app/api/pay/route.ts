import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  try {
    // 1. Securely verify the user is logged in
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Extract the plan and email sent from the frontend
    const body = await request.json();
    const { plan, email } = body;

    if (!email) {
      return NextResponse.json({ error: "Email is missing" }, { status: 400 });
    }

    // 3. Set the price based on the plan
    let amount = 0;
    if (plan === "desktop") amount = 1500000; // ₦15,000 in kobo
    else if (plan === "bundle") amount = 1750000; // ₦17,500 in kobo
    else return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    // 4. Initialize Paystack Transaction
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        amount: amount,
        metadata: {
          userId: userId,
          plan: plan,
        },
        // Optional: Redirect them back to the dashboard after payment
        // callback_url: "http://localhost:3000/dashboard" 
      }),
    });

    const paystackData = await paystackRes.json();

    if (!paystackRes.ok) {
      console.error("Paystack API Error:", paystackData);
      return NextResponse.json({ error: "Payment gateway error" }, { status: 500 });
    }

    // 5. Return the checkout URL to the frontend
    return NextResponse.json({ url: paystackData.data.authorization_url });

  } catch (error) {
    console.error("Server Crash:", error);
    // Always return a JSON response so the frontend doesn't break!
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}