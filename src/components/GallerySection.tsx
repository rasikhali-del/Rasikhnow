import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';

const GallerySection = () => {
  const images = [
    {
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_9dc85dec-3995-450a-8198-0b385bd5d282.jpg",
      title: "Majestic Mosque",
      desc: "Sacred moments of worship under the moonlit sky."
    },
    {
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_33191a9a-5203-43c0-9206-cb90d275960b.jpg",
      title: "Crescent Moon",
      desc: "Welcoming the holy month of Ramadan with peace."
    },
    {
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_81a31eb7-745d-4150-8cd6-98bce2b81c2d.jpg",
      title: "Ramadan Lanterns",
      desc: "Traditional lanterns bringing light to our homes."
    },
    {
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_5bd24ddc-db17-4b04-9721-7d370aab59c7.jpg",
      title: "Holy Quran",
      desc: "The divine guidance for humanity revealed in Ramadan."
    },
    {
      url: "https://miaoda-site-img.s3cdn.medo.dev/images/KLing_aae378ed-4ab9-4dcc-ba9c-7a2027d353c9.jpg",
      title: "Iftar Table",
      desc: "Gathering with loved ones to break the fast together."
    }
  ];

  return (
    <section id="gallery" className="py-32 bg-background/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text-cyan">Ramadan Gallery</h2>
          <p className="text-muted-foreground text-lg">Capturing the beauty of the holy month.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((img, i) => (
            <GlassCard key={i} delay={i * 0.1} className="p-0 overflow-hidden group">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-neon-cyan mb-2">{img.title}</h3>
                  <p className="text-sm text-white/80">{img.desc}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
