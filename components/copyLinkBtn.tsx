"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

export function CopyLinkButton({ userId }: { userId: string }) {
  const handleCopy = async () => {
    try {
      // window.location.origin automatically gets your domain (e.g., http://localhost:3000 or https://yourdomain.com)
      const url = `${window.location.origin}/view/${userId}`;

      // Write the URL to the user's clipboard
      await navigator.clipboard.writeText(url);
      console.log(url);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    // <button
    //   onClick={handleCopy}
    //   className="text-sm font-medium border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition-colors w-fit"
    // >
    //   Copy
    // </button>

    <Button className="group" onClick={handleCopy}>
      Copy Share link
      <Copy className="transition-transform duration-200 group-hover:translate-x-0.5" />
    </Button>
  );
}
