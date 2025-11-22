import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import waxSeal from "@/assets/wax-seal.png";

interface SkillCategory {
  category: string;
  skills: string[];
  icon: string;
}

interface SkillCardProps {
  category: SkillCategory;
  index: number;
  isInView: boolean;
}

const SkillCard = ({ category, index, isInView }: SkillCardProps) => {
  // Determine corner based on index (cycle through 4 corners)
  const corner = index % 4;
  
  // Define starting positions for each corner
  const cornerPositions = [
    { x: -200, y: -200 }, // Top-left (0)
    { x: 200, y: -200 },  // Top-right (1)
    { x: -200, y: 200 },  // Bottom-left (2)
    { x: 200, y: 200 },   // Bottom-right (3)
  ];
  
  const startPosition = cornerPositions[corner];
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: startPosition.x, 
        y: startPosition.y,
        scale: 0.5,
        borderColor: 'hsl(var(--accent) / 0.3)',
        boxShadow: '0 4px 6px -6px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0,
        scale: 1,
        borderColor: 'hsl(var(--accent) / 0.3)',
        boxShadow: '0 4px 6px -6px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      } : { 
        opacity: 0, 
        x: startPosition.x, 
        y: startPosition.y,
        scale: 0.5,
        borderColor: 'hsl(var(--accent) / 0.3)',
        boxShadow: '0 4px 6px -6px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
      whileHover={{
        scale: 1.04,
        y: -8,
        borderColor: 'hsl(var(--accent) / 0.8)',
        boxShadow: '0 12px 24px -8px rgba(0,0,0,0.25)',
        transition: {
            type: 'spring',
            stiffness: 350,
            damping: 20
        }
      }}
      transition={{ 
        delay: 0.2 + index * 0.15, 
        duration: 0.75, 
        ease: [0.22, 1, 0.36, 1]
      }}
      className="bg-card/90 backdrop-blur-sm p-6 shadow-md group"
      style={{
        borderRadius: '3rem 2rem 3rem 2rem',
        borderStyle: 'solid',
        borderWidth: '2px',
      }}
    >
      <motion.div 
        className="flex items-center gap-3 mb-4"
      >
        <motion.div 
          className="relative w-16 h-16"
        >
          <img
            src={waxSeal}
            alt={category.category}
            className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-2xl animate-seal-glow"
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              {category.icon}
            </motion.span>
          </div>
        </motion.div>
        <h3 className="font-heading text-2xl text-accent group-hover:text-primary transition-colors duration-300">
          {category.category}
        </h3>
      </motion.div>
      
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-1 bg-accent/20 text-foreground rounded-3xl text-sm font-body border border-accent/20 hover:border-accent/40 hover:bg-accent/30 transition-all duration-300 hover:shadow-inner"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["C", "C++", "Python", "Java", "JavaScript", "HTML/CSS", "PHP", "SQL"],
    icon: "💻",
  },
  {
    category: "Frameworks & Libraries",
    skills: ["React.js", "Flask", "pandas", "matplotlib", "spaCy", "Sentence Transformers"],
    icon: "📚",
  },
  {
    category: "Developer Tools",
    skills: ["Git", "VS Code", "Google Colab", "Power BI", "Excel", "Google Sheets","Docker"],
    icon: "🛠",
  },
  {
    category: "Databases",
    skills: ["MongoDB", "MySQL"],
    icon: "🗄",
  },
  {
    category: "Concepts",
    skills: ["Data Structures", "Algorithms (DSA)", "Machine Learning", "NLP"],
    icon: "🧠",
  },
  {
    category: "Soft Skills",
    skills: ["Communication", "Problem-Solving", "Teamwork", "Leadership", "Consistency"],
    icon: "🤝",
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="min-h-screen flex items-center py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="font-heading text-5xl md:text-6xl mb-16 text-center ink-text">
            The Seals & Stamps
          </h2>

          {/* Skills in grid layout */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={category.category}
                category={category}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
};