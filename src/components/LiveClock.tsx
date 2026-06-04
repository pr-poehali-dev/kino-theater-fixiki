import { useLiveClock } from "@/hooks/useLiveClock";
import { MOVIES, getSessionStatus, getSessionCountdown } from "@/data/movies";
import Icon from "@/components/ui/icon";

export default function LiveClock() {
  const { timeString, dateString, isOpen, totalMinutes, monthNum, dateNum } = useLiveClock();

  // Фильм, который сейчас идёт
  const liveMovie = MOVIES.find((m) => !!getSessionStatus(m, totalMinutes, monthNum, dateNum));
  const liveStatus = liveMovie ? getSessionStatus(liveMovie, totalMinutes, monthNum, dateNum) : null;

  // Ближайший фильм сегодня, до которого ещё не начался
  const nextMovie = !liveMovie
    ? MOVIES.filter((m) => !!getSessionCountdown(m, totalMinutes, monthNum, dateNum))
        .sort((a, b) => {
          const ca = getSessionCountdown(a, totalMinutes, monthNum, dateNum)!;
          const cb = getSessionCountdown(b, totalMinutes, monthNum, dateNum)!;
          return ca.minutesLeft - cb.minutesLeft;
        })[0]
    : null;
  const nextCountdown = nextMovie ? getSessionCountdown(nextMovie, totalMinutes, monthNum, dateNum) : null;

  return (
    <div className="flex flex-col items-center gap-3">
      {/* Статус открыто/закрыто */}
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

      {/* Баннер идущего сеанса */}
      {liveMovie && liveStatus && (
        <div className="flex items-center gap-3 bg-red-600/15 border border-red-500/40 rounded-2xl px-5 py-3 max-w-sm w-full">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 pulse-dot shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-red-400 font-bold uppercase tracking-wide mb-0.5">Идёт сеанс</div>
            <div className="text-sm font-bold text-foreground truncate" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {liveMovie.title}
            </div>
            <div className="text-xs text-red-300 mt-0.5">
              Ещё <span className="font-bold">{liveStatus.remaining} мин</span> до конца
            </div>
          </div>
          <Icon name="Film" size={18} className="text-red-400 shrink-0" />
        </div>
      )}

      {/* Баннер ближайшего сеанса */}
      {nextMovie && nextCountdown && (
        <div className="flex items-center gap-3 bg-[hsl(var(--cinema-gold))]/10 border border-[hsl(var(--cinema-gold))]/40 rounded-2xl px-5 py-3 max-w-sm w-full">
          <Icon name="Clock" size={18} className="text-[hsl(var(--cinema-gold))] shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-xs text-[hsl(var(--cinema-gold))] font-bold uppercase tracking-wide mb-0.5">Скоро сеанс</div>
            <div className="text-sm font-bold text-foreground truncate" style={{ fontFamily: "'Oswald', sans-serif" }}>
              {nextMovie.title}
            </div>
            <div className="text-xs text-[hsl(var(--cinema-gold))]/80 mt-0.5">
              Ещё <span className="font-bold">{nextCountdown.minutesLeft} мин</span> до начала
            </div>
          </div>
          <span className="text-lg font-black text-[hsl(var(--cinema-gold))]" style={{ fontFamily: "'Oswald', sans-serif" }}>
            {nextCountdown.sessionTime}
          </span>
        </div>
      )}

      {/* Часы */}
      <div
        className="font-mono text-5xl md:text-6xl font-black tracking-widest gradient-text"
        style={{ fontFamily: "'Oswald', sans-serif" }}
      >
        {timeString}
      </div>

      <div className="text-sm text-muted-foreground">{dateString}</div>
    </div>
  );
}
