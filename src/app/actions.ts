"use server";

import { generateDailyWord } from '@/ai/flows/generate-daily-word';
import { generateDailyTip } from '@/ai/flows/generate-daily-tip';
import type { DailyWord } from '@/lib/types';

export async function getDailyWord(date: string): Promise<DailyWord | null> {
  try {
    const dailyWord = await generateDailyWord({ date });
    return dailyWord;
  } catch (error) {
    console.error("Error fetching daily word:", error);
    return null;
  }
}

export async function getDailyTip(wordData: DailyWord): Promise<string | null> {
    if (!wordData) return null;
  try {
    const dailyTip = await generateDailyTip({
        word: wordData.word,
        definition: wordData.definition,
        exampleSentences: wordData.exampleSentences.map(ex => ex.english),
    });
    return dailyTip.tip;
  } catch (error) {
    console.error("Error fetching daily tip:", error);
    return "Could not generate a tip today. Please try again later.";
  }
}
