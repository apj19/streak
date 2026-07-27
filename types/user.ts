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
