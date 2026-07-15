import { auth, currentUser } from "@clerk/nextjs/server";

export default async function ProDashboard() {
  // This single line acts as the security guard. 
  // If a user is not logged in, it instantly kicks them to a secure sign-in screen.
  await auth.protect();

  // If they pass the check, we grab their profile info to greet them
  const user = await currentUser();

  return (
    <div className="min-h-screen p-8 text-center mt-20">
      <h1 className="text-3xl font-bold text-green-700">
        Al-Rahbiyyah Pro Toolkit
      </h1>
      <p className="mt-4 text-lg">
        Welcome, Boss! You have successfully unlocked the premium dashboard.
      </p>
      <p className="mt-2 text-gray-600">
        Logged in as: {user?.emailAddresses[0].emailAddress}
      </p>
    </div>
  );
}