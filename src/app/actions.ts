"use server";

import { generateDailyWord } from '@/ai/flows/generate-daily-word';
import { generateDailyTip } from '@/ai/flows/generate-daily-tip';
import type { DailyWord, QuizQuestion, GenerateQuizQuestionsInput } from '@/lib/types';
import { generateQuizQuestions } from '@/ai/flows/generate-quiz-questions';

const wordCache = new Map<string, DailyWord>();
const tipCache = new Map<string, string>();
const quizCache = new Map<string, QuizQuestion[]>();


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
    const cacheKey = wordData.word;
    if (tipCache.has(cacheKey)) {
        return tipCache.get(cacheKey)!;
    }
  try {
    const dailyTip = await generateDailyTip({
        word: wordData.word,
        definition: wordData.definition,
        exampleSentences: wordData.exampleSentences.map(ex => ex.english),
    });
    if (dailyTip.tip) {
        tipCache.set(cacheKey, dailyTip.tip);
    }
    return dailyTip.tip;
  } catch (error) {
    console.error("Error fetching daily tip:", error);
    return "Could not generate a tip today. Please try again later.";
  }
}

export async function getQuizQuestions(input: GenerateQuizQuestionsInput): Promise<QuizQuestion[] | null> {
  const cacheKey = `${input.word}-${input.difficulty}`;
  if (quizCache.has(cacheKey)) {
    return quizCache.get(cacheKey)!;
  }
  try {
    const result = await generateQuizQuestions(input);
    if (result.questions) {
      quizCache.set(cacheKey, result.questions);
      return result.questions;
    }
    return null;
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return null;
  }
}
