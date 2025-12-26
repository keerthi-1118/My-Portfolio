
import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Calendar, Github, Code2, Layers, Cloud, CloudRain, Zap, GraduationCap, LucideIcon } from "lucide-react";

// --- DATA ---
const education = [
  { period: "2023 – present", degree: "B.Tech CSE", institution: "SRM AP University", gpa: "GPA: 8.98/10" },
  { period: "2023", degree: "Class 12th", institution: "Bhashyam", gpa: "GPA: 9.73/10" },
];

const experiences = [
  {
    title: "Salesforce Developer Intern",
    company: "Smartbridge",
    period: "May 2025 - July 2025",
    description: "Worked on customizing Salesforce applications using Apex, Visualforce, and Lightning Web Components. Assisted in integrating third-party APIs, building automation with Flows and Process Builder, and deploying changes via Change Sets. Collaborated with cross-functional teams to gather requirements and deliver scalable CRM solutions.",
    tags: ["Salesforce", "Apex", "Visualforce", "Lightning", "Flows"],
  },
];

const projects = [
  {
    title: "ATS Resume Checker",
    description: "A full-stack AI platform for resume optimization. It provides detailed match scores, skill analysis, and an ATS-friendly resume builder.",
    link: "https://github.com/keerthi-1118/ats_resume_checker",
    tags: ["React", "Flask", "Python", "NLP", "spaCy"],
    thumbnail: "/images/ats.jpg",
    techIcons: [Code2, Layers, Zap]
  },
  {
    title: "Cloud Buddy",
    description: "A lightweight weather app using WeatherAPI and Pexels API for dynamic backgrounds, providing real-time weather and a 3-day forecast.",
    link: "https://github.com/keerthi-1118/Live-weather-",
    tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "WeatherAPI"],
    thumbnail: "/images/cloudy.jpg",
    techIcons: [Cloud, CloudRain, Zap],
  },
  {
    title: "EduSpace",
    description: "Currently developing EduSpace, an AI-powered space for students to upload notes, organize projects, and work together in real time.",
    link: "https://github.com/keerthi-1118/Eduspace/tree/master/Downloads/notes",
    thumbnail:"/images/edu.png",
    tags: ["React", "Flask", "JWT", "Docker", "Material UI"],
    techIcons: [Code2, Layers, Zap]
  },

];

// --- TYPES ---
type Project = {
  title: string;
  description: string;
  link: string;
  tags: string[];
  thumbnail: string | null;
  techIcons: LucideIcon[];
};

// --- ANIMATION VARIANTS ---
const descriptionVariants: Variants = {
  rest: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
  hover: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

// --- PROJECT CARD COMPONENT ---
interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
}

const ProjectCard = ({ project, index, isInView }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: 50, 
        scale: 0.85, 
        rotate: -5, 
        filter: "blur(15px)"
      }}
      animate={isInView ? { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        rotate: 0, 
        filter: "blur(0px)"
      } : {}}
      transition={{ 
        delay: 1.0 + index * 0.12,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-card/80 backdrop-blur-sm rounded-3xl burnt-edge shadow-[var(--shadow-paper)] hover:shadow-[var(--shadow-lifted)] transition-all duration-700 overflow-hidden border border-border/20 hover:border-accent/30 flex flex-col w-full max-w-[400px]"
    >
      <motion.div 
        className="relative h-48 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 overflow-hidden flex-shrink-0"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 1.1 + index * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      >
        {project.thumbnail && (
          <motion.img 
            src={project.thumbnail} 
            alt={project.title}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isHovered ? 'opacity-90' : 'opacity-80'}`}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: isHovered ? 0.9 : 0.8 } : {}}
            transition={{ delay: 1.15 + index * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          />
        )}
        <motion.div 
          className={`absolute inset-0 transition-colors duration-300 ${isHovered ? 'bg-black/10' : 'bg-black/20'}`}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.1 + index * 0.12, duration: 0.5 }}
        />
      </motion.div>

      <motion.div 
        className="p-6 flex flex-col"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2 + index * 0.12, duration: 0.6 }}
      >
        <motion.h4 
          className={`font-heading text-2xl mb-3 transition-colors duration-500 ${isHovered ? 'text-accent' : ''}`}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3 + index * 0.12, duration: 0.6 }}
        >
          {project.title}
        </motion.h4>
        
        <motion.div
          className="overflow-hidden h-0"
          initial={false}
          animate={isHovered ? "hover" : "rest"}
          variants={descriptionVariants}
        >
          <p className="font-body text-base leading-relaxed text-muted-foreground pt-1 pb-4">
            {project.description}
          </p>
        </motion.div>

        <motion.a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group/btn relative inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full font-body text-base font-semibold transition-all duration-700 overflow-hidden mt-auto"
          initial={{ opacity: 0, scale: 0.9, y: 10 }}
          animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
          transition={{ 
            delay: 1.4 + index * 0.12, 
            duration: 0.5,
            ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number]
          }}
          style={{
            background: 'linear-gradient(135deg, hsl(45, 100%, 60%) 0%, hsl(38, 92%, 50%) 50%, hsl(45, 100%, 55%) 100%)',
            border: '2px solid hsl(45, 100%, 45%)',
            boxShadow: `inset 0 2px 4px rgba(255, 255, 255, 0.3), inset 0 -2px 4px rgba(0, 0, 0, 0.2), 0 4px 12px hsl(45, 100%, 40% / 0.4), 0 2px 4px rgba(0, 0, 0, 0.2)`,
            color: 'hsl(30, 80%, 15%)',
            textShadow: '0 1px 2px rgba(255, 255, 255, 0.5)',
          }}
        >
          <Github className="w-5 h-5 relative z-10" />
          <span className="relative z-10">View on GitHub</span>
          <ExternalLink className="w-4 h-4 relative z-10" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

// --- MAIN SECTION COMPONENT ---
export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 
            className="font-heading text-5xl md:text-6xl mb-16 text-center ink-text"
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.1 }}
          >
            The Chronicle
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {/* Education and Experience sections remain unchanged... */}
            <div>
              <motion.h3 
                className="font-heading text-3xl mb-8 text-primary"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
              >
                Education
              </motion.h3>
              <div className="space-y-8 relative">
                {/* Base timeline line with draw animation */}
                <motion.div 
                  className="absolute left-4 top-0 bottom-0 w-0.5 bg-accent/30"
                  initial={{ scaleY: 0 }}
                  animate={isInView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.5 }}
                  style={{ transformOrigin: "top" }}
                />
                
                {education.map((edu, index) => {
                  const [isHovered, setIsHovered] = useState(false);
                  
                  return (
                    <div key={`${edu.degree}-${index}`} className="relative">
                      {/* Glowing timeline line segment - only for hovered item */}
                      <motion.div
                        className="absolute left-4 top-0 bottom-0 w-0.5 pointer-events-none z-0"
                        initial={{ opacity: 0 }}
                        animate={isHovered ? {
                          opacity: 1,
                          background: "linear-gradient(to bottom, hsl(var(--accent) / 0.3), hsl(var(--accent) / 0.7), hsl(var(--accent) / 0.3))",
                          boxShadow: "0 0 12px 2px hsl(var(--accent) / 0.5), 0 0 24px 4px hsl(var(--accent) / 0.3)",
                        } : {
                          opacity: 0,
                          background: "transparent",
                          boxShadow: "0 0 0px 0px hsl(var(--accent) / 0)",
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                      />
                      
                      <motion.div
                        initial={{ opacity: 0, y: 30, x: -20, filter: "blur(10px)", scale: 0.95 }}
                        animate={isInView ? { 
                          opacity: 1, 
                          y: 0, 
                          x: 0, 
                          filter: "blur(0px)", 
                          scale: 1 
                        } : {}}
                        transition={{ 
                          delay: 0.8 + index * 0.15, 
                          duration: 0.8, 
                          ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
                        }}
                        className="relative pl-12 group"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
                          transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
                        }}
                      >
                        {/* Thin colored bar that slides in from left */}
                        <motion.div
                          className="absolute left-0 top-0 bottom-0 w-1 bg-accent z-0"
                          initial={{ scaleX: 0, transformOrigin: "left" }}
                          animate={isHovered ? {
                            scaleX: 1,
                          } : {
                            scaleX: 0,
                          }}
                          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }}
                        />
                        
                        {/* Timeline dot with glow on card hover */}
                        <motion.div 
                          className="absolute top-0 left-4 w-4 h-4 bg-accent rounded-full border-4 border-background -translate-x-2 z-10"
                          initial={{ scale: 0, opacity: 0, rotate: -180 }}
                          animate={isInView ? {
                            scale: isHovered ? 1.4 : 1,
                            opacity: 1,
                            rotate: 0,
                            boxShadow: isHovered 
                              ? "0 0 20px 8px hsl(var(--accent) / 0.4), 0 0 40px 12px hsl(var(--accent) / 0.2)"
                              : "0 0 0px 0px hsl(var(--accent) / 0)",
                          } : { scale: 0, opacity: 0, rotate: -180 }}
                          transition={{ 
                            delay: isInView ? 0.9 + index * 0.15 : 0, 
                            duration: isHovered ? 0.4 : 0.6, 
                            ease: isHovered 
                              ? [0.4, 0, 0.2, 1] as [number, number, number, number]
                              : [0.34, 1.56, 0.64, 1] as [number, number, number, number],
                            type: isHovered ? "tween" : "spring",
                            stiffness: 200,
                            damping: 15
                          }}
                        />
                        
                        <motion.div 
                          className="flex items-center gap-2 mb-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ delay: 1.0 + index * 0.15, duration: 0.6 }}
                        >
                          <GraduationCap className="w-5 h-5 text-accent" />
                          <span>{edu.period}</span>
                        </motion.div>
                        <motion.h4 
                          className="font-heading text-2xl mb-1"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 1.1 + index * 0.15, duration: 0.6 }}
                        >
                          {edu.degree}
                        </motion.h4>
                        <motion.p 
                          className="font-body text-lg text-accent mb-3"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 1.2 + index * 0.15, duration: 0.6 }}
                        >
                          {edu.institution}
                        </motion.p>
                        <motion.p 
                          className="font-body text-base text-muted-foreground"
                          initial={{ opacity: 0, y: 10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 1.3 + index * 0.15, duration: 0.6 }}
                        >
                          ({edu.gpa})
                        </motion.p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <motion.h3 
                className="font-heading text-3xl mb-8 text-primary"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.3 }}
              >
                Professional Journey
              </motion.h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: 40, y: 20, scale: 0.9, filter: "blur(10px)", rotate: -5 }}
                    animate={isInView ? { 
                      opacity: 1, 
                      x: 0, 
                      y: 0, 
                      scale: 1, 
                      filter: "blur(0px)", 
                      rotate: 0 
                    } : {}}
                    transition={{ 
                      delay: 0.8 + index * 0.2, 
                      duration: 0.8, 
                      ease: [0.22, 1, 0.36, 1] as [number, number, number, number] 
                    }}
                    whileHover={{
                      scale: 1.03,
                      y: -5,
                      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] as [number, number, number, number] }
                    }}
                  >
                    <div className="bg-card p-6 rounded-lg burnt-edge shadow-[var(--shadow-paper)]">
                      <motion.div 
                        className="flex items-start gap-2 mb-2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.0 + index * 0.2, duration: 0.6 }}
                      >
                        <Calendar className="w-5 h-5 text-accent mt-1" />
                        <span>{exp.period}</span>
                      </motion.div>
                      <motion.h4 
                        className="font-heading text-2xl mb-1"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.1 + index * 0.2, duration: 0.6 }}
                      >
                        {exp.title}
                      </motion.h4>
                      <motion.p 
                        className="font-body text-lg text-accent mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                      >
                        {exp.company}
                      </motion.p>
                      <motion.p 
                        className="font-body text-base leading-relaxed mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 1.3 + index * 0.2, duration: 0.6 }}
                      >
                        {exp.description}
                      </motion.p>
                      <motion.div 
                        className="flex flex-wrap gap-2"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 1.4 + index * 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
                      >
                        {exp.tags.map((tag, tagIndex) => (
                          <motion.span 
                            key={tag} 
                            className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm"
                            initial={{ opacity: 0, scale: 0, rotate: -10 }}
                            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                            transition={{ 
                              delay: 1.5 + index * 0.2 + tagIndex * 0.1, 
                              duration: 0.4,
                              type: "spring",
                              stiffness: 200,
                              damping: 15
                            }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.6 }}
          >
            <motion.h3 
              className="font-heading text-3xl mb-8 text-primary"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.8 }}
            >
              Notable Works
            </motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
