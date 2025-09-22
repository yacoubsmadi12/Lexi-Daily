import { getDailyWord, getDailyTip } from "@/app/actions";
import { WordDisplay } from "@/components/app/word-display";
import { AdSensePlaceholder } from "@/components/app/adsense-placeholder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type WordPageProps = {
  params: {
    date: string;
  };
};

export default async function WordPage({ params }: WordPageProps) {
  const { date } = params;
  const wordData = await getDailyWord(date);

  const displayDate = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

  if (!wordData) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full">
         <Button asChild variant="ghost" className="mb-4 self-start">
            <Link href="/archive"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Archive</Link>
        </Button>
        <h1 className="text-2xl font-bold text-destructive">Oops!</h1>
        <p className="text-muted-foreground mt-2">We couldn't fetch the word for {displayDate}.</p>
      </div>
    );
  }
  
  const dailyTip = await getDailyTip(wordData);

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
        <Button asChild variant="ghost" className="-ml-4">
            <Link href="/archive"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Archive</Link>
        </Button>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Word from {displayDate}</h1>
      </div>
      <WordDisplay wordData={wordData} dailyTip={dailyTip} />
    </div>
  );
}
