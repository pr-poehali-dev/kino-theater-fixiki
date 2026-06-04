export interface Movie {
  id: number;
  title: string;
  year: number;
  country: string;
  genre: string;
  duration: number; // minutes
  ageRating: string;
  description: string;
  poster: string;
  sessions: Session[];
  comingSoon?: boolean;
}

export interface Session {
  day: string; // ключ для группировки в расписании
  dayLabel: string;
  time: string; // "HH:MM"
  timeMinutes: number; // total minutes from midnight
  // Конкретная дата сеанса
  date: { month: number; day: number }; // month: 1-based
}

export const MOVIES: Movie[] = [
  {
    id: 1,
    title: "Фиксики против Кработов",
    year: 2019,
    country: "Россия",
    genre: "Мультфильм, Приключения",
    duration: 82,
    ageRating: "0+",
    description:
      "Фиксики – маленькие добрые человечки, которые живут в машинах и приборах и заботятся о технике. От людей фиксики скрываются: в мире есть всего несколько счастливчиков, которые общаются с ними. В лаборатории профессора Чудакова находится школа фиксиков, о которой знают только мальчик ДимДимыч и его подруга Катя. Но однажды там появляются неуловимые существа — Кработы!",
    poster:
      "https://cdn.poehali.dev/projects/848725dc-7e78-45d6-bbe4-50e88ecc1b68/bucket/b28946ab-4680-46f0-be96-99fdb12c05e7.jpg",
    sessions: [
      {
        day: "june7",
        dayLabel: "7 июня",
        time: "11:00",
        timeMinutes: 660,
        date: { month: 6, day: 7 },
      },
    ],
  },
  {
    id: 2,
    title: "Смешарики. Начало",
    year: 2011,
    country: "Россия",
    genre: "Мультфильм, Приключения",
    duration: 87,
    ageRating: "0+",
    description:
      "Первый полнометражный фильм франшизы, предыстория любимых героев. Однажды Крош и Ёжик попадают в пещеру вымерших динозавров, где находят странный аппарат — телевизор! Загипнотизированные удивительным зрелищем, друзья открывают для себя дивный новый мир и отправляются по океану в Мегаполис, чтобы помешать злодею захватить мир.",
    poster:
      "https://cdn.poehali.dev/projects/848725dc-7e78-45d6-bbe4-50e88ecc1b68/bucket/fdacd1d2-6007-4166-828f-213627c7f477.jpeg",
    sessions: [
      {
        day: "june7",
        dayLabel: "7 июня",
        time: "14:00",
        timeMinutes: 840,
        date: { month: 6, day: 7 },
      },
    ],
  },
  {
    id: 3,
    title: "Смешарики снимают кино",
    year: 2023,
    country: "Россия",
    genre: "Мультфильм, Приключения",
    duration: 52,
    ageRating: "6+",
    description:
      "Смешарики снимают кино! И не просто кино, а целый сборник из нескольких короткометражных фильмов. В программе боевик и комедия, фантастика и фэнтези, мюзикл и немое кино. А также эльфы, феи, древние пророчества, мировое зло, Пин Бонд и роботы-дроиды.",
    poster:
      "https://cdn.poehali.dev/projects/848725dc-7e78-45d6-bbe4-50e88ecc1b68/bucket/10d36d63-2eb3-4c62-91cd-385d3817a493.jpeg",
    sessions: [
      {
        day: "june13",
        dayLabel: "13 июня",
        time: "11:00",
        timeMinutes: 660,
        date: { month: 6, day: 13 },
      },
    ],
    comingSoon: true,
  },
  {
    id: 4,
    title: "Тачки",
    year: 2006,
    country: "США",
    genre: "Мультфильм, Приключения",
    duration: 112,
    ageRating: "0+",
    description:
      "Неукротимый в своем желании всегда и во всем побеждать гоночный автомобиль «Молния» Маккуин вдруг обнаруживает, что сбился с пути и застрял в маленьком захолустном городке Радиатор-Спрингс на трассе 66. Участвуя в гонках на Кубок Поршня, Маккуин понимает, что в мире существуют вещи важнее, чем слава, призы и спонсоры.",
    poster:
      "https://cdn.poehali.dev/projects/848725dc-7e78-45d6-bbe4-50e88ecc1b68/bucket/2c12c37a-5757-4f69-9b1e-fb2cf42d69ab.jpg",
    sessions: [
      {
        day: "june13",
        dayLabel: "13 июня",
        time: "11:00",
        timeMinutes: 660,
        date: { month: 6, day: 13 },
      },
    ],
    comingSoon: true,
  },
];

// Проверяет совпадение по конкретной дате (месяц + день)
function sessionMatchesDate(
  session: Session,
  monthNum: number, // 1-based
  dateNum: number
): boolean {
  return session.date.month === monthNum && session.date.day === dateNum;
}

export function getSessionStatus(
  movie: Movie,
  nowMinutes: number,
  monthNum: number,
  dateNum: number
): { isLive: boolean; elapsed: number; remaining: number; sessionTime: string } | null {
  for (const session of movie.sessions) {
    if (sessionMatchesDate(session, monthNum, dateNum)) {
      const start = session.timeMinutes;
      const end = start + movie.duration;
      if (nowMinutes >= start && nowMinutes < end) {
        return {
          isLive: true,
          elapsed: nowMinutes - start,
          remaining: end - nowMinutes,
          sessionTime: session.time,
        };
      }
    }
  }
  return null;
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} мин`;
  if (m === 0) return `${h} ч`;
  return `${h} ч ${m} мин`;
}
