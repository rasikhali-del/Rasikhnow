import React from 'react';

const Footer = () => {
  return (
    <footer className="py-12 glass border-t border-white/10 mt-20 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-neon-gold/5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 text-center z-10 relative">
        <h2 className="text-2xl font-bold tracking-tighter gradient-text mb-4">RASIKHNOW</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Dedicated to providing accurate Ramadan timings and helpful Islamic content for the community.
        </p>
        
        <div className="flex justify-center gap-6 mb-8 text-sm text-muted-foreground">
          <a href="#home" className="hover:text-neon-cyan transition-colors">Home</a>
          <a href="#timetable" className="hover:text-neon-cyan transition-colors">Timetable</a>
          <a href="#gallery" className="hover:text-neon-cyan transition-colors">Gallery</a>
          <a href="#duas" className="hover:text-neon-cyan transition-colors">Duas</a>
        </div>
        
        <p className="text-sm text-muted-foreground/60 border-t border-white/5 pt-8">
          &copy; 2026 RASIKHNOW. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
