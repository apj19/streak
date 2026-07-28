import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import BlogCard from "@/components/blogCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import { getHomePageBlogs, getStates, getTopFiveBloag } from "../action";
import { blogCard, ServerActionResponse } from "@/types/user";
import { CopyLinkButton } from "@/components/copyLinkBtn";
import InfiniteFeed from "@/components/InfiniteFeed";
import { StreakActivity } from "@/components/streakActivity";
import Streak from "@/components/Streak";
import { ToastOnError } from "@/components/ToastOnError";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    redirect("/signin");
  }

  // Query database using the db client instance
  // let dbUser = await db.user.findUnique({
  //   where: { id: user.id },
  // });

  // // Automatically create a database record for the user if it doesn't exist
  // if (!dbUser) {
  //   dbUser = await db.user.create({
  //     data: {
  //       id: user.id,
  //       email: user.emailAddresses[0]?.emailAddress || "",
  //       name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || null,
  //       profileImage: user.imageUrl || null,
  //     },
  //   });
  // }

  let blogsError: string | null = null;

  try {
    const dbUser = await db.user.upsert({
      where: { id: user.id },
      update: {}, // Leave empty if you don't want to overwrite data on every login
      create: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || null,
        profileImage: user.imageUrl || null,
      },
    });
  } catch (error: any) {
    blogsError = error.message;
  }

  // const blogs: blogCard[] = await getTopFiveBloag(user.id);
  let blogs: blogCard[] = [];

  const result: ServerActionResponse<blogCard[]> = await getHomePageBlogs(
    user.id,
  );
  if (result.success) {
    blogs = result.data;
  }

  return (
    <main className="max-w-2xl mx-auto p-8 ">
      {/* streak Section */}

      <Streak userId={user.id} />

      {/* Add new Blog Section */}
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
      {/* Error hadling */}
      {blogsError && <ToastOnError message={blogsError} />}
    </main>
  );
}
