"use client";

import { useEffect, useState } from "react";
import wisdoms from "@/data/wisdoms.json";
import type { Wisdom } from "@/types/wisdom";
import { WisdomCard } from "./WisdomCard";
import {
  getOrCreateUserId,
  getTodayDateKey,
  loadSeenIds,
  markSeen,
  pickByDailySeed,
} from "@/lib/wisdom-selector";

const allWisdoms = wisdoms as Wisdom[];

export function WisdomOfTheDay() {
  const [wisdom, setWisdom] = useState<Wisdom | null>(null);
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const forcedId = params.get("id");

    let picked: Wisdom;
    if (forcedId) {
      const found = allWisdoms.find((w) => w.id === forcedId);
      picked = found ?? pickByDailySeed(allWisdoms, getOrCreateUserId(), getTodayDateKey());
    } else {
      const uid = getOrCreateUserId();
      const dateKey = getTodayDateKey();
      picked = pickByDailySeed(allWisdoms, uid, dateKey);
    }

    setWisdom(picked);
    setSeenIds(markSeen(picked.id));
  }, []);

  const pickAnother = () => {
    const unseen = allWisdoms.filter((w) => !seenIds.has(w.id));
    if (unseen.length === 0) return;
    const next = unseen[Math.floor(Math.random() * unseen.length)];
    setWisdom(next);
    setSeenIds(markSeen(next.id));
  };

  if (!wisdom) {
    return <WisdomCardSkeleton />;
  }

  const isAllSeen = seenIds.size >= allWisdoms.length;

  return (
    <div className="w-full max-w-xl flex flex-col items-center gap-10">
      <div key={wisdom.id} className="w-full animate-fade-in">
        <WisdomCard wisdom={wisdom} />
      </div>

      {isAllSeen ? (
        <p className="text-muted text-[0.7rem] tracking-[0.35em] uppercase">
          지혜의 서를 모두 펼쳐보셨습니다
        </p>
      ) : (
        <button
          type="button"
          onClick={pickAnother}
          className="group text-muted hover:text-foreground-soft text-[0.7rem] tracking-[0.4em] uppercase pb-1 border-b border-rule/40 hover:border-rule transition-colors"
        >
          한 구절 더
          <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">
            ›
          </span>
        </button>
      )}
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
