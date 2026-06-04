import { useLiveClock } from "@/hooks/useLiveClock";

export default function LiveClock() {
  const { timeString, dateString, isOpen } = useLiveClock();

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${
          isOpen
            ? "bg-green-500/20 text-green-400 border border-green-500/40"
            : "bg-red-500/20 text-red-400 border border-red-500/40"
        }`}
      >
        <span className={`w-2 h-2 rounded-full pulse-dot ${isOpen ? "bg-green-400" : "bg-red-400"}`} />
        {isOpen ? "ОТКРЫТО" : "ЗАКРЫТО"}
        <span className="text-xs opacity-70">{isOpen ? "10:00 – 23:00" : "Откроемся в 10:00"}</span>
      </div>

      <div
        className="font-mono text-5xl md:text-6xl font-black tracking-widest gradient-text"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {timeString}
      </div>

      <div className="text-sm text-muted-foreground capitalize">{dateString}</div>
    </div>
  );
}
