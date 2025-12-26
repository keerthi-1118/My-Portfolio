
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import parchmentTexture from '../assets/parchment-texture.jpg';
import quillInk from '../assets/quill-ink.jpg';

gsap.registerPlugin(TextPlugin);

interface IntroAnimationProps {
  onFinished: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onFinished }) => {
  const [show, setShow] = useState(true);
  const introRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const splatter1Ref = useRef<HTMLDivElement>(null);
  const splatter2Ref = useRef<HTMLDivElement>(null);
  const splatter3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed')) {
      setShow(false);
      onFinished();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('introPlayed', 'true');
        gsap.to(introRef.current, {
          opacity: 0,
          duration: 2,
          ease: 'power2.inOut',
          onComplete: () => {
            setShow(false);
            onFinished();
          }
        });
      }
    });

    tl.from(introRef.current, { 
        scaleY: 0, 
        duration: 1.5, 
        ease: 'power3.out',
        transformOrigin: 'top'
    })
      .to(titleRef.current, { 
        duration: 3,
        text: "The Alchemist's Folio", 
        ease: "none" 
      }, "-=.5")
      .fromTo(splatter1Ref.current, 
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 0.7, duration: 0.6, ease: 'back.out(1.7)' },
        "-=2.5"
       )
      .to(bioRef.current, { 
        duration: 5, 
        text: "Where digital code is transmuted into golden experiences. Penned by Keerthi.", 
        ease: "none" 
      }, "+=0.5")
      .fromTo(splatter2Ref.current, 
        { scale: 0, opacity: 0 },
        { scale: 1.2, opacity: 0.6, duration: 0.5, ease: 'back.out(1.7)' },
        "-=4"
       )
      .fromTo(splatter3Ref.current, 
        { scale: 0, opacity: 0 },
        { scale: 0.9, opacity: 0.5, duration: 0.5, ease: 'back.out(1.7)' },
        "-=2"
      )
      .to({}, {duration: 2.5}); // Pause before fading out

  }, [onFinished]);

  if (!show) {
    return null;
  }

  return (
    <div
      ref={introRef}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-cover bg-center p-4 overflow-hidden"
      style={{
        backgroundImage: `url(${parchmentTexture})`,
        cursor: `url(${quillInk}), auto`,
        transformOrigin: 'top'
      }}
    >
      <div className="relative text-center w-full max-w-4xl">
        {/* Ink Splatters */}
        <div ref={splatter1Ref} className="absolute top-\-10 left-1/4 w-16 h-16 bg-stone-900/70 rounded-full" style={{ filter: 'blur(4px)' }}></div>
        <div ref={splatter2Ref} className="absolute bottom-\-20 right-1/4 w-24 h-24 bg-stone-900/60 rounded-full" style={{ filter: 'blur(5px)' }}></div>
        <div ref={splatter3Ref} className="absolute top-1/2 left-1/2 w-12 h-12 bg-stone-900/50 rounded-full" style={{ filter: 'blur(3px)' }}></div>
        
        <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl text-stone-900 relative z-10" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></h1>
        <p ref={bioRef} className="font-serif text-lg md:text-xl text-stone-800 mt-6 max-w-2xl mx-auto relative z-10"></p>
      </div>
    </div>
  );
};
