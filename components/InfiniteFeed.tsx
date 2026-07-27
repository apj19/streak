"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { fetchNextBlogs } from "@/app/action";
import { blogCard } from "@/types/user";
import BlogCard from "./blogCard";
import { Loader2 } from "lucide-react";
// Import your individual card component here
// import BlogCard from './BlogCard';

export default function InfiniteFeed({
  initialLogs,
  userId,
}: {
  initialLogs: blogCard[];
  userId: string;
}) {
  const [logs, setLogs] = useState<blogCard[]>(initialLogs);

  const [hasMore, setHasMore] = useState(initialLogs.length === 5);

  const [isLoading, setIsLoading] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    // Get the ID of the very last log currently on the screen
    const lastLogId = logs[logs.length - 1]?.id;

    try {
      const newLogs = await fetchNextBlogs(userId, lastLogId);

      if (newLogs.length === 0) {
        setHasMore(false); // No more logs to fetch
      } else {
        setLogs((prev) => [...prev, ...newLogs]);
        // If we got fewer than 5 back, we've hit the end of the database
        if (newLogs.length < 5) setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more logs:", error);
    } finally {
      setIsLoading(false);
    }
  }, [logs, isLoading, hasMore]);

  // Set up the Intersection Observer to trigger loadMore when the target is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
          console.log("usecallback triggred");
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div className="flex flex-col gap-6">
      {logs.map((log) => (
        <div key={log.id}>
          {/* Replace this with your actual Blog component */}
          <BlogCard
            key={log.id}
            title={log.title}
            date={log.createdAt}
            blogId={log.id}
            userid={userId}
          />
        </div>
      ))}

      {/* Invisible target element that triggers the observer */}
      <div
        ref={observerTarget}
        className="h-10 w-full flex items-center justify-center"
      >
        {isLoading && (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Loading..
          </>
        )}
        {!hasMore && logs.length > 0 && (
          <span className="text-gray-400 text-sm">You've reached the end.</span>
        )}
      </div>
    </div>
  );
}
