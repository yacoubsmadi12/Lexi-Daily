import { cn } from "@/lib/utils";

type AdSensePlaceholderProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
};

export function AdSensePlaceholder({
  className,
  width = "100%",
  height = "90px",
}: AdSensePlaceholderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-lg border-2 border-dashed bg-muted/50 text-muted-foreground",
        className
      )}
      style={{ width, height }}
    >
      {/* 
        Google AdSense Placeholder
        Replace this div with your AdSense code.
        Make sure to fill in your ca-pub and ad-slot IDs.

        Example:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="YYYYYYYYYY"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
             (adsbygoogle = window.adsbygoogle || []).push({});
        </script>
      */}
      <span className="text-sm">Ad Placeholder</span>
    </div>
  );
}
