import React, { useState } from 'react';
import { sunniTimetable } from '../data/sunni';
import { shiaTimetable } from '../data/shia';
import GlassCard from './GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface TimetableSectionProps {
  activeType: 'Sunni' | 'Shia';
  setActiveType: (val: 'Sunni' | 'Shia') => void;
}

const TimetableSection = ({ activeType: view, setActiveType: setView }: TimetableSectionProps) => {
  const now = new Date();
  const today = now.getDate();
  const currentMonth = now.getMonth();

  return (
    <section id="timetable" className="py-32 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 neon-text-gold">Ramadan Timetable 2026</h2>
          <div className="flex justify-center gap-4 mb-8">
            <Button
              onClick={() => setView('Sunni')}
              className={view === 'Sunni' ? 'bg-neon-cyan text-black' : 'glass border-white/20'}
            >
              Sunni View
            </Button>
            <Button
              onClick={() => setView('Shia')}
              className={view === 'Shia' ? 'bg-neon-gold text-black' : 'glass border-white/20'}
            >
              Shia View
            </Button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard glowColor={view === 'Sunni' ? 'cyan' : 'gold'} className="p-0 overflow-hidden">
              <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                <Table>
                  <TableHeader className="sticky top-0 glass z-20">
                    <TableRow className="border-b border-white/10 hover:bg-transparent">
                      <TableHead className="w-20 text-center font-bold">Roza</TableHead>
                      <TableHead className="font-bold">Date</TableHead>
                      <TableHead className="font-bold">Sehr</TableHead>
                      {view === 'Sunni' ? (
                        <>
                          <TableHead className="font-bold hidden md:table-cell">Zuhr</TableHead>
                          <TableHead className="font-bold hidden md:table-cell">Asr</TableHead>
                          <TableHead className="font-bold">Maghrib</TableHead>
                          <TableHead className="font-bold hidden md:table-cell">Isha</TableHead>
                        </>
                      ) : (
                        <TableHead className="font-bold">Iftaar</TableHead>
                      )}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(view === 'Sunni' ? sunniTimetable : shiaTimetable).map((entry, idx) => {
                      const dayPart = view === 'Sunni' ? entry.date.split(',')[0] : entry.date.split(' ')[0];
                      const entryDay = parseInt(dayPart);
                      const isMarch = view === 'Sunni' ? (entry.roza >= 11) : entry.date.includes('March');
                      const entryMonth = isMarch ? 2 : 1;
                      const isToday = entryDay === today && entryMonth === currentMonth;
                      return (
                        <TableRow
                          key={entry.roza}
                          className={`border-b border-white/5 transition-colors ${
                            isToday ? 'bg-neon-cyan/20 border-l-4 border-l-neon-cyan' : 'hover:bg-white/5'
                          }`}
                        >
                          <TableCell className="text-center font-bold">{entry.roza}</TableCell>
                          <TableCell className="font-medium">{entry.date}</TableCell>
                          <TableCell className="text-neon-cyan font-semibold">{entry.sehr}</TableCell>
                          {view === 'Sunni' ? (
                            <>
                              <TableCell className="hidden md:table-cell">{(entry as any).zuhr}</TableCell>
                              <TableCell className="hidden md:table-cell">{(entry as any).asr}</TableCell>
                              <TableCell className="text-neon-gold font-semibold">{(entry as any).maghrib}</TableCell>
                              <TableCell className="hidden md:table-cell">{(entry as any).isha}</TableCell>
                            </>
                          ) : (
                            <TableCell className="text-neon-gold font-semibold">{(entry as any).iftaar}</TableCell>
                          )}
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TimetableSection;
