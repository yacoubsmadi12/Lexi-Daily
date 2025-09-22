import { ArchiveClient } from "@/components/app/archive-client";
import { AdSensePlaceholder } from "@/components/app/adsense-placeholder";

export default function ArchivePage() {
  return (
    <div className="container mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Word Archive</h1>
        <p className="mt-2 text-lg text-muted-foreground">Explore words from previous days.</p>
      </div>
      <div className="w-full h-auto min-h-[90px] rounded-lg border-2 border-dashed bg-muted/50 p-4 flex items-center justify-center">
        <AdSensePlaceholder />
      </div>
      <ArchiveClient />
    </div>
  );
}