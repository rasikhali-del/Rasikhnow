export interface SunniEntry {
  roza: number;
  date: string;
  sehr: string;
  zuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface ShiaEntry {
  roza: number;
  date: string;
  sehr: string;
  iftaar: string;
}

export interface Dua {
  title: string;
  arabic: string;
  english: string;
  urdu: string;
}
