import type { GenerateDailyWordOutput } from "@/ai/flows/generate-daily-word";

export type DailyWord = GenerateDailyWordOutput;

export type QuizQuestion = {
  id: number;
  word: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type UserProgress = {
  lastVisitedDate: string | null;
  streak: number;
  points: number;
  learnedWords: string[];
};
