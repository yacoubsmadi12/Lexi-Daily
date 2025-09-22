"use client";

import { useState, useEffect } from 'react';
import { useUserProgress } from '@/hooks/use-user-progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Award, BrainCircuit, BookCopy } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { DailyWord, QuizQuestion, GenerateQuizQuestionsInput } from '@/lib/types';
import { getDailyWord, getQuizQuestions } from '@/app/actions';

type Difficulty = "Easy" | "Medium" | "Hard";

export function QuizClient() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const { addPoints, addLearnedWord, isLoaded: progressLoaded } = useUserProgress();
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wordOfTheDay, setWordOfTheDay] = useState<DailyWord | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWord() {
      const today = new Date().toISOString().split("T")[0];
      const wordData = await getDailyWord(today);
      setWordOfTheDay(wordData);
    }
    fetchWord();
  }, []);

  const handleStartQuiz = async () => {
    if (!difficulty || !wordOfTheDay) return;
    setIsLoading(true);
    setError(null);
    try {
      const quizQuestions = await getQuizQuestions({
        word: wordOfTheDay.word,
        definition: wordOfTheDay.definition,
        difficulty: difficulty,
      });
      if (quizQuestions && quizQuestions.length > 0) {
        setQuestions(quizQuestions);
        // Do not call handleRestart here, questions are now set, quiz will start on next render
      } else {
        setError("Could not generate quiz questions. Please try again later.");
      }
    } catch (e) {
      setError("An unexpected error occurred. Please try again later.");
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const points = score * 10;
      addPoints(points);
      if (wordOfTheDay) {
        addLearnedWord(wordOfTheDay.word);
      }
      setIsQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizFinished(false);
    setQuestions([]);
    setDifficulty(null);
  };
  
  if (!progressLoaded || !wordOfTheDay) {
      return (
          <Card className="flex items-center justify-center p-8">
              <BrainCircuit className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4 text-lg">Loading Quiz...</p>
          </Card>
      )
  }

  if (questions.length === 0) {
    return (
      <Card className="shadow-lg text-center">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center justify-center gap-2">
            <BookCopy className="h-6 w-6" />
            Quiz for "{wordOfTheDay.word}"
            </CardTitle>
          <CardDescription>Select a difficulty to start the quiz.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Select onValueChange={(value: Difficulty) => setDifficulty(value)} value={difficulty || ''}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleStartQuiz} disabled={!difficulty || isLoading}>
            {isLoading ? "Generating..." : "Start Quiz"}
          </Button>
          {error && <p className="text-destructive text-sm mt-2">{error}</p>}
        </CardContent>
      </Card>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (isQuizFinished) {
    return (
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Award className="h-20 w-20 mx-auto text-accent" />
          <p className="text-xl">You scored</p>
          <p className="text-5xl font-bold text-primary">{score} / {questions.length}</p>
          <p className="text-muted-foreground">You earned {score * 10} points!</p>
        </CardContent>
        <CardFooter className="justify-center flex-col gap-4">
          <Button onClick={() => {
            setCurrentQuestionIndex(0);
            setSelectedAnswer(null);
            setIsAnswered(false);
            setScore(0);
            setIsQuizFinished(false);
          }}>Play Again with same questions</Button>
          <Button variant="outline" onClick={handleRestart}>Choose new difficulty</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="w-full" />
        <CardTitle className="pt-6 text-2xl text-center">
          {currentQuestion.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentQuestion.options.map((option) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedAnswer;
          
          return (
            <Button
              key={option}
              variant="outline"
              size="lg"
              className={cn(
                'w-full justify-start h-auto py-3 text-left',
                isAnswered && isCorrect && 'bg-green-500/10 border-green-500 text-green-700 dark:text-green-400',
                isAnswered && isSelected && !isCorrect && 'bg-red-500/10 border-red-500 text-red-700 dark:text-red-400'
              )}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
            >
              <div className="flex items-center w-full">
                <span className="flex-1">{option}</span>
                {isAnswered && isCorrect && <CheckCircle className="h-5 w-5 text-green-500" />}
                {isAnswered && isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-500" />}
              </div>
            </Button>
          );
        })}
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        {isAnswered && (
          <div className="text-center p-4 rounded-md bg-muted w-full">
            <p className="font-semibold">Explanation:</p>
            <p className="text-muted-foreground">{currentQuestion.explanation}</p>
          </div>
        )}
        <Button onClick={handleNext} disabled={!isAnswered} className="w-full">
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
}
