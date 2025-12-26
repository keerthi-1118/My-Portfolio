
import { useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import videoSrc from "../assets/final_quill.mp4";

export const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  // Track when the section is in view. It will re-trigger every time.
  const isInView = useInView(sectionRef, { margin: "0px 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      // If the video is in view, restart and play it.
      if (videoRef.current) {
        // videoRef.current.currentTime = 0;
        // videoRef.current.play();
        // play logic handled by autoPlay for now to be safe
        videoRef.current.play().catch(e => console.log("Play failed", e));
      }
    }
    // else {
    // If the video is not in view, pause it.
    // if (videoRef.current) {
    //   videoRef.current.pause();
    // }
    // }
  }, [isInView]); // This effect runs whenever isInView changes.

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black"
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted  // Muted is required for most browsers to autoplay
        autoPlay // Ensure it plays automatically
        loop
        playsInline // Important for iOS compatibility
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
    </section>
  );
};
