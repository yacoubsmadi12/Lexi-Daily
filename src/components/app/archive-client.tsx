"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { AdSensePlaceholder } from "./adsense-placeholder";

export function ArchiveClient() {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      router.push(`/word/${formattedDate}`);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="flex justify-center items-center p-4 shadow-lg">
        <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => date > new Date() || date < new Date("2023-01-01")}
            initialFocus
        />
        </Card>
        <div className="space-y-4">
            <div className="w-full h-auto min-h-[250px] rounded-lg border-2 border-dashed bg-muted/50 p-4 flex items-center justify-center">
                <AdSensePlaceholder />
            </div>
            <p className="text-sm text-center text-muted-foreground">Small ad unit between entries</p>
            <div className="w-full h-auto min-h-[250px] rounded-lg border-2 border-dashed bg-muted/50 p-4 flex items-center justify-center">
                <AdSensePlaceholder />
            </div>
        </div>
    </div>
  );
}