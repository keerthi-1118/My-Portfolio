import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export const HeroSection = () => {
  const [showCursor, setShowCursor] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const lines = [
    "Dear Reader,",
    "",
    "I am Keerthi Tadikonda,",
    "A Computer Science student passionate about Full Stack Development & Machine Learning.",
    "I craft intelligent solutions with precision and creativity.",
  ];

  const floatingElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 3, // Slightly increase random duration for more variance
  }));

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative candle-glow overflow-hidden">
      {/* Floating ink particles */}
      {floatingElements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute w-2 h-2 bg-accent/20 rounded-full blur-sm"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
          }}
          animate={{
            y: [0, -20, 0], // Reduced movement
            opacity: [0.1, 0.4, 0.1], // More subtle opacity
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card/90 backdrop-blur-md p-12 md:p-16 rounded-lg burnt-edge shadow-[var(--shadow-paper)]">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }} // Reduced y
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.4, duration: 0.7, ease: "easeOut" }} // Faster delay and duration
                className={`font-body text-xl md:text-2xl ${
                  index === 0 ? "font-heading text-4xl md:text-5xl mb-6 text-accent" : "mb-4"
                } ${line === "" ? "h-4" : ""}`}
              >
                {line}
                {index === lines.length - 1 && showCursor && (
                  <span className="inline-block w-0.5 h-7 bg-foreground ml-1 animate-blink" />
                )}
              </motion.div>
            ))}
            
            {/* Signature */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1, ease: "easeOut" }} // Adjusted delay
              className="mt-8 font-signature text-3xl md:text-4xl text-accent"
            >
              ~ Keerthi
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator with wax seal */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 1, ease: "easeOut" }} // Adjusted delay
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-pointer group"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }} // Reduced movement
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-muted-foreground group-hover:text-accent transition-colors duration-300"
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
          <span className="text-sm font-body text-muted-foreground group-hover:text-accent transition-colors duration-300 mt-2">Scroll to continue</span>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-accent rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border-2 border-secondary rotate-45" />
      </div>
    </section>
  );
};
