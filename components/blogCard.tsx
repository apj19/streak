interface blogCardProps {
  title: string;
  date: string;
  content: string;
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleFadingPlusIcon } from "lucide-react";

export default function BlogCard({ title, date, content }: blogCardProps) {
  return (
    <>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="">
          <p className="text-muted-foreground text-sm">{date}</p>
          <p className="text-muted-foreground text-sm">{content}</p>
        </CardContent>
      </Card>
    </>
  );
}
