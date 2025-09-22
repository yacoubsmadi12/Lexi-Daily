import { QuizClient } from '@/components/app/quiz-client';
import { AdSensePlaceholder } from '@/components/app/adsense-placeholder';

export default function QuizPage() {
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Daily Quiz</h1>
                <p className="mt-2 text-lg text-muted-foreground">Test your vocabulary knowledge.</p>
            </div>
            <QuizClient />
        </div>
        <aside className="space-y-8">
          <h3 className="text-lg font-semibold text-center lg:text-left">Advertisement</h3>
          <AdSensePlaceholder className="w-full" height="250px" />
          <AdSensePlaceholder className="w-full hidden lg:flex" height="250px" />
        </aside>
      </div>
    </div>
  );
}
