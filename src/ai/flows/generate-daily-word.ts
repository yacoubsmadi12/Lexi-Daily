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
import { GenerateDailyWordInputSchema, GenerateDailyWordOutputSchema, type GenerateDailyWordInput, type GenerateDailyWordOutput } from '@/lib/types';


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
