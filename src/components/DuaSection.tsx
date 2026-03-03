import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import { ramadanDuas } from '../data/duas';

const DuaSection = () => {
  return (
    <section id="duas" className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-neon-gold to-transparent opacity-50" />
      
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text-gold">Special Ramadan Duas</h2>
          <p className="text-muted-foreground text-lg">Duas for various moments of the holy month.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ramadanDuas.map((dua, i) => (
            <GlassCard key={i} delay={i * 0.1} glowColor="gold" className="flex flex-col h-full hover:scale-[1.02]">
              <h3 className="text-xl font-bold mb-6 text-neon-gold/80 border-b border-white/10 pb-4">
                {dua.title}
              </h3>
              
              <div className="flex flex-col gap-6 flex-grow">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl leading-relaxed text-foreground font-arabic mb-4" dir="rtl">
                    {dua.arabic}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="glass p-4 rounded-lg bg-white/5 border-white/10">
                    <p className="text-sm italic text-muted-foreground leading-relaxed">
                      <span className="text-neon-cyan font-bold block mb-1">English:</span>
                      {dua.english}
                    </p>
                  </div>
                  
                  <div className="glass p-4 rounded-lg bg-white/5 border-white/10">
                    <p className="text-sm text-right leading-relaxed" dir="rtl">
                      <span className="text-neon-gold font-bold block mb-1">Urdu:</span>
                      {dua.urdu}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DuaSection;
