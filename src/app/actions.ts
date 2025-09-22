"use server";

import { generateDailyWord } from '@/ai/flows/generate-daily-word';
import { generateDailyTip } from '@/ai/flows/generate-daily-tip';
import type { DailyWord } from '@/lib/types';

const wordCache = new Map<string, DailyWord>();
const tipCache = new Map<string, string>();

export async function getDailyWord(date: string): Promise<DailyWord | null> {
  if (wordCache.has(date)) {
    return wordCache.get(date)!;
  }
  try {
    const dailyWord = await generateDailyWord({ date });
    if (dailyWord) {
      wordCache.set(date, dailyWord);
    }
    return dailyWord;
  } catch (error) {
    console.error("Error fetching daily word:", error);
    return null;
  }
}

export async function getDailyTip(wordData: DailyWord): Promise<string | null> {
    if (!wordData) return null;
    if (tipCache.has(wordData.word)) {
        return tipCache.get(wordData.word)!;
    }
  try {
    const dailyTip = await generateDailyTip({
        word: wordData.word,
        definition: wordData.definition,
        exampleSentences: wordData.exampleSentences.map(ex => ex.english),
    });
    if (dailyTip.tip) {
        tipCache.set(wordData.word, dailyTip.tip);
    }
    return dailyTip.tip;
  } catch (error) {
    console.error("Error fetching daily tip:", error);
    return "Could not generate a tip today. Please try again later.";
  }
}
