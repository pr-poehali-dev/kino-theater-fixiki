import { useState } from "react";
import { MOVIES, Movie } from "@/data/movies";
import LiveClock from "@/components/LiveClock";
import MovieCard from "@/components/MovieCard";
import MovieModal from "@/components/MovieModal";
import ScheduleSection from "@/components/ScheduleSection";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { label: "Главная", href: "#home" },
  { label: "Фильмы", href: "#movies" },
  { label: "Расписание", href: "#schedule" },
  { label: "Адрес", href: "#address" },
];

export default function Index() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "now" | "soon">("all");
  const [menuOpen, setMenuOpen] = useState(false);

  const nowMovies = MOVIES.filter((m) => !m.comingSoon);
  const soonMovies = MOVIES.filter((m) => m.comingSoon);
  const displayMovies =
    activeTab === "all" ? MOVIES : activeTab === "now" ? nowMovies : soonMovies;

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[hsl(var(--cinema-gold))] flex items-center justify-center">
              <Icon name="Film" size={18} className="text-background" />
            </div>
            <span
              className="text-xl font-black gradient-text"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              КИНО ВАНИ
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 py-4 space-y-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-1"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,180,0,0.08)_0%,_rgba(150,80,220,0.05)_50%,_transparent_70%)]" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[hsl(var(--cinema-gold))]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[hsl(var(--cinema-purple))]/5 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-8 max-w-3xl">
          <div className="float-anim">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-[hsl(var(--cinema-gold))] to-[hsl(var(--cinema-purple))] flex items-center justify-center glow-gold mb-6">
              <Icon name="Clapperboard" size={40} className="text-white" />
            </div>
          </div>

          <div>
            <h1
              className="text-5xl md:text-7xl font-black mb-4"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              <span className="gradient-text">КИНОТЕАТР</span>
              <br />
              <span className="text-foreground">ВАНИ</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto">
              Лучшие мультфильмы для всей семьи — уютный домашний кинотеатр
            </p>
          </div>

          <LiveClock />

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#movies"
              className="inline-flex items-center justify-center gap-2 bg-[hsl(var(--cinema-gold))] text-background font-bold px-8 py-3.5 rounded-2xl hover:opacity-90 transition-opacity glow-gold"
            >
              <Icon name="Play" size={18} />
              Смотреть фильмы
            </a>
            <a
              href="#schedule"
              className="inline-flex items-center justify-center gap-2 bg-muted text-foreground font-bold px-8 py-3.5 rounded-2xl border border-border hover:border-[hsl(var(--cinema-gold))]/50 transition-colors"
            >
              <Icon name="CalendarDays" size={18} />
              Расписание
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* MOVIES */}
      <section id="movies" className="py-16 px-4 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <h2
                className="text-4xl font-black gradient-text mb-2"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                ФИЛЬМЫ
              </h2>
              <p className="text-muted-foreground">Все мультфильмы кинотеатра</p>
            </div>

            <div className="flex items-center gap-2 bg-muted rounded-2xl p-1">
              {[
                { key: "all", label: "Все" },
                { key: "now", label: "Идут сейчас" },
                { key: "soon", label: "Скоро" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.key
                      ? "bg-[hsl(var(--cinema-gold))] text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={setSelectedMovie} />
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <ScheduleSection />

      {/* ADDRESS */}
      <section id="address" className="py-16 px-4 bg-card/30">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl font-black gradient-text mb-2"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            КАК НАС НАЙТИ
          </h2>
          <p className="text-muted-foreground mb-10">Кинотеатр Вани в Тамбове</p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--cinema-gold))]/20 flex items-center justify-center shrink-0">
                  <Icon name="MapPin" size={22} className="text-[hsl(var(--cinema-gold))]" />
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">Адрес</div>
                  <div className="text-muted-foreground text-sm">г. Тамбов, ул. Мичуринская, 203</div>
                  <div className="text-muted-foreground text-sm">Подъезд 3, этаж 5, кв. 100</div>
                </div>
              </div>

              <div className="flex gap-4 p-5 rounded-2xl bg-card border border-border">
                <div className="w-12 h-12 rounded-2xl bg-[hsl(var(--cinema-cyan))]/20 flex items-center justify-center shrink-0">
                  <Icon name="Clock" size={22} className="text-[hsl(var(--cinema-cyan))]" />
                </div>
                <div>
                  <div className="font-bold text-foreground mb-1">Часы работы</div>
                  <div className="text-muted-foreground text-sm">Ежедневно: 10:00 – 23:00</div>
                  <div className="text-muted-foreground text-sm">По расписанию сеансов</div>
                </div>
              </div>

              <a
                href="https://yandex.ru/maps/?text=Тамбов+Мичуринская+203"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[hsl(var(--cinema-gold))] text-background font-bold px-6 py-3.5 rounded-2xl hover:opacity-90 transition-opacity glow-gold"
              >
                <Icon name="Navigation" size={18} />
                Открыть в Яндекс Картах
              </a>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border h-64 md:h-80">
              <iframe
                src="https://yandex.ru/map-widget/v1/?text=Тамбов+Мичуринская+203&z=16&lang=ru_RU"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Карта кинотеатра"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-[hsl(var(--cinema-gold))] flex items-center justify-center">
            <Icon name="Film" size={15} className="text-background" />
          </div>
          <span
            className="text-lg font-black gradient-text"
            style={{ fontFamily: "'Oswald', sans-serif" }}
          >
            КИНО ВАНИ
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          г. Тамбов, ул. Мичуринская, 203 · 10:00 – 23:00
        </p>
      </footer>

      {/* MODAL */}
      <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
    </div>
  );
}
