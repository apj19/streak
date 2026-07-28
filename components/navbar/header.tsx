import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle";
import { IconBrandGithub } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Header() {
  const { userId } = await auth();

  return (
    <header className="sticky px-8 top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-2 max-w-7xl mx-auto w-full">
        {/* Left Side: Brand Heading */}
        <div className="flex items-center gap-2">
          {/* <Link href="/">
            <span className="font-heading text-xl font-bold tracking-tight text-foreground">
              streak
            </span>
          </Link> */}

          {userId ? (
            <Link href="/home">
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                streak
              </span>
            </Link>
          ) : (
            <Link href="/">
              <span className="font-heading text-xl font-bold tracking-tight text-foreground">
                streak
              </span>
            </Link>
          )}
        </div>

        {/* Right Side: GitHub Icon, Auth Actions & Dark Mode Toggle */}
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer noopener"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-9 rounded-xl hover:bg-muted flex items-center justify-center",
            )}
          >
            <IconBrandGithub className="size-4 animate-none" />
            <span className="sr-only">GitHub</span>
          </a>
          <ModeToggle />

          {userId ? (
            <UserButton />
          ) : (
            <Link
              href="/signin"
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "rounded-xl h-8 px-3 text-xs",
              )}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
