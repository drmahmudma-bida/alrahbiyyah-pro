import { auth, clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request: Request) {
  try {
    // 1. Check if they are logged in (Added 'await' here)
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse("Unauthorized. Please log in.", { status: 401 });
    }

    // 2. Check if they have actually paid via Clerk Metadata (Added 'await' here)
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    const hasPaid = user.publicMetadata?.hasPaid === true;

    if (!hasPaid) {
      return new NextResponse("Access Denied. You must purchase the bundle first.", { status: 403 });
    }

    // 3. See which file they are trying to download
    const { searchParams } = new URL(request.url);
    const file = searchParams.get("file");

    // 4. Locate the file safely
    let filePath = "";
    if (file === "al-madkhal-english.pdf") {
      filePath = path.join(process.cwd(), "secure-vault", "al-madkhal-english.pdf");
    } else if (file === "al-madkhal-english.epub") {
      filePath = path.join(process.cwd(), "secure-vault", "al-madkhal-english.epub");
    } else if (file === "wasiyyah-bundle.zip") {
      filePath = path.join(process.cwd(), "secure-vault", "wasiyyah-bundle.zip");
    } else {
      // If they try to hack the URL to download server code, block it!
      return new NextResponse("File not found or access restricted.", { status: 404 });
    }

    // 5. Read the file and hand it to the user
    const fileBuffer = fs.readFileSync(filePath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="${file}"`,
        "Content-Type": "application/octet-stream",
      },
    });

  } catch (error) {
    console.error("Download API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}