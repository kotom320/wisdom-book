import { WisdomOfTheDay } from "@/components/WisdomOfTheDay";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-20 gap-14">
      <h1 className="text-muted tracking-[0.5em] text-[0.7rem] uppercase">
        지혜의 서
      </h1>

      <WisdomOfTheDay />
    </main>
  );
}
