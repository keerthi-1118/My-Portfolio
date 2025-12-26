import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Intro", href: "#hero" },
  { label: "Writer", href: "#about" },
  { label: "Chronicle", href: "#experience" },
  { label: "Seals", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = navItems.map(item => item.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClick = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full ${
          scrolled
            ? "bg-background/80 backdrop-blur-md shadow-[var(--shadow-paper)]"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="font-signature text-2xl sm:text-3xl text-accent cursor-pointer"
              onClick={() => handleClick("#hero")}
            >Keerthi's Portfolio
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => handleClick(item.href)}
                  className={`font-body text-sm transition-colors duration-300 relative ${
                    activeSection === item.href.substring(1)
                      ? "text-accent"
                      : "text-foreground hover:text-accent"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                  {activeSection === item.href.substring(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                      initial={false}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 400, duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-64 bg-card/95 backdrop-blur-md shadow-[var(--shadow-lifted)] z-[60] md:hidden burnt-edge"
              style={{ 
                willChange: "transform",
                top: 0,
                bottom: 0,
                height: "100vh",
                maxHeight: "100vh",
                overflowY: "auto"
              }}
            >
              {/* Close button at top of menu */}
              <div className="flex justify-end p-4 sticky top-0 bg-card/95 backdrop-blur-sm z-10">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg bg-card hover:bg-accent/20 transition-colors duration-300"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>
              <div className="flex flex-col gap-2 p-8 pt-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.href}
                    onClick={() => handleClick(item.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={`font-body text-lg text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                      activeSection === item.href.substring(1)
                        ? "bg-accent/20 text-accent"
                        : "text-foreground hover:bg-accent/10 hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-[55] md:hidden"
            style={{ top: 0, left: 0, right: 0, bottom: 0, width: "100%", height: "100%" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};