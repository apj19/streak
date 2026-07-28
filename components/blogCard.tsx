import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";

interface blogCardProps {
  title: string;
  date: Date;
  blogId: string;
  userid: string;
}

export default function BlogCard({
  title,
  date,
  blogId,
  userid,
}: blogCardProps) {
  let updatedDate = new Intl.DateTimeFormat("en-US", {
    month: "long", // "short" for "Jul"
    day: "numeric", // "2-digit" for "07"
    year: "numeric",
  }).format(date);

  return (
    <>
      <Link href={`/view/${userid}/${blogId}`}>
        <Card className="w-full max-w-lg md:min-w-xl">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="">
            <p className="text-muted-foreground text-sm ">{updatedDate}</p>
            {/* <p className="text-muted-foreground text-sm">{content}</p> */}
          </CardContent>
        </Card>
      </Link>
    </>
  );
}
