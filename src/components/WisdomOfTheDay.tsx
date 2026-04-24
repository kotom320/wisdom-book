"use client";

import { useEffect, useState } from "react";
import wisdoms from "@/data/wisdoms.json";
import type { Wisdom } from "@/types/wisdom";
import { WisdomCard } from "./WisdomCard";
import {
  getOrCreateUserId,
  getTodayDateKey,
  markSeen,
  pickByDailySeed,
} from "@/lib/wisdom-selector";

const allWisdoms = wisdoms as Wisdom[];

export function WisdomOfTheDay() {
  const [wisdom, setWisdom] = useState<Wisdom | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forcedId = params.get("id");

    let picked: Wisdom;
    if (forcedId) {
      const found = allWisdoms.find((w) => w.id === forcedId);
      picked = found ?? pickByDailySeed(allWisdoms, getOrCreateUserId(), getTodayDateKey());
    } else {
      picked = pickByDailySeed(allWisdoms, getOrCreateUserId(), getTodayDateKey());
    }

    setWisdom(picked);
    markSeen(picked.id);
  }, []);

  if (!wisdom) {
    return <WisdomCardSkeleton />;
  }

  return (
    <div key={wisdom.id} className="w-full max-w-xl animate-fade-in">
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
