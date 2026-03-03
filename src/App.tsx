import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IntersectObserver from '@/components/common/IntersectObserver';
import { Toaster } from '@/components/ui/sonner';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import TimetableSection from './components/TimetableSection';
import GallerySection from './components/GallerySection';
import DuaSection from './components/DuaSection';
import Footer from './components/Footer';

const HomePage = () => {
  const [activeType, setActiveType] = React.useState<'Sunni' | 'Shia'>('Sunni');
  const [isDarker, setIsDarker] = React.useState(false);

  React.useEffect(() => {
    if (isDarker) {
      document.body.style.setProperty('--background', '240 30% 2%');
      document.body.style.setProperty('--card', '240 30% 4%');
    } else {
      document.body.style.setProperty('--background', '240 30% 5%');
      document.body.style.setProperty('--card', '240 30% 7%');
    }
  }, [isDarker]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Decorative background glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-neon-cyan/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-0 right-0 w-[50vw] h-[50vh] bg-neon-gold/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <Navbar isDarker={isDarker} setIsDarker={setIsDarker} />
      
      <main>
        <HeroSection activeType={activeType} />
        <TimetableSection activeType={activeType} setActiveType={setActiveType} />
        <GallerySection />
        <DuaSection />
      </main>
      
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <IntersectObserver />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="bottom-right" richColors theme="dark" />
    </Router>
  );
};

export default App;
