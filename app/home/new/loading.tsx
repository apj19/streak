import { SkeletonCard } from "@/components/skletonloader";

export default function Loading() {
  return (
    <main className="w-full h-full     max-w-2xl mx-auto p-8 ">
      <div className="flex flex-col gap-8 items-center justify-center  ">
        <SkeletonCard />

        {/* <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard /> */}
      </div>
    </main>
  );
}
