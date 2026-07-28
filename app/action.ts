"use server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { differenceInCalendarDays } from "date-fns";
type bloagData = {
  title: string;
  content: string;
};
// T
export async function createPostAction(formData: bloagData, userId: string) {
  const title = formData.title;
  const content = formData.content;
  //will create transcation to add blog post and update states

  await db.$transaction(
    async (tx) => {
      //1. create post
      await tx.blog.create({
        data: {
          title,
          content,
          authorId: userId,
        },
      });

      //2. from here update the states
      //get current states
      let stats = await db.userStat.findUnique({
        where: {
          userId: userId,
        },
        select: {
          currentStreak: true,
          longestStreak: true,
          totalDays: true,
          lastLogDate: true,
        },
      });
      //if no state assign default
      if (!stats) {
        stats = {
          currentStreak: 0,
          longestStreak: 0,
          totalDays: 0,
          lastLogDate: null,
        };
      }

      //now caluate the all thre condition depend on date
      const today = new Date();

      //how many days happend--it can be 0,1,or more than one
      const daysSinceLastLog = stats.lastLogDate
        ? differenceInCalendarDays(today, stats.lastLogDate)
        : null;

      //3. update state
      let newStreak = stats.currentStreak;
      let newTotal = stats.totalDays;

      if (daysSinceLastLog == null || daysSinceLastLog > 1) {
        newStreak = 1; //streak reast to 1
        newTotal += 1; //add to todat
      } else if (daysSinceLastLog == 1) {
        newStreak += 1; //nect day continue streak
        newTotal += 1;
      } else if (daysSinceLastLog == 0) {
        //already done
        return;
      }

      //now depend on all able update or insert the states table

      await tx.userStat.upsert({
        where: { userId },
        update: {
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, stats.longestStreak),
          totalDays: newTotal,
          lastLogDate: today,
        },
        create: {
          userId,
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, stats.longestStreak),
          totalDays: newTotal,
          lastLogDate: today,
        },
      });
    },
    {
      maxWait: 5000, // Wait up to 5 seconds to connect (default is 2000)
      timeout: 10000, // Wait up to 10 seconds for the query to finish (default is 5000)
    },
  );

  // revalidatePath("/home");
  // redirect("/home");
}

export async function getTopFiveBloag(userId: string) {
  const bloags = await db.blog.findMany({
    take: 5,
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      content: true,
      createdAt: true,
      id: true,
    },
  });
  return bloags;
}

export async function getuserBlogs(userId: string) {
  const bloags = await db.blog.findMany({
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      content: true,
      createdAt: true,
      id: true,
    },
  });
  return bloags;
}

export async function fetchNextBlogs(userId: string, cursor: string) {
  const logs = await db.blog.findMany({
    take: 5,
    // If a cursor is provided, skip that specific item and start from the next one
    ...(cursor && {
      skip: 1,
      cursor: { id: cursor },
    }),
    where: {
      authorId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
  });

  return logs;
}

export async function getStates(userId: string) {
  const states = await db.userStat.findUnique({
    where: {
      userId: userId,
    },
    select: {
      currentStreak: true,
      longestStreak: true,
      totalDays: true,
      lastLogDate: true,
    },
  });
  return states;
}

export async function getuserBlogId(userid: string, blogid: string) {
  const blog = await db.blog.findUnique({
    where: {
      authorId: userid,
      id: blogid,
    },
    select: {
      title: true,
      content: true,
      createdAt: true,
      id: true,
    },
  });

  return blog;
}
