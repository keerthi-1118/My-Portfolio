
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import keer from "@/assets/keer.jpg";
import contentBg from "@/assets/Content4.png";
import designImg from "@/assets/design.png";
import { Button } from "./ui/button";
import { FileText } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.95]);

  return (
    <section id="about" ref={ref} className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          style={{ opacity, scale }}
          initial={{ opacity: 0, y: -100 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
          exit={{ opacity: 0, y: -100, scale: 0.8 }}
          transition={{ duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="font-heading text-5xl md:text-6xl mb-12 text-center ink-text">
            The Writer
          </h2>

          <div className="grid md:grid-cols-2 gap-24 items-center">
            <div className="flex flex-col items-center gap-28">
              {/* Portrait - Circular */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                className="relative mx-auto w-72 h-72"
              >
                <motion.div
                  className="w-full h-full rounded-full overflow-hidden relative"
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                  variants={{
                    rest: { scale: 1, rotate: 0 },
                    hover: { scale: 1.1, rotate: 5 }
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <img
                    src={keer}
                    alt="Keerthi Tadikonda - Full Stack Developer"
                    className="w-full h-full object-cover"
                  />

                  {/* Glass wipe/shine effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-1/2 h-full"
                    style={{
                      background: 'linear-gradient(to right, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      transform: 'skewX(-25deg)',
                    }}
                    variants={{
                      rest: { x: '-150%' },
                      hover: {
                        x: '250%',
                        transition: { duration: 0.7, ease: 'easeInOut' }
                      }
                    }}
                  />
                </motion.div>
                
                {/* Decorative rings */}
                <motion.div
                  className="absolute -top-4 -right-4 w-20 h-20 border-4 border-accent rounded-full opacity-50"
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
                <motion.div
                  className="absolute -bottom-4 -left-4 w-16 h-16 border-4 border-secondary rounded-full opacity-40"
                  whileHover={{ scale: 1.15, rotate: -90 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex gap-4 justify-center pr-24"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="default"
                    size="lg"
                    className="font-body gap-2 shadow-[var(--shadow-paper)] hover:shadow-[var(--shadow-lifted)] transition-all duration-500"
                  >
                    <FileText className="w-5 h-5" />
                    View Resume
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: -80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.6, 0.05, 0.01, 0.9] }}
              className="space-y-6"
            >
              <div className="relative w-full flex justify-center items-center">
                <img
                  src={contentBg}
                  alt="Scroll background"
                  className="w-[120%] h-auto"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center">
                  <div className="w-3/4 text-center">
                    <p className="font-body text-base md:text-lg leading-relaxed mb-8 text-[#FEFEDA] font-semibold">
                    Full-stack development enthusiast with a secondary focus in finance, currently pursuing B.Tech CSE at SRM University–AP. I explore AI/ML, IoT, and DevOps with a curiosity-driven approach, focusing on building simple, meaningful, and user-centered solutions.
                    </p>
                    <p className="font-body text-base md:text-lg leading-relaxed text-[#FEFEDA] font-semibold">
                    I bring adaptability, continuous learning, and clarity to every project, aiming to create work that is practical and impactful.
                    </p>
                  </div>
                  <motion.div
                    className="w-2/5 mt-3"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 1, duration: 1 }}
                  >
                    <img
                        src={designImg}
                        alt="Generative AI Design"
                        className="w-full h-auto"
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 right-10 text-accent/5 pointer-events-none">
        <svg width="200" height="200" viewBox="0 0 200 200" fill="currentColor">
          <path d="M100 10 L40 190 L190 78 L10 78 L160 190 Z" />
        </svg>
      </div>
    </section>
  );
};
