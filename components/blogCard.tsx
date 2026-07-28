import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Link from "next/link";
import { Button } from "./ui/button";
import { Eye, SquarePen } from "lucide-react";

interface blogCardProps {
  title: string;
  date: Date;
  blogId: string;
  userid: string;
  editable: boolean;
}

export default function BlogCard({
  title,
  date,
  blogId,
  userid,
  editable = false,
}: blogCardProps) {
  let updatedDate = new Intl.DateTimeFormat("en-US", {
    month: "long", // "short" for "Jul"
    day: "numeric", // "2-digit" for "07"
    year: "numeric",
  }).format(date);

  return (
    <>
      <Card className="w-full max-w-lg md:min-w-xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>{title}</CardTitle>

          <div className="flex gap-4 items-center">
            {editable && (
              <Link href={`/home/new?userId=${userid}&blogId=${blogId}`}>
                <Button variant="ghost" size="icon">
                  <SquarePen />
                </Button>
              </Link>
            )}

            <Link href={`/view/${userid}/${blogId}`}>
              <Button variant="ghost" size="icon">
                <Eye />
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="">
          <p className="text-muted-foreground text-sm ">{updatedDate}</p>
          {/* <p className="text-muted-foreground text-sm">{content}</p> */}
        </CardContent>
      </Card>
    </>
  );
}
