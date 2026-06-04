import { Movie, getSessionStatus, formatDuration } from "@/data/movies";
import { useLiveClock } from "@/hooks/useLiveClock";
import Icon from "@/components/ui/icon";

interface MovieModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const { totalMinutes, monthNum, dateNum } = useLiveClock();

  if (!movie) return null;

  const liveStatus = getSessionStatus(movie, totalMinutes, monthNum, dateNum);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-card border border-border rounded-3xl overflow-hidden max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <Icon name="X" size={18} />
        </button>

        <div className="relative h-72 overflow-hidden">
          <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          {liveStatus && (
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
              <span className="w-2 h-2 rounded-full bg-white pulse-dot" />
              ИДЁТ СЕАНС — осталось {liveStatus.remaining} мин
            </div>
          )}
        </div>

        <div className="p-6 space-y-5">
          <div>
            <div className="flex items-start justify-between gap-3 mb-2">
              <h2
                className="text-3xl font-black text-foreground leading-tight"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                {movie.title}
              </h2>
              <span className="shrink-0 bg-[hsl(var(--cinema-gold))]/20 text-[hsl(var(--cinema-gold))] border border-[hsl(var(--cinema-gold))]/30 text-sm font-bold px-3 py-1 rounded-full">
                {movie.ageRating}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Icon name="Calendar" size={14} />
                {movie.year}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="Globe" size={14} />
                {movie.country}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="Clock" size={14} />
                {formatDuration(movie.duration)}
              </span>
              <span className="flex items-center gap-1.5">
                <Icon name="Film" size={14} />
                {movie.genre}
              </span>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{movie.description}</p>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-3">Сеансы</h4>
            <div className="space-y-2">
              {movie.sessions.map((s, i) => {
                const isThisLive =
                  liveStatus &&
                  liveStatus.sessionTime === s.time &&
                  s.date.month === monthNum &&
                  s.date.day === dateNum;

                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl ${
                      isThisLive
                        ? "bg-red-600/20 border border-red-500/50"
                        : "bg-muted border border-border"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-foreground">{s.dayLabel}</div>
                      <div className="text-xs text-muted-foreground">{formatDuration(movie.duration)}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black" style={{ fontFamily: "'Oswald', sans-serif" }}>
                        {s.time}
                      </div>
                      {isThisLive && liveStatus && (
                        <div className="text-xs text-red-400 flex items-center gap-1 justify-end">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 pulse-dot" />
                          идёт сеанс
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}