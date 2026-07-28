export interface blogCard {
  title: string;
  createdAt: Date;
  content: string;
  id: string;
}

export interface states {
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
  lastLogDate?: Date;
}

export class ActionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ActionError";
  }
}

// universer serval action handling

// lib/types.ts

export type ServerActionResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string; // Global error (e.g., "Database failed", "Not logged in")
      fieldErrors?: Record<string, string[]>; // Field-specific errors (e.g., { title: ["Required"] })
    };
