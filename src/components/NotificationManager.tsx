import React, { useEffect, useState, useCallback } from 'react';
import { sunniTimetable } from '../data/sunni';
import { shiaTimetable } from '../data/shia';
import { Button } from '@/components/ui/button';
import { Bell, BellOff, Info } from 'lucide-react';
import { toast } from 'sonner';

interface NotificationManagerProps {
  activeType: 'Sunni' | 'Shia';
}

const NotificationManager = ({ activeType }: NotificationManagerProps) => {
  const [permission, setPermission] = useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const requestPermission = async () => {
    if ('Notification' in window) {
      const res = await Notification.requestPermission();
      setPermission(res);
      if (res === 'granted') {
        new Notification('RASIKHNOW', {
          body: 'Notifications enabled for Sahri and Iftaar! 🌙',
          icon: '/favicon.ico'
        });
        toast.success('Notifications enabled!');
      } else {
        toast.error('Permission denied for notifications.');
      }
    }
  };

  const checkAndNotify = useCallback(() => {
    if (permission !== 'granted') return;

    const now = new Date();
    const today = now.getDate();
    const currentMonth = now.getMonth(); // 0-indexed, 1 is Feb, 2 is Mar
    const currentTimeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    // Determine if we're in the correct month for the data (Feb-Mar 2026)
    // For simplicity, we match the day and time based on the timetable
    // In a real app, we'd check the full date.
    
    const entry = activeType === 'Sunni' 
      ? sunniTimetable.find(e => {
          const entryDay = parseInt(e.date.split(',')[0]);
          const isMarch = entryDay <= 20 && e.roza >= 11;
          const entryMonth = isMarch ? 2 : 1;
          return entryDay === today && entryMonth === currentMonth;
        })
      : shiaTimetable.find(e => {
          const entryMonth = e.date.includes('March') ? 2 : 1;
          const entryDay = parseInt(e.date.split(' ')[0]);
          return entryDay === today && entryMonth === currentMonth;
        });

    if (!entry) return;

    const sehriTime = entry.sehr;
    const iftaarTime = 'iftaar' in entry ? entry.iftaar : entry.maghrib;

    if (currentTimeStr === sehriTime) {
      new Notification('Time for Sahri 🌙', {
        body: `It's time for Sahri (${sehriTime}). Don't forget your intention!`,
      });
      // Play sound if possible
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3');
      audio.play().catch(() => {});
    }

    if (currentTimeStr === iftaarTime) {
      new Notification('Time for Iftaar 🍽️', {
        body: `Alhamdulillah, it's time for Iftaar (${iftaarTime}).`,
      });
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2861/2861-preview.mp3');
      audio.play().catch(() => {});
    }
  }, [permission, activeType]);

  useEffect(() => {
    const timer = setInterval(checkAndNotify, 60000); // Check every minute
    return () => clearInterval(timer);
  }, [checkAndNotify]);

  return (
    <div className="flex flex-col items-center gap-4">
      {permission === 'default' && (
        <div className="glass p-4 rounded-xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
          <Info className="text-neon-cyan" />
          <p className="text-sm">Allow notifications for Sahri and Iftaar alerts?</p>
          <Button size="sm" onClick={requestPermission} className="bg-neon-cyan hover:bg-neon-cyan/80 text-black">
            Enable
          </Button>
        </div>
      )}
      
      {permission === 'denied' && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <BellOff size={16} />
          <span>Notifications are blocked. Please enable them in browser settings.</span>
        </div>
      )}

      {permission === 'granted' && (
        <div className="flex items-center gap-2 text-neon-green text-sm">
          <Bell size={16} />
          <span>Alerts active for {activeType} timetable.</span>
        </div>
      )}
    </div>
  );
};

export default NotificationManager;
