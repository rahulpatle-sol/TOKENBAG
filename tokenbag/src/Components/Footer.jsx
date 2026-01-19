import React, { useEffect, useRef } from 'react';
import { Github, Twitter, Disc, ArrowUpRight, Globe, Zap, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const bigTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Big Text Parallax Effect
      gsap.fromTo(bigTextRef.current, 
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 0.05, 
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom", 
            end: "bottom bottom",
            scrub: 1,
          }
        }
      );

      // 2. Links Reveal
      gsap.from(".footer-col", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative bg-[#020202] pt-40 pb-12 px-6 md:px-20 overflow-hidden border-t border-white/5">
      
      {/* 1. CINEMATIC PARALLAX TEXT */}
      <div className="absolute top-10 left-0 w-full overflow-hidden pointer-events-none select-none">
        <h1 
          ref={bigTextRef}
          className="text-[22vw] font-black italic tracking-tighter leading-none text-white opacity-5 whitespace-nowrap"
        >
          TOKENBAG_SYSTEM
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-10">
          
          {/* Column 1: Brand & Status */}
          <div className="footer-col col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Zap size={16} className="text-white" fill="currentColor" />
              </div>
              <span className="font-black italic text-xl tracking-tighter">TOKENBAG</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-[200px] mb-8 uppercase tracking-widest font-medium">
              Next-gen protocol for secure AI compute distribution.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/5 border border-green-500/10">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[9px] font-mono text-green-500 uppercase tracking-widest">Network_Live</span>
            </div>
          </div>

          {/* Column 2: Protocol Links */}
          <div className="footer-col space-y-4">
            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em] mb-6">Execution</p>
            <ul className="space-y-3">
              {['Encryption', 'Groq Engine', 'Neural Proxy', 'Documentation'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-1 group">
                    {link} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="footer-col space-y-4">
            <p className="text-[10px] font-mono text-purple-500 uppercase tracking-[0.3em] mb-6">Connect</p>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all">
                <Twitter size={18} /> <span className="text-sm">Twitter/X</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all">
                <Github size={18} /> <span className="text-sm">Open Source</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-400 hover:text-white transition-all">
                <Disc size={18} /> <span className="text-sm">Discord Node</span>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter/CTA */}
          <div className="footer-col col-span-1">
             <p className="text-[10px] font-mono text-gray-400 uppercase tracking-[0.3em] mb-6">System_Alerts</p>
             <div className="relative group">
                <input 
                  type="text" 
                  placeholder="admin@node.local" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-mono focus:outline-none focus:border-blue-500/50 transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 p-1 hover:scale-110 transition-transform">
                   <ArrowRight size={16} />
                </button>
             </div>
             <p className="mt-4 text-[9px] text-gray-600 italic">Join the protocol for latest updates.</p>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:row items-center justify-between gap-6">
          <div className="flex items-center gap-6 text-[10px] font-mono text-gray-600 uppercase tracking-widest">
            <p>© 2026 MISHAL_LABS</p>
            <p className="hidden md:block">ISO/IEC 27001 COMPLIANT</p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-mono text-gray-400 hover:text-white transition-colors group"
          >
            BACK_TO_TOP <ArrowUpRight size={12} className="-rotate-90 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </footer>
  );
};

// Internal Arrow icon component since it wasn't imported
const ArrowRight = ({ size, className }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
    className={className}
  >
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export default Footer;