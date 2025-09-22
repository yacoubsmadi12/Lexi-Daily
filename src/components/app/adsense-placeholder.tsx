"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: any;
  }
}

export function AdSensePlaceholder() {
  const adRef = useRef<HTMLModElement>(null);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            console.error("AdSense error:", err);
          }
          if (observerRef.current && adRef.current) {
            observerRef.current.unobserve(adRef.current);
          }
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: '0px',
      threshold: 0.1
    });

    if (adRef.current) {
      observerRef.current.observe(adRef.current);
    }

    return () => {
      if (observerRef.current && adRef.current) {
        observerRef.current.unobserve(adRef.current);
      }
    };
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block", textAlign: "center" }}
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-1493226158255742"
      data-ad-slot="8316792805"
    ></ins>
  );
}
