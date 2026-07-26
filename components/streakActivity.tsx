"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Flame, Trophy, TrendingUp } from "lucide-react";

interface ActivityStreakData {
  currentStreak?: number;
  longestStreak?: number;
  totalDays?: number;
  activityData?: boolean[][];
}

export function StreakActivity({
  currentStreak = 12,
  longestStreak = 45,
  totalDays = 87,
  activityData,
}: ActivityStreakData) {
  const isStreakActive = currentStreak > 0;
  const streakMultiplier = Math.min(Math.floor(currentStreak / 7), 5);

  // Generate sample 12-week activity data if not provided (7 rows × 12 columns)
  const generateActivityData = () => {
    return Array(7)
      .fill(null)
      .map(() =>
        Array(12)
          .fill(null)
          .map(() => Math.random() > 0.3),
      );
  };

  const activity = activityData || generateActivityData();

  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weekLabels = Array(12)
    .fill(null)
    .map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (11 - i) * 7);
      return date.toLocaleDateString("en-US", { month: "short" });
    });

  // Get month names at the start of each week of the month
  const monthLabels: (string | null)[] = Array(12).fill(null);
  let lastMonth = -1;
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (11 - i) * 7);
    const month = date.getMonth();
    if (month !== lastMonth) {
      monthLabels[i] = date.toLocaleDateString("en-US", { month: "short" });
      lastMonth = month;
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Current Streak Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 dark:bg-orange-950 rounded-full -mr-10 -mt-10 opacity-50" />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {currentStreak}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {isStreakActive ? "days in a row" : "Start a new streak"}
                </p>
              </div>
              {isStreakActive && (
                <Badge variant="secondary" className="ml-2">
                  🔥 Active
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Longest Streak Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 dark:bg-purple-950 rounded-full -mr-10 -mt-10 opacity-50" />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Trophy className="h-4 w-4 text-purple-500" />
              Longest Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {longestStreak}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  personal record
                </p>
              </div>
              <Badge className="ml-2 bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100">
                {streakMultiplier}x
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Total Days Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-100 dark:bg-blue-950 rounded-full -mr-10 -mt-10 opacity-50" />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              Total Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalDays}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                days completed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 12-Week Activity Heatmap */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">12-Week Activity</CardTitle>
          <CardDescription>
            Green cells indicate activity, empty cells show no activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="inline-block">
              {/* Header with month labels */}
              <div className="flex">
                <div className="w-12" /> {/* Spacer for day labels column */}
                <div className="flex gap-1">
                  {monthLabels.map((month, i) => (
                    <div
                      key={i}
                      className="w-7 h-6 flex items-center justify-center"
                    >
                      <span className="text-xs font-semibold text-muted-foreground">
                        {month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Heatmap grid with day labels */}
              <div className="flex gap-2">
                {/* Y-axis: Day labels */}
                <div className="flex flex-col justify-start">
                  {dayLabels.map((day, i) => (
                    <div key={day} className="h-7 flex items-center pr-2">
                      <span className="text-xs font-medium text-muted-foreground w-10">
                        {day}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Activity grid */}
                <div className="flex gap-1">
                  {activity[0].map((_, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {activity.map((week, dayIndex) => {
                        const isActive = week[weekIndex];
                        return (
                          <div
                            key={`${dayIndex}-${weekIndex}`}
                            className={`w-6 h-6 rounded-sm transition-colors ${
                              isActive
                                ? "bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                                : "bg-muted dark:bg-slate-800 hover:bg-muted-foreground/20"
                            }`}
                            title={`${dayLabels[dayIndex]} - Week ${weekIndex + 1}: ${isActive ? "Active" : "No activity"}`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* X-axis labels (selected days) */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
