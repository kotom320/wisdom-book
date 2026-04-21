"use client";

import { useEffect, useState } from "react";
import wisdoms from "@/data/wisdoms.json";
import type { Wisdom } from "@/types/wisdom";
import { WisdomCard } from "./WisdomCard";
import {
  getOrCreateUserId,
  getTodayDateKey,
  pickByDailySeed,
} from "@/lib/wisdom-selector";

export function WisdomOfTheDay() {
  const [wisdom, setWisdom] = useState<Wisdom | null>(null);

  useEffect(() => {
    const uid = getOrCreateUserId();
    const dateKey = getTodayDateKey();
    const picked = pickByDailySeed(wisdoms as Wisdom[], uid, dateKey);
    setWisdom(picked);
  }, []);

  if (!wisdom) {
    return <WisdomCardSkeleton />;
  }

  return (
    <div className="w-full max-w-xl animate-fade-in">
      <WisdomCard wisdom={wisdom} />
    </div>
  );
}

function WisdomCardSkeleton() {
  return (
    <article className="paper w-full max-w-xl px-9 py-14 md:px-14 md:py-20 min-h-[520px] flex flex-col items-center justify-center gap-6 opacity-70">
      <div className="h-3 w-32 rounded-full bg-foreground/10 animate-pulse" />
      <div className="mt-6 flex flex-col items-center gap-3 w-full">
        <div className="h-3 w-4/5 rounded-full bg-foreground/10 animate-pulse" />
        <div className="h-3 w-3/5 rounded-full bg-foreground/10 animate-pulse" />
      </div>
    </article>
  );
}
