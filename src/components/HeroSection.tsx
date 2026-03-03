import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import AnalogClock from './AnalogClock';
import NotificationManager from './NotificationManager';
import { sunniTimetable } from '../data/sunni';
import { shiaTimetable } from '../data/shia';

interface HeroSectionProps {
  activeType: 'Sunni' | 'Shia';
}

const HeroSection = ({ activeType }: HeroSectionProps) => {
  const [countdown, setCountdown] = useState<{ hours: number, mins: number, secs: number } | null>(null);

  const calculateCountdown = useCallback(() => {
    const now = new Date();
    const today = now.getDate();
    // Simplified entry matching
    const currentMonth = now.getMonth();
    const timetable = activeType === 'Sunni' ? sunniTimetable : shiaTimetable;
    const entry = timetable.find(e => {
      const isMarch = activeType === 'Sunni' ? (e.roza >= 11) : e.date.includes('March');
      const entryMonth = isMarch ? 2 : 1;
      const dayPart = activeType === 'Sunni' ? e.date.split(',')[0] : e.date.split(' ')[0];
      const entryDay = parseInt(dayPart);
      return entryDay === today && entryMonth === currentMonth;
    });

    if (!entry) return null;

    // Parse iftaar time
    const iftaarTimeStr = activeType === 'Sunni' ? (entry as any).maghrib : (entry as any).iftaar; // maghrib for sunni, iftaar for shia
    if (!iftaarTimeStr) return null;

    const [time, period] = iftaarTimeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;

    const iftaarDate = new Date(now);
    iftaarDate.setHours(hours, minutes, 0, 0);

    const diff = iftaarDate.getTime() - now.getTime();
    if (diff <= 0) return null;

    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    return { hours: h, mins: m, secs: s };
  }, [activeType]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateCountdown]);

  return (
    <section id="home" className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-gold/10 rounded-full blur-[100px] animate-pulse delay-700" />
      
      {/* Stars Animation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center z-10">
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-4 neon-text-cyan"
        >
          RASIKHNOW
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-muted-foreground mb-8 tracking-wide font-light"
        >
          Ramadan Timetable & Live Clock 2026
        </motion.p>

        {countdown && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass px-6 py-2 rounded-full border-neon-gold/30 mb-8 flex items-center gap-3"
          >
            <span className="text-sm font-medium text-neon-gold">TIME UNTIL IFTAAR:</span>
            <span className="font-mono text-xl font-bold tracking-widest text-white">
              {String(countdown.hours).padStart(2, '0')}:{String(countdown.mins).padStart(2, '0')}:{String(countdown.secs).padStart(2, '0')}
            </span>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mb-16"
        >
          <AnalogClock />
        </motion.div>

        <NotificationManager activeType={activeType} />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 animate-bounce"
        >
          <a href="#timetable" className="text-neon-cyan/50 hover:text-neon-cyan transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
