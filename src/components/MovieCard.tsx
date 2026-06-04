import { Movie, getSessionStatus, getSessionCountdown, formatDuration } from "@/data/movies";
import { useLiveClock } from "@/hooks/useLiveClock";
import Icon from "@/components/ui/icon";

interface MovieCardProps {
  movie: Movie;
  onClick: (movie: Movie) => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  const { totalMinutes, monthNum, dateNum } = useLiveClock();
  const liveStatus = getSessionStatus(movie, totalMinutes, monthNum, dateNum);
  const countdown = !liveStatus ? getSessionCountdown(movie, totalMinutes, monthNum, dateNum) : null;

  return (
    <div
      className="film-card-hover cursor-pointer group relative rounded-2xl overflow-hidden bg-card border border-border"
      onClick={() => onClick(movie)}
    >
      {liveStatus && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" />
          ИДЁТ СЕАНС
        </div>
      )}

      {movie.comingSoon && !liveStatus && (
        <div className="absolute top-3 right-3 z-10 bg-[hsl(var(--cinema-purple))] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
          СКОРО
        </div>
      )}

      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs bg-white/20 backdrop-blur-sm text-white px-2 py-0.5 rounded-full">
              {movie.ageRating}
            </span>
            <span className="text-xs text-white/70">{movie.year}</span>
          </div>
          <h3 className="text-white font-bold text-base leading-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
            {movie.title}
          </h3>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="Clock" size={12} />
            {formatDuration(movie.duration)}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Globe" size={12} />
            {movie.country}
          </span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{movie.description}</p>

        <div className="space-y-1">
          {movie.sessions.map((s, i) => {
            const isThisLive =
              liveStatus &&
              liveStatus.sessionTime === s.time &&
              s.date.month === monthNum &&
              s.date.day === dateNum;

            const isThisCountdown =
              countdown &&
              countdown.sessionTime === s.time &&
              s.date.month === monthNum &&
              s.date.day === dateNum;

            return (
              <div key={i} className="space-y-1">
                <div
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm font-semibold ${
                    isThisLive
                      ? "bg-red-600/20 border border-red-500/50 text-red-400"
                      : isThisCountdown
                      ? "bg-[hsl(var(--cinema-gold))]/10 border border-[hsl(var(--cinema-gold))]/40 text-[hsl(var(--cinema-gold))]"
                      : "bg-muted border border-border text-foreground"
                  }`}
                >
                  <span className="text-xs text-muted-foreground font-normal">{s.dayLabel}</span>
                  <span>{s.time}</span>
                </div>
                {isThisLive && liveStatus && (
                  <div className="flex items-center gap-1 text-xs text-red-400 px-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 pulse-dot shrink-0" />
                    ещё <span className="font-bold">{liveStatus.remaining} мин</span> до конца
                  </div>
                )}
                {isThisCountdown && countdown && (
                  <div className="flex items-center gap-1 text-xs text-[hsl(var(--cinema-gold))] px-1">
                    <Icon name="Clock" size={11} className="shrink-0" />
                    ещё <span className="font-bold">{countdown.minutesLeft} мин</span> до начала
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}