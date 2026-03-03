import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const AnalogClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = (((hours % 12) + minutes / 60) / 12) * 360;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full glass border-2 border-neon-cyan/30 shadow-glow-cyan/20 flex items-center justify-center animate-pulse-glow">
        {/* Clock Face - Ticks */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-3 bg-neon-cyan/50 rounded-full"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-22px)`,
              transformOrigin: '50% 112px',
              top: '10px'
            }}
          />
        ))}

        {/* Hands */}
        <motion.div
          className="absolute w-1.5 h-20 md:h-28 bg-white/80 rounded-full origin-bottom"
          style={{ rotate: hourDegrees, bottom: '50%' }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
        <motion.div
          className="absolute w-1 h-28 md:h-36 bg-neon-cyan/80 rounded-full origin-bottom"
          style={{ rotate: minuteDegrees, bottom: '50%' }}
          transition={{ type: 'spring', stiffness: 50 }}
        />
        <motion.div
          className="absolute w-0.5 h-32 md:h-40 bg-neon-gold/80 rounded-full origin-bottom"
          style={{ rotate: secondDegrees, bottom: '50%' }}
        />

        {/* Center Point */}
        <div className="absolute w-3 h-3 bg-white rounded-full shadow-glow-cyan" />
      </div>

      <div className="text-2xl md:text-3xl font-bold tracking-wider neon-text-cyan font-mono">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
      </div>
    </div>
  );
};

export default AnalogClock;
