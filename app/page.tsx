import { Button } from "@/components/ui/button";
// import { ModeToggle } from "@/components/ui/toggle";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (user) {
    redirect("/home");
  }

  return (
    <div className="flex  flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {/* <h1>Hi</h1>
      <Button variant="outline">Button</Button>
      <ModeToggle /> */}

      <div className="mx-auto max-w-2xl py-40">
        <div className="text-center">
          <h1 className="text-5xl font-heading tracking-tight text-balance sm:text-7xl">
            Turn your learning into a public journey.
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty sm:text-xl/8">
            Easily track your study sessions, projects, and lightbulb moments
            all in one organized place. Share your progress link to stay
            accountable and show future employers or peers exactly what you can
            do.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/signin">
              {" "}
              <Button className="group">
                Get Started
                <ArrowRightIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
