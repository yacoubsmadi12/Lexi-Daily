"use client";

import { useState, useEffect, useCallback } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import type { UserProgress } from '@/lib/types';

const PROGRESS_KEY = 'lexi-daily-progress';

const defaultProgress: UserProgress = {
  lastVisitedDate: null,
  streak: 0,
  points: 0,
  learnedWords: [],
};

export function useUserProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(PROGRESS_KEY);
      const initialProgress = storedProgress ? JSON.parse(storedProgress) : defaultProgress;
      
      const today = new Date();
      const lastVisited = initialProgress.lastVisitedDate ? new Date(initialProgress.lastVisitedDate) : null;
      
      let newStreak = initialProgress.streak;
      if (lastVisited) {
        const dayDifference = differenceInCalendarDays(today, lastVisited);
        if (dayDifference > 1) {
          newStreak = 1;
        } else if (dayDifference === 1) {
          newStreak += 1;
        }
      } else {
        newStreak = 1;
      }

      const updatedProgress = {
        ...initialProgress,
        streak: newStreak,
        lastVisitedDate: today.toISOString(),
      };
      
      setProgress(updatedProgress);
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updatedProgress));
    } catch (error) {
      console.error("Failed to load/update user progress:", error);
      setProgress(defaultProgress);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const addPoints = useCallback((points: number) => {
    setProgress(prev => {
      const newProgress = { ...prev, points: prev.points + points };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
      return newProgress;
    });
  }, []);

  const addLearnedWord = useCallback((word: string) => {
    setProgress(prev => {
      if (prev.learnedWords.includes(word)) return prev;
      const newLearnedWords = [...prev.learnedWords, word];
      const newProgress = { ...prev, learnedWords: newLearnedWords };
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
      return newProgress;
    });
  }, []);

  return { progress, addPoints, addLearnedWord, isLoaded };
}
