import { getuserBlogId } from "@/app/action";
import Editor from "@/components/Editor";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

// interface PageProps {
//   params: Promise<{
//     userid: string;
//     blogid: string;
//   }>;
// }

export default async function blogpage({
  params,
}: {
  params: Promise<{ userId: string; blogId: string }>;
}) {
  const { userId: userid, blogId: blogid } = await params;
  console.log(userid, blogid);
  const userBlogs = await getuserBlogId(userid, blogid);

  if (!userBlogs) {
    return redirect("/home");
  }

  console.log(userBlogs.content);

  return (
    <>
      <main className="max-w-2xl mx-auto p-8">
        <div className=" flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground mb-4">
            {userBlogs.title}
          </h1>

          <Link href={`/view/${userid}`}>
            {" "}
            <Button className="group">
              <MoveLeft className="transition-transform duration-200 group-hover:translate-x-0.5" />
              Back Blog List
              {/* <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" /> */}
            </Button>
          </Link>
        </div>

        {/* <EditorContent editor={editor} /> */}
        <Editor data={userBlogs.content} />
      </main>
    </>
  );
}
