import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get EmailJS credentials from environment variables
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Check if EmailJS is configured
    if (!serviceId || !templateId || !publicKey) {
      toast.error("Email service is not configured. Please contact me directly via email.");
      setIsSubmitting(false);
      return;
    }

    try {
      if (!formRef.current) {
        throw new Error("Form reference not found");
      }

      // Send email using EmailJS
      await emailjs.sendForm(
        serviceId,
        templateId,
        formRef.current,
        publicKey
      );

      toast.success("Message sent successfully! I'll get back to you soon.");
      formRef.current.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again or contact me directly via email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:keerthitadikonda62@gmail.com" },
    { icon: Github, label: "GitHub", href: "https://github.com/keerthi-1118" },
    { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/tadikonda-keerthi/" },
  ];

  return (
    <section id="contact" ref={ref} className="min-h-screen flex items-center py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl mx-auto"
        >
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
              delay: 0.1
            }}
            className="font-heading text-5xl md:text-6xl mb-8 text-center ink-text"
          >
            The Final Page
          </motion.h2>

          <motion.div
            initial={{ 
              opacity: 0, 
              y: 80,
              scale: 0.95,
              filter: "blur(10px)"
            }}
            animate={isInView ? { 
              opacity: 1, 
              y: 0,
              scale: 1,
              filter: "blur(0px)"
            } : {}}
            transition={{ 
              delay: 0.3, 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1],
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 1.2
            }}
            className="bg-card/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-3xl burnt-edge shadow-[var(--shadow-paper)] mb-12 relative overflow-hidden"
            style={{
              border: '1.5px solid hsl(var(--border) / 0.2)',
              boxShadow: `
                inset 0 1px 2px 0 hsl(var(--border) / 0.05),
                inset 0 -1px 2px 0 hsl(var(--border) / 0.05),
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06)
              `,
            }}
            whileHover={{
              boxShadow: '0 0 30px hsl(var(--accent) / 0.4), 0 0 60px hsl(var(--accent) / 0.2), var(--shadow-paper)',
              y: -5,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 1.0, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.5
              }}
              className="font-body text-xl text-center mb-8 leading-relaxed"
            >
              Every great story deserves a conversation. Whether you're looking to collaborate on a project, 
              discuss opportunities, or simply connect—I'd love to hear from you.
            </motion.p>

            {/* Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6 mb-8">
              <motion.div 
                className="grid md:grid-cols-2 gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 1.0, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.7
                }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.9, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.8
                  }}
                >
                  <label htmlFor="name" className="block font-body text-sm mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="from_name"
                    placeholder="Ms/Mr"
                    required
                    className="bg-background/50 border-border focus:border-accent transition-all duration-500 hover:border-accent/50 hover:shadow-sm focus:scale-[1.01]"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.9, 
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.9
                  }}
                >
                  <label htmlFor="email" className="block font-body text-sm mb-2">
                    Your Email
                  </label>
                  <Input
                    id="email"
                    name="from_email"
                    type="email"
                    placeholder="@example.com"
                    required
                    className="bg-background/50 border-border focus:border-accent transition-all duration-500 hover:border-accent/50 hover:shadow-sm focus:scale-[1.01]"
                  />
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 1.0, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1.0
                }}
              >
                <label htmlFor="message" className="block font-body text-sm mb-2">
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={6}
                  className="bg-background/50 border-border focus:border-accent resize-none transition-all duration-500 hover:border-accent/50 hover:shadow-sm focus:scale-[1.01]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 1.0, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 1.2
                }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-body text-lg py-6 group transition-all duration-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-all duration-500 group-hover:opacity-80" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Social Links */}
            <div className="flex justify-center gap-6">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ 
                    delay: 1.4 + index * 0.1, 
                    duration: 1.0, 
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="w-14 h-14 bg-accent/20 hover:bg-accent/30 rounded-full flex items-center justify-center text-accent transition-all duration-700 hover:scale-110 hover:shadow-lg hover:shadow-accent/30 group"
                  aria-label={link.label}
                  whileHover={{
                    boxShadow: '0 0 15px hsl(var(--accent) / 0.6), 0 0 30px hsl(var(--accent) / 0.3)',
                  }}
                >
                  <link.icon className="w-6 h-6 transition-all duration-700 group-hover:animate-float group-hover:opacity-90 group-hover:scale-110" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Signature */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
              delay: 1.8, 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="text-center space-y-4"
          >
            <motion.p 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.85, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
              className="font-body text-lg transition-opacity duration-700"
            >
              Sincerely,
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: 2.0, 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1]
              }}
              className="font-signature text-5xl text-accent transition-all duration-700 hover:opacity-80"
            >
              ~ Keerthi Tadikonda
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative ink splatter */}
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
};