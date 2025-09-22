import type { QuizQuestion } from '@/lib/types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    word: 'Ephemeral',
    question: 'Which of the following is a synonym for "ephemeral"?',
    options: ['Permanent', 'Lasting', 'Transient', 'Eternal'],
    correctAnswer: 'Transient',
    explanation: '"Ephemeral" means lasting for a very short time, so "transient" is the closest synonym.',
  },
  {
    id: 2,
    word: 'Ubiquitous',
    question: 'What is the definition of "ubiquitous"?',
    options: [
      'Present, appearing, or found everywhere',
      'Extremely rare and hard to find',
      'Difficult to understand',
      'Only existing in one place',
    ],
    correctAnswer: 'Present, appearing, or found everywhere',
    explanation: '"Ubiquitous" describes something that is found everywhere, like smartphones in modern society.',
  },
  {
    id: 3,
    word: 'Mellifluous',
    question: 'A "mellifluous" sound is...',
    options: ['Harsh and grating', 'Loud and chaotic', 'Pleasantly smooth and musical', 'Silent'],
    correctAnswer: 'Pleasantly smooth and musical',
    explanation: '"Mellifluous" is used to describe a voice or sound that is sweet and pleasant to hear.',
  },
  {
    id: 4,
    word: 'Esoteric',
    question: 'If a topic is "esoteric," it is...',
    options: [
      'Common knowledge for everyone',
      'Intended for or likely to be understood by only a small number of people with a specialized knowledge',
      'Related to outdoor activities',
      'A subject taught in elementary schools',
    ],
    correctAnswer: 'Intended for or likely to be understood by only a small number of people with a specialized knowledge',
    explanation: '"Esoteric" refers to knowledge that is specialized and understood by a select few.',
  },
    {
    id: 5,
    word: 'Pulchritudinous',
    question: 'Which word is an antonym for "pulchritudinous"?',
    options: [
      'Beautiful',
      'Attractive',
      'Hideous',
      'Stunning',
    ],
    correctAnswer: 'Hideous',
    explanation: '"Pulchritudinous" means beautiful. "Hideous" is a direct antonym.',
  },
];
