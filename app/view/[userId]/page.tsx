import { getTopFiveBloag, getuserBlogs } from "@/app/action";
import BlogCard from "@/components/blogCard";
import InfiniteFeed from "@/components/InfiniteFeed";
import { blogCard } from "@/types/user";
import { IconCircleChevronsDownFilled } from "@tabler/icons-react";
import { notFound } from "next/navigation";

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
        {/* {blogs.map((e) => (
          <BlogCard
            key={e.id}
            title={e.title}
            date={e.createdAt.toISOString()}
            content={e.content}
          />
        ))} */}

        <InfiniteFeed userId={userId} initialLogs={blogs} />
      </div>
    </main>
  );
}
