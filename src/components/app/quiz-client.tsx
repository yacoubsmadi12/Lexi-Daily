"use client";

import { useState } from 'react';
import { quizQuestions } from '@/lib/quiz-questions';
import { useUserProgress } from '@/hooks/use-user-progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle, Award, BrainCircuit } from 'lucide-react';

export function QuizClient() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const { addPoints, isLoaded } = useUserProgress();

  const currentQuestion = quizQuestions[currentQuestionIndex];

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
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      addPoints(score * 10);
      setIsQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsQuizFinished(false);
  };
  
  if (!isLoaded) {
      return (
          <Card className="flex items-center justify-center p-8">
              <BrainCircuit className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-4 text-lg">Loading Quiz...</p>
          </Card>
      )
  }

  if (isQuizFinished) {
    return (
      <Card className="text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Award className="h-20 w-20 mx-auto text-accent" />
          <p className="text-xl">You scored</p>
          <p className="text-5xl font-bold text-primary">{score} / {quizQuestions.length}</p>
          <p className="text-muted-foreground">You earned {score * 10} points!</p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button onClick={handleRestart}>Play Again</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <Progress value={((currentQuestionIndex + 1) / quizQuestions.length) * 100} className="w-full" />
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
          {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </Button>
      </CardFooter>
    </Card>
  );
}
