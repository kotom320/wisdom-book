import Link from "next/link";
import { WisdomOfTheDay } from "@/components/WisdomOfTheDay";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 gap-6">
      <header className="w-full max-w-xl flex items-center text-muted">
        <Link
          href="/library"
          aria-label="목차 열기"
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
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </Link>
      </header>

      <WisdomOfTheDay />
    </main>
  );
}
