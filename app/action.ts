"use server";

import { currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
type bloagData = {
  title: string;
  content: string;
};
// This function can now be imported anywhere
export async function createPostAction(formData: bloagData, userId: string) {
  const title = formData.title;
  const content = formData.content;

  await db.blog.create({
    data: {
      title,
      content,
      authorId: userId,
    },
  });

  revalidatePath("/home");
  redirect("/home");
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
