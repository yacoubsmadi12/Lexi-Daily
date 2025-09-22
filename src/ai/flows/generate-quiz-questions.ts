'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a quiz based on a word and difficulty level.
 *
 * - generateQuizQuestions - A function that returns a quiz.
 * - GenerateQuizQuestionsInput - The input type for the generateQuizQuestions function.
 * - GenerateQuizQuestionsOutput - The return type for the generateQuizQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { GenerateQuizQuestionsInputSchema, GenerateQuizQuestionsOutputSchema, type GenerateQuizQuestionsInput, type GenerateQuizQuestionsOutput, QuizQuestionSchema } from '@/lib/types';


export async function generateQuizQuestions(input: GenerateQuizQuestionsInput): Promise<GenerateQuizQuestionsOutput> {
  return generateQuizQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuizQuestionsPrompt',
  input: {schema: GenerateQuizQuestionsInputSchema},
  output: {schema: GenerateQuizQuestionsOutputSchema},
  prompt: `You are an AI assistant that creates vocabulary quizzes. Generate 5 multiple-choice questions based on the provided word, its definition, and the selected difficulty level.

Word: {{{word}}}
Definition: {{{definition}}}
Difficulty: {{{difficulty}}}

- For "Easy" difficulty, questions should be about the word's direct definition or a very simple synonym/antonym.
- For "Medium" difficulty, questions can involve sentence completion or identifying the word's function (part of speech).
- For "Hard" difficulty, create questions that require understanding nuanced meanings, idiomatic expressions, or comparing it to other complex words.

Ensure all questions are unique and the options are plausible.
The output must be a JSON object that strictly follows this schema:
${JSON.stringify(GenerateQuizQuestionsOutputSchema)}
`,
});

const generateQuizQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuizQuestionsFlow',
    inputSchema: GenerateQuizQuestionsInputSchema,
    outputSchema: GenerateQuizQuestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
