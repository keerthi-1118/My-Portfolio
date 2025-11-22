
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Calendar, Github, Code2, Layers, Cloud, CloudRain, Zap, GraduationCap } from "lucide-react";

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
    title: "Book Trading Platform",
    description: "A web app for user authentication, book management, and trade requests. Features a React frontend and a Flask backend with JWT.",
    link: "https://github.com/keerthi-1118",
    thumbnail: null,
    tags: ["React", "Flask", "JWT", "Docker", "Material UI"],
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
];

// --- ANIMATION VARIANTS ---
const descriptionVariants = {
  rest: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  hover: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

// --- PROJECT CARD COMPONENT ---
const ProjectCard = ({ project, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        delay: 0.3 + index * 0.1,
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-card/80 backdrop-blur-sm rounded-3xl burnt-edge shadow-[var(--shadow-paper)] hover:shadow-[var(--shadow-lifted)] transition-all duration-700 group overflow-hidden border border-border/20 hover:border-accent/30 flex flex-col w-full max-w-[400px] h-full"
    >
      <div className="relative h-48 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 overflow-hidden flex-shrink-0">
        {project.thumbnail && (
          <img 
            src={project.thumbnail} 
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-90 transition-opacity duration-300"
          />
        )}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
         {/* Decorative elements restored */}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h4 className="font-heading text-2xl mb-3 group-hover:text-accent transition-colors duration-500">
          {project.title}
        </h4>
        
        <motion.div
          className="overflow-hidden"
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
      </div>
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
          <h2 className="font-heading text-5xl md:text-6xl mb-16 text-center ink-text">
            The Chronicle
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
            {/* Education and Experience sections remain unchanged... */}
            <div>
              <h3 className="font-heading text-3xl mb-8 text-primary">Education</h3>
              <div className="space-y-8 relative before:absolute before:left-4 before:top-0 before:bottom-0 before:w-0.5 before:bg-accent/30">
                {education.map((edu, index) => (
                  <motion.div
                    key={`${edu.degree}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="relative pl-12 group"
                  >
                    <div className="absolute top-0 left-4 w-4 h-4 bg-accent rounded-full border-4 border-background -translate-x-2 z-10" />
                    <div className="flex items-center gap-2 mb-2"><GraduationCap className="w-5 h-5 text-accent" /><span>{edu.period}</span></div>
                    <h4 className="font-heading text-2xl mb-1">{edu.degree}</h4>
                    <p className="font-body text-lg text-accent mb-3">{edu.institution}</p>
                    <p className="font-body text-base text-muted-foreground">({edu.gpa})</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading text-3xl mb-8 text-primary">Professional Journey</h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.title}
                    initial={{ opacity: 0, x: 25 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.2, duration: 0.7, ease: "easeOut" }}
                  >
                    <div className="bg-card p-6 rounded-lg burnt-edge shadow-[var(--shadow-paper)]">
                      <div className="flex items-start gap-2 mb-2"><Calendar className="w-5 h-5 text-accent mt-1" /><span>{exp.period}</span></div>
                      <h4 className="font-heading text-2xl mb-1">{exp.title}</h4>
                      <p className="font-body text-lg text-accent mb-3">{exp.company}</p>
                      <p className="font-body text-base leading-relaxed mb-4">{exp.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map(tag => <span key={tag} className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm">{tag}</span>)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-3xl mb-8 text-primary">Notable Works</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {projects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
