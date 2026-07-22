import { auth } from "@clerk/nextjs/server";

export default async function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This layout is a Server Component. It securely checks authentication
  // BEFORE it ever loads the clickable page inside it.
  await auth.protect();

  return (
    <>
      {children}
    </>
  );
}