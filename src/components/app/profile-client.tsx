"use client";

import { useUserProgress } from "@/hooks/use-user-progress";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Star, BookMarked, ShieldCheck } from "lucide-react";
import { ThemeToggle } from "@/components/app/theme-toggle";

const badges = [
  { days: 7, label: "Week Streak", icon: Flame },
  { days: 30, label: "Month Streak", icon: Star },
  { days: 100, label: "Century Streak", icon: ShieldCheck },
];

export function ProfileClient() {
  const { progress, isLoaded } = useUserProgress();
  const { streak, points, learnedWords } = progress;

  if (!isLoaded) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="animate-pulse"><CardHeader><div className="h-8 w-3/4 bg-muted rounded"></div></CardHeader><CardContent><div className="h-12 w-1/2 bg-muted rounded"></div></CardContent></Card>
        <Card className="animate-pulse"><CardHeader><div className="h-8 w-3/4 bg-muted rounded"></div></CardHeader><CardContent><div className="h-12 w-1/2 bg-muted rounded"></div></CardContent></Card>
        <Card className="animate-pulse"><CardHeader><div className="h-8 w-3/4 bg-muted rounded"></div></CardHeader><CardContent><div className="h-12 w-1/2 bg-muted rounded"></div></CardContent></Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} Days</div>
            <p className="text-xs text-muted-foreground">Keep it going!</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Points</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{points}</div>
            <p className="text-xs text-muted-foreground">Earned from quizzes</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Words Learned</CardTitle>
            <BookMarked className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{learnedWords.length}</div>
            <p className="text-xs text-muted-foreground">Total vocabulary size</p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Badges earned for your consistency.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          {badges.map((badge) => {
            const hasBadge = streak >= badge.days;
            return (
              <div key={badge.label} className={`text-center p-4 rounded-lg w-32 ${hasBadge ? 'bg-accent/20 text-accent-foreground' : 'bg-muted text-muted-foreground'}`}>
                <badge.icon className={`mx-auto h-12 w-12 mb-2 ${hasBadge ? 'text-accent' : ''}`} />
                <p className="font-semibold text-sm">{badge.label}</p>
                <p className="text-xs">{badge.days} Days</p>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
            <p>Theme</p>
            <ThemeToggle />
        </CardContent>
      </Card>
    </div>
  );
}
