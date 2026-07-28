import { getStates } from "@/app/action";
import { StreakActivity } from "./streakActivity";

export default async function Streak({ userId }: { userId: string }) {
  const states = (await getStates(userId)) || {
    currentStreak: 0,
    longestStreak: 0,
    totalDays: 0,
    lastLogDate: null,
  };

  return (
    <>
      <StreakActivity
        currentStreak={states.currentStreak}
        longestStreak={states.longestStreak}
        totalDays={states.totalDays}
      />
    </>
  );
}
