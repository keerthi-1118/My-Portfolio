
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import parchmentTexture from '../assets/parchment-texture.jpg';
import quillInk from '../assets/quill-ink.jpg';

interface IntroAnimationProps {
  onFinished: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onFinished }) => {
  const [show, setShow] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('introPlayed')) {
      setShow(false);
      onFinished();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('introPlayed', 'true');
      },
    });

    tl.to(scrollRef.current, {
      width: '100%',
      duration: 3,
      ease: 'power2.inOut',
    })
      .to(textRef.current, {
        text: 'Dear Reader,',
        duration: 2,
        ease: 'none',
      })
      .to(buttonRef.current, {
        opacity: 1,
        duration: 1,
      });
  }, [onFinished]);

  const handleEnter = () => {
    gsap.to(introRef.current, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        setShow(false);
        onFinished();
      },
    });
  };

  if (!show) {
    return null;
  }

  return (
    <div
      ref={introRef}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
      style={{ cursor: `url(${quillInk}), auto` }}
    >
      <div className="absolute inset-0 bg-black" style={{ background: 'radial-gradient(circle, transparent, black 80%)' }}></div>
      <div
        ref={scrollRef}
        className="relative h-3/4 bg-no-repeat bg-cover bg-center rounded-lg shadow-2xl"
        style={{
          width: '10%',
          backgroundImage: `url(${parchmentTexture})`,
          boxShadow: '0 0 100px rgba(255, 223, 186, 0.3)',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center h-full">
          <p ref={textRef} className="font-serif text-4xl text-stone-800"></p>
          <button
            ref={buttonRef}
            onClick={handleEnter}
            className="opacity-0 mt-8 px-6 py-2 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition-all duration-300 shadow-lg"
            style={{
                boxShadow: '0 0 15px rgba(255, 223, 186, 0.5)',
            }}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};
