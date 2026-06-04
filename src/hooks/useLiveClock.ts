import { useState, useEffect } from "react";

export interface ClockData {
  hours: number;
  minutes: number;
  seconds: number;
  timeString: string;
  dateString: string;
  dayOfWeek: number;
  dateNum: number;
  totalMinutes: number;
  isOpen: boolean;
}

export function useLiveClock(): ClockData {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const dayOfWeek = now.getDay();
  const dateNum = now.getDate();

  const pad = (n: number) => String(n).padStart(2, "0");
  const timeString = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  const days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  const months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const dateString = `${days[dayOfWeek]}, ${dateNum} ${months[now.getMonth()]}`;

  const totalMinutes = hours * 60 + minutes;
  const isOpen = hours >= 10 && hours < 23;

  return {
    hours,
    minutes,
    seconds,
    timeString,
    dateString,
    dayOfWeek,
    dateNum,
    totalMinutes,
    isOpen,
  };
}
