import { getDailyWord, getDailyTip } from "@/app/actions";
import { WordDisplay } from "@/components/app/word-display";
import { AdSensePlaceholder } from "@/components/app/adsense-placeholder";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const today = new Date().toISOString().split("T")[0];
  const wordData = await getDailyWord(today);
  
  if (!wordData) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full">
        <h1 className="text-2xl font-bold text-destructive">Oops!</h1>
        <p className="text-muted-foreground mt-2">We couldn't fetch the word for today. Please check back later.</p>
      </div>
    );
  }

  const dailyTip = await getDailyTip(wordData);
  
  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="w-full h-auto min-h-[90px] rounded-lg border-2 border-dashed bg-muted/50 p-4 flex items-center justify-center">
        <AdSensePlaceholder />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Word of the Day</h1>
        <p className="mt-2 text-lg text-muted-foreground">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <WordDisplay wordData={wordData} dailyTip={dailyTip} />
      <div className="text-center pt-4">
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href="/quiz">Test Your Knowledge!</Link>
        </Button>
      </div>
    </div>
  );
}