import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'green' | 'gold';
  delay?: number;
}

const GlassCard = ({ children, className, glowColor = 'cyan', delay = 0 }: GlassCardProps) => {
  const glowClasses = {
    cyan: 'shadow-glow-cyan/20 border-neon-cyan/20 hover:border-neon-cyan/50',
    green: 'shadow-glow-green/20 border-neon-green/20 hover:border-neon-green/50',
    gold: 'shadow-glow-gold/20 border-neon-gold/20 hover:border-neon-gold/50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass p-6 rounded-2xl transition-all duration-300",
        glowClasses[glowColor],
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
