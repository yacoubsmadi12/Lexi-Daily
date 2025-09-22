'use server';

/**
 * @fileOverview Generates a daily tip for the word of the day.
 *
 * - generateDailyTip - A function that generates a tip for the word of the day.
 * - GenerateDailyTipInput - The input type for the generateDailyTip function.
 * - GenerateDailyTipOutput - The return type for the generateDailyTip function.
 */

import {ai} from '@/ai/genkit';
import { GenerateDailyTipInputSchema, GenerateDailyTipOutputSchema, type GenerateDailyTipInput, type GenerateDailyTipOutput } from '@/lib/types';


export async function generateDailyTip(input: GenerateDailyTipInput): Promise<GenerateDailyTipOutput> {
  return generateDailyTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDailyTipPrompt',
  input: {schema: GenerateDailyTipInputSchema},
  output: {schema: GenerateDailyTipOutputSchema},
  prompt: `You are an AI assistant designed to provide helpful tips on how to use English words in practical contexts.

  Given the word, its definition, and example sentences, your task is to generate a unique and insightful tip that helps users understand how to effectively incorporate the word into their daily communication.

  Word: {{{word}}}
  Definition: {{{definition}}}
  Example Sentences:
  {{#each exampleSentences}}
  - {{{this}}}
  {{/each}}

  Please provide a tip that is concise, easy to understand, and directly relevant to using the word in real-life situations.
  The tip should not reiterate any information found above.
  It should reason whether or not to suggest information that supplements what the user may learn in the 'Word of the Day' feature, by examining context.
  Ensure the tip does not exceed 50 words.
  The tip should be engaging and encourage the user to actively use the word.
  Focus on a practical application or common usage scenario.
`,
});

const generateDailyTipFlow = ai.defineFlow(
  {
    name: 'generateDailyTipFlow',
    inputSchema: GenerateDailyTipInputSchema,
    outputSchema: GenerateDailyTipOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
