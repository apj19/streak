import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import BlogCard from "@/components/blogCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { getStates, getTopFiveBloag } from "../action";
import { blogCard } from "@/types/user";
import { CopyLinkButton } from "@/components/copyLinkBtn";
import InfiniteFeed from "@/components/InfiniteFeed";
import { StreakActivity } from "@/components/streakActivity";
import Streak from "@/components/Streak";

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

  const blogs: blogCard[] = await getTopFiveBloag(user.id);
  // console.log(blogs);
  // const states = (await getStates(user.id)) || {
  //   currentStreak: 0,
  //   longestStreak: 0,
  //   totalDays: 0,
  //   lastLogDate: null,
  // };

  return (
    // <div className="flex flex-col items-center justify-center flex-1 bg-zinc-50 dark:bg-black p-6">
    //   {/* <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm">
    //     <h1 className="text-2xl font-bold tracking-tight text-foreground mb-4">
    //       Welcome, {dbUser.name || "User"}!
    //     </h1>
    //   </div> */}
    //   <BlogCard title="Akshay" date="july 25" content="fjkhsdkjgkjg" />
    // </div>
    <main className="max-w-2xl mx-auto p-8 ">
      {/* Header Section */}
      {/* <StreakActivity
        currentStreak={states.currentStreak}
        longestStreak={states.longestStreak}
        totalDays={states.totalDays}
      /> */}
      <Streak userId={user.id} />

      <div className="flex flex-col items-center justify-between my-12 border-b border-t py-6 gap-4">
        <h3 className="text-2xl font-heading">What did you learn today?</h3>

        <div className="flex gap-4">
          <Link href="/home/new">
            {" "}
            <Button className="group">
              Add Today's Learning
              <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Button>
          </Link>
          <CopyLinkButton userId={user.id} />
        </div>
      </div>

      {/* Feed Section */}
      <div className="flex flex-col gap-8   pt-4 items-center  ">
        <InfiniteFeed userId={user.id} initialLogs={blogs} />
      </div>
    </main>
  );
}
