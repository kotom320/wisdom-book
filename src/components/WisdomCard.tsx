import type { Wisdom } from "@/types/wisdom";

const categoryLabel: Record<Wisdom["source"]["category"], string> = {
  christian: "성경",
  buddhist: "불경",
  confucian: "유교",
  taoist: "도가",
  philosophy: "철학",
};

export function WisdomCard({ wisdom }: { wisdom: Wisdom }) {
  const { source, original, modern, interpretation } = wisdom;
  const sourceLabel = `${categoryLabel[source.category]} · ${source.book}${
    source.chapter ? ` ${source.chapter}` : ""
  }`;

  return (
    <article className="paper w-full max-w-xl px-9 py-14 md:px-14 md:py-20">
      <header className="ornament mb-10 text-[0.65rem] md:text-[0.7rem] tracking-[0.4em] uppercase">
        <span>{sourceLabel}</span>
      </header>

      <blockquote className="text-[1.05rem] md:text-[1.2rem] leading-[2.1] text-foreground-soft text-center mb-10 tracking-[0.02em]">
        {original}
      </blockquote>

      <div className="ornament mb-8">
        <span className="text-[0.6rem] tracking-[0.45em]">풀어 읽으면</span>
      </div>

      <p className="text-[1rem] md:text-[1.1rem] leading-[2] text-foreground-soft text-center italic mb-12">
        {modern}
      </p>

      <div className="ornament mb-8">
        <span className="text-[0.6rem] tracking-[0.45em]">오늘의 당신에게</span>
      </div>

      <p className="hero-text text-[1.3rem] md:text-[1.55rem] leading-[2] md:leading-[2.1] text-foreground tracking-[0.02em] text-center">
        {interpretation}
      </p>
    </article>
  );
}
