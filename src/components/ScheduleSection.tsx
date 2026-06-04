import { MOVIES, getSessionStatus, formatDuration } from "@/data/movies";
import { useLiveClock } from "@/hooks/useLiveClock";
import Icon from "@/components/ui/icon";

const SCHEDULE_DAYS = [
  {
    key: "june6",
    label: "6 июня",
    description: "Суббота",
  },
  {
    key: "june13",
    label: "13 июня",
    description: "Суббота",
  },
];

export default function ScheduleSection() {
  const { totalMinutes, monthNum, dateNum } = useLiveClock();

  return (
    <section id="schedule" className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2
          className="text-4xl font-black mb-2 gradient-text"
          style={{ fontFamily: "'Oswald', sans-serif" }}
        >
          РАСПИСАНИЕ
        </h2>
        <p className="text-muted-foreground mb-10">Все сеансы с автоматическим статусом</p>

        <div className="space-y-8">
          {SCHEDULE_DAYS.map((dayInfo) => {
            const dayMovies = MOVIES.filter((m) => m.sessions.some((s) => s.day === dayInfo.key));

            return (
              <div key={dayInfo.key}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px flex-1 bg-border" />
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-muted border border-border">
                    <Icon name="Calendar" size={14} className="text-[hsl(var(--cinema-gold))]" />
                    <span className="font-bold text-sm">{dayInfo.label}</span>
                    <span className="text-xs text-muted-foreground">{dayInfo.description}</span>
                  </div>
                  <div className="h-px flex-1 bg-border" />
                </div>

                <div className="space-y-3">
                  {dayMovies
                    .sort((a, b) => a.sessions[0].timeMinutes - b.sessions[0].timeMinutes)
                    .map((movie) => {
                      const session = movie.sessions.find((s) => s.day === dayInfo.key)!;
                      const liveStatus = getSessionStatus(movie, totalMinutes, monthNum, dateNum);
                      const isLive = !!liveStatus;

                      const endMinutes = session.timeMinutes + movie.duration;
                      const endH = Math.floor(endMinutes / 60);
                      const endM = endMinutes % 60;
                      const endTime = `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;

                      return (
                        <div
                          key={movie.id}
                          className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                            isLive
                              ? "bg-red-600/10 border-red-500/40 glow-purple"
                              : "bg-card border-border"
                          }`}
                        >
                          <img
                            src={movie.poster}
                            alt={movie.title}
                            className="w-14 h-20 object-cover rounded-xl shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 mb-1 flex-wrap">
                              <h4
                                className="font-bold text-foreground"
                                style={{ fontFamily: "'Oswald', sans-serif" }}
                              >
                                {movie.title}
                              </h4>
                              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                                {movie.ageRating}
                              </span>
                              {isLive && (
                                <span className="flex items-center gap-1 text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white pulse-dot" />
                                  ИДЁТ СЕАНС
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground flex items-center gap-3">
                              <span className="flex items-center gap-1">
                                <Icon name="Clock" size={11} />
                                {formatDuration(movie.duration)}
                              </span>
                              <span>{movie.genre}</span>
                            </div>
                            {isLive && liveStatus && (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs text-red-400 mb-1">
                                  <span>Прошло {liveStatus.elapsed} мин</span>
                                  <span>Осталось {liveStatus.remaining} мин</span>
                                </div>
                                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                  <div
                                    className="h-full bg-red-500 rounded-full transition-all duration-60000"
                                    style={{
                                      width: `${Math.round((liveStatus.elapsed / movie.duration) * 100)}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="text-right shrink-0">
                            <div
                              className={`text-2xl font-black ${isLive ? "text-red-400" : "text-[hsl(var(--cinema-gold))]"}`}
                              style={{ fontFamily: "'Oswald', sans-serif" }}
                            >
                              {session.time}
                            </div>
                            <div className="text-xs text-muted-foreground">{endTime}</div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}