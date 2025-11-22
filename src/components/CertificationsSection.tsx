
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CertImage from "@/assets/Cert.png"; // Using a generic certificate background

// Define the type for a single certificate
interface Certificate {
  issuer: string;
  title: string;
  description: string;
  date: string;
}

// Data for the certificates
const certifications: Certificate[] = [
  {
    issuer: "Coursera",
    title: "Machine Learning Specialization",
    description: "A deep dive into machine learning from Stanford University, covering everything from linear regression to neural networks.",
    date: "Dated this year 2023",
  },
  {
    issuer: "freeCodeCamp",
    title: "Responsive Web Design",
    description: "Mastered HTML, CSS, Flexbox, Grid, and responsive design principles to build accessible and visually appealing websites.",
    date: "Dated this year 2022",
  },
  {
    issuer: "HackerRank",
    title: "Problem Solving (Advanced)",
    description: "Achieved an advanced rating in competitive programming, solving complex algorithmic challenges.",
    date: "Dated this year 2023",
  },
];


// Define the type for the props of CertificateCard
interface CertificateCardProps {
  cert: Certificate;
  index: number;
  isInView: boolean;
}

const CertificateCard = ({ cert, index, isInView }: CertificateCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 60, scale: 0.9 }}
    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
    transition={{
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 1,
      delay: 0.2 + index * 0.1,
    }}
    whileHover={{
      y: -10,
      scale: 1.03,
      boxShadow: "0px 20px 40px -10px rgba(189, 161, 84, 0.3), 0px 5px 15px -5px rgba(0, 0, 0, 0.2)",
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }}
    className="relative font-serif text-[#5a4e3e] aspect-[4/3] w-full max-w-[460px] mx-auto"
  >
    {/* Background Image */}
    <img src={CertImage} alt="Certificate background" className="absolute inset-0 w-full h-full object-cover rounded-lg shadow-lg" />
    
    {/* Content Overlay */}
    <div className="absolute inset-0 p-[11%] flex flex-col justify-between">
      <div>
        <p className="text-sm italic opacity-80">Awarded by</p>
        <h3 className="text-3xl font-semibold text-[#bda154] tracking-wider -mt-1">{cert.issuer}</h3>
      </div>
      
      <div className="text-center">
        <h2 className="text-xl font-bold tracking-wide leading-tight">{cert.title}</h2>
        <p className="text-xs italic mt-2 opacity-70 max-w-xs mx-auto">{cert.description}</p>
      </div>

      <div className="flex justify-between items-end">
        <p className="text-xs italic opacity-80">{cert.date}</p>
        <span className="text-xl opacity-70">⍟</span>
      </div>
    </div>
  </motion.div>
);


const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-150px" });

  return (
    <section id="certifications" ref={ref} className="py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-heading text-5xl md:text-6xl text-center mb-20 ink-text"
        >
          Credentials & Accolades
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-7xl mx-auto">
          {certifications.map((cert, index) => (
            <CertificateCard key={index} cert={cert} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
