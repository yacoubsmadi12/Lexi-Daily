"use client";

import type { DailyWord } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Speaker, Lightbulb } from "lucide-react";
import { AdSensePlaceholder } from "./adsense-placeholder";

type WordDisplayProps = {
  wordData: DailyWord;
  dailyTip: string | null;
};

export function WordDisplay({ wordData, dailyTip }: WordDisplayProps) {

  const handlePronunciation = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordData.word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    } else {
      alert("Your browser does not support text-to-speech.");
    }
  };

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl">
        <CardHeader className="bg-card-foreground/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-4xl font-bold text-primary sm:text-5xl">{wordData.word}</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">{wordData.ipaPhonetics}</CardDescription>
            </div>
            <button
              onClick={handlePronunciation}
              className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-110 active:scale-100"
              aria-label="Pronounce word"
            >
              <Speaker className="h-7 w-7 transition-all group-hover:fill-current" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <Badge variant="secondary">{wordData.partOfSpeech}</Badge>
            <Badge variant="secondary">CEFR: {wordData.cefrLevel}</Badge>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Definition</h3>
            <p className="mt-2 text-muted-foreground">{wordData.definition}</p>
          </div>

          <div className="w-full h-auto min-h-[100px] rounded-lg border-2 border-dashed bg-muted/50 p-4 flex items-center justify-center">
            <AdSensePlaceholder />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Synonyms</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {wordData.synonyms.map((s) => <Badge key={s} variant="outline">{s}</Badge>)}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight">Antonyms</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {wordData.antonyms.map((a) => <Badge key={a} variant="outline">{a}</Badge>)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {dailyTip && (
        <Card className="bg-accent/20 border-accent/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-accent-foreground">
              <Lightbulb className="h-6 w-6 text-accent" />
              Daily Tip
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-accent-foreground/90">{dailyTip}</p>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {wordData.exampleSentences.map((ex, i) => (
            <div key={i}>
              <p className="font-semibold text-lg">"{ex.english}"</p>
              <p className="text-muted-foreground text-right" dir="rtl">{ex.arabic}</p>
              {i < wordData.exampleSentences.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}