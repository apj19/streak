interface PageProps {
  params: Promise<{
    userid: string;
    blogid: string;
  }>;
}

export default async function blogpage({
  params,
}: {
  params: Promise<{ userId: string; blogId: string }>;
}) {
  const { userId: userid, blogId: blogid } = await params;
  console.log(userid, blogid);

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-foreground mb-4">
        {blogid}
      </h1>
      <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4">
        {userid}
      </h2>
    </>
  );
}
