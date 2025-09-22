'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a daily English word with its definition,
 *               synonyms, antonyms, IPA phonetics, part of speech, CEFR level, and example sentences
 *               (with English and Arabic translations).
 *
 * - generateDailyWord - A function that returns a word of the day.
 * - GenerateDailyWordInput - The input type for the generateDailyWord function.
 * - GenerateDailyWordOutput - The return type for the generateDailyWord function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyWordInputSchema = z.object({
  date: z.string().describe('The date for which to generate the word (YYYY-MM-DD).'),
});
export type GenerateDailyWordInput = z.infer<typeof GenerateDailyWordInputSchema>;

const GenerateDailyWordOutputSchema = z.object({
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

export async function generateDailyWord(input: GenerateDailyWordInput): Promise<GenerateDailyWordOutput> {
  return generateDailyWordFlow(input);
}

const generateDailyWordPrompt = ai.definePrompt({
  name: 'generateDailyWordPrompt',
  input: {schema: GenerateDailyWordInputSchema},
  output: {schema: GenerateDailyWordOutputSchema},
  prompt: `You are an expert English teacher. Your task is to generate a single English word for a given date, along with its definition, synonyms, antonyms, IPA phonetics, part of speech, CEFR level, and example sentences (with English and Arabic translations).

  The date is: {{{date}}}.

  Ensure the word is appropriate for English language learners.
  Provide 2-3 example sentences.
  Provide a minimum of 3 synonyms and 3 antonyms, if available.
  Arabic translations MUST be accurate and idiomatic.

  Your output MUST be valid JSON that conforms to the following schema:
  ${JSON.stringify(GenerateDailyWordOutputSchema.describe('The JSON Schema for the word of the day.'))}
`,
});

const generateDailyWordFlow = ai.defineFlow(
  {
    name: 'generateDailyWordFlow',
    inputSchema: GenerateDailyWordInputSchema,
    outputSchema: GenerateDailyWordOutputSchema,
  },
  async input => {
    const {
      output,
    } = await generateDailyWordPrompt(input);
    return output!;
  }
);
