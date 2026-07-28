import { getuserBlogs } from "@/app/action";

import InfiniteFeed from "@/components/InfiniteFeed";
import Streak from "@/components/Streak";
import { blogCard } from "@/types/user";

// Next.js automatically passes the URL parameters to this component
export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;

  // console.log("userid is", userId);

  const blogs: blogCard[] = await getuserBlogs(userId);
  // console.log(blogs);

  return (
    <main className="max-w-2xl mx-auto p-8 ">
      {/* Feed Section */}
      <div className="flex flex-col gap-8 justify-center items-center">
        <Streak userId={userId} />
        <InfiniteFeed userId={userId} initialLogs={blogs} />
      </div>
    </main>
  );
}
