import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  // Query database using the db client instance
  let dbUser = await db.user.findUnique({
    where: { id: user.id },
  });

  // Automatically create a database record for the user if it doesn't exist
  if (!dbUser) {
    dbUser = await db.user.create({
      data: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || null,
        profileImage: user.imageUrl || null,
      },
    });
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 bg-zinc-50 dark:bg-black p-6">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-4">
          Welcome, {dbUser.name || "User"}!
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
          Your account is successfully synced with our Neon Postgres database.
        </p>
        <div className="text-xs bg-zinc-100 dark:bg-zinc-800 p-4 rounded-xl font-mono text-zinc-600 dark:text-zinc-300 overflow-auto max-h-48">
          {JSON.stringify(dbUser, null, 2)}
        </div>
      </div>
    </div>
  );
}
