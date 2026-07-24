import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = user.emailAddresses[0].emailAddress;
  
  let plan = "desktop"; 
  try {
    const body = await request.json();
    if (body.plan) plan = body.plan;
  } catch (e) {
    console.log("No JSON body provided, defaulting to desktop plan");
  }

  let amountInKobo = 15000 * 100; 
  
  if (plan === "bundle") {
    amountInKobo = 17500 * 100; 
  }

  const origin = new URL(request.url).origin;

  try {
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
          clerk_user_id: userId,   
          plan_purchased: plan,    
        },
        callback_url: `${origin}/pro`, 
      }),
    });

    const data = await response.json();
    return NextResponse.json({ url: data.data.authorization_url });
    
  } catch (error) {
    return NextResponse.json({ error: "Payment failed to initialize" }, { status: 500 });
  }
}