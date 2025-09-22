import {z} from 'zod';

// Daily Word Schemas
export const GenerateDailyWordInputSchema = z.object({
  date: z.string().describe('The date for which to generate the word (YYYY-MM-DD).'),
});
export type GenerateDailyWordInput = z.infer<typeof GenerateDailyWordInputSchema>;

export const GenerateDailyWordOutputSchema = z.object({
  word: z.string().describe('The English word of the day.'),
  definition: z.string().describe('The definition of the word.'),
  synonyms: z.array(z.string()).describe('Synonyms for the word.'),
  antonyms: z.array(z.string()).describe('Antonyms for the word.'),
  ipaPhonetics: z.string().describe('IPA phonetic transcription of the word.'),
  partOfSpeech: z.string().describe('Part of speech of the word (e.g., noun, verb, adjective).'),
  cefrLevel: z.string().describe('CEFR level of the word (e.g., A1, A2, B1, B2, C1, C2).'),
  exampleSentences: z.array(
    z.object({
      english: z.string().describe('Example sentence in English.'),
      arabic: z.string().describe('Example sentence in Arabic.'),
    })
  ).describe('Example sentences showing how to use the word, with Arabic translations.'),
});
export type GenerateDailyWordOutput = z.infer<typeof GenerateDailyWordOutputSchema>;
export type DailyWord = GenerateDailyWordOutput;


// Daily Tip Schemas
export const GenerateDailyTipInputSchema = z.object({
  word: z.string().describe('The word of the day.'),
  definition: z.string().describe('The definition of the word.'),
  exampleSentences: z.array(z.string()).describe('Example sentences using the word.'),
});
export type GenerateDailyTipInput = z.infer<typeof GenerateDailyTipInputSchema>;

export const GenerateDailyTipOutputSchema = z.object({
  tip: z.string().describe('A tip on how to use the word in practical contexts.'),
});
export type GenerateDailyTipOutput = z.infer<typeof GenerateDailyTipOutputSchema>;


// Quiz Schemas
export const QuizQuestionSchema = z.object({
  question: z.string().describe("The question text."),
  options: z.array(z.string()).describe("An array of 4 multiple-choice options."),
  correctAnswer: z.string().describe("The correct answer from the options."),
  explanation: z.string().describe("A brief explanation for why the answer is correct."),
});
export type QuizQuestion = z.infer<typeof QuizQuestionSchema>;

export const GenerateQuizQuestionsInputSchema = z.object({
  word: z.string().describe("The word to base the quiz on."),
  definition: z.string().describe("The definition of the word."),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty level of the quiz."),
});
export type GenerateQuizQuestionsInput = z.infer<typeof GenerateQuizQuestionsInputSchema>;

export const GenerateQuizQuestionsOutputSchema = z.object({
  questions: z.array(QuizQuestionSchema).describe("An array of 5 quiz questions."),
});
export type GenerateQuizQuestionsOutput = z.infer<typeof GenerateQuizQuestionsOutputSchema>;


// User Progress
export type UserProgress = {
  lastVisitedDate: string | null;
  streak: number;
  points: number;
  learnedWords: string[];
};
