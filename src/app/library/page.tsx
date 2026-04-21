"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import wisdoms from "@/data/wisdoms.json";
import type { Wisdom } from "@/types/wisdom";
import { loadSeenIds } from "@/lib/wisdom-selector";

const allWisdoms = wisdoms as Wisdom[];

const categoryLabel: Record<Wisdom["source"]["category"], string> = {
  christian: "성경",
  buddhist: "불경",
  confucian: "유교",
  taoist: "도가",
  philosophy: "철학",
};

function formatSource(w: Wisdom): string {
  const cat = categoryLabel[w.source.category];
  const book = w.source.book;
  const chapter = w.source.chapter ? ` ${w.source.chapter}` : "";
  return `${cat} · ${book}${chapter}`;
}

export default function LibraryPage() {
  const [seenIds, setSeenIds] = useState<Set<string>>(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSeenIds(loadSeenIds());
    setMounted(true);
  }, []);

  const total = allWisdoms.length;
  const unlocked = mounted ? seenIds.size : 0;

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-20 gap-10">
      <nav className="w-full max-w-xl flex items-center justify-end text-muted">
        <Link
          href="/"
          aria-label="닫기"
          className="hover:text-foreground-soft transition-colors p-1 -m-1"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </Link>
      </nav>

      <header className="flex flex-col items-center gap-3">
        <h1 className="text-[1.4rem] md:text-[1.6rem] text-foreground tracking-[0.15em]">
          지혜의 서
        </h1>
        <p className="text-[0.75rem] tracking-[0.3em] uppercase text-muted">
          {unlocked} / {total}
        </p>
        <div className="h-[2px] w-32 bg-rule/40 overflow-hidden rounded-full mt-1">
          <div
            className="h-full bg-accent transition-all duration-700"
            style={{ width: `${(unlocked / total) * 100}%` }}
          />
        </div>
      </header>

      <ol className="w-full max-w-xl flex flex-col divide-y divide-rule/30 border-y border-rule/30 opacity-0 animate-fade-in">
        {allWisdoms.map((w, i) => {
          const isUnlocked = seenIds.has(w.id);
          const number = String(i + 1).padStart(2, "0");
          return (
            <li key={w.id}>
              {isUnlocked ? (
                <Link
                  href={`/?id=${w.id}`}
                  className="flex items-baseline gap-5 py-4 px-2 group hover:bg-foreground/[0.03] transition-colors"
                >
                  <span className="text-[0.7rem] tracking-[0.2em] text-muted w-8">
                    {number}
                  </span>
                  <span className="flex-1 text-[0.95rem] text-foreground-soft group-hover:text-foreground transition-colors">
                    {formatSource(w)}
                  </span>
                  <span className="text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    ›
                  </span>
                </Link>
              ) : (
                <div className="flex items-baseline gap-5 py-4 px-2 cursor-not-allowed select-none">
                  <span className="text-[0.7rem] tracking-[0.2em] text-muted/50 w-8">
                    {number}
                  </span>
                  <span className="flex-1 text-[0.95rem] text-muted/40 tracking-[0.3em]">
                    ???
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {mounted && unlocked === total ? (
        <p className="text-[0.7rem] tracking-[0.35em] uppercase text-accent">
          지혜의 서를 모두 펼쳐보셨습니다
        </p>
      ) : null}
    </main>
  );
}
