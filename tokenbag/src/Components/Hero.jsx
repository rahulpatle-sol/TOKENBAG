import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene } from './Scene'; 
import { ArrowRight, Activity, Terminal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Mouse Parallax for Title
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 40;
        const yPos = (clientY / window.innerHeight - 0.5) * 40;
        
        gsap.to(titleRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 2. Horizontal Text Scroll
      gsap.to(".scrolling-text", {
        x: "-50%",
        scrollTrigger: {
          trigger: ".horizontal-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // 3. Bento Grid Animation
      gsap.from(".bento-card", {
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".bento-section",
          start: "top 70%",
        }
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020202] text-white overflow-hidden selection:bg-green-500 selection:text-black">
      
      {/* --- SECTION 1: 3D HERO --- */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <Scene /> {/* Neon Green & Purple Core */}
        
        {/* Glow Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_70%)] pointer-events-none" />

        <div className="z-10 text-center pointer-events-none">
          <div ref={titleRef} className="will-change-transform">
            <h1 className="text-[13vw] font-black italic tracking-tighter leading-none text-white drop-shadow-[0_0_60px_rgba(34,197,94,0.4)]">
              <span className="text-purple-500">T</span>OKEN<span className="text-green-500">B</span>AG
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 mt-6">
            <div className="h-[1px] w-12 bg-green-500/50" />
            <p className="font-mono text-green-400 tracking-[0.6em] text-[10px] uppercase animate-pulse">
              Protocol_Execution_Active
            </p>
            <div className="h-[1px] w-12 bg-green-500/50" />
          </div>
        </div>

        {/* Floating HUD Elements */}
        <div className="absolute bottom-12 left-12 font-mono text-[10px] text-gray-500 space-y-1">
          <p className="flex items-center gap-2"><Activity size={10} className="text-green-500"/> SYSTEM: QUANTUM_READY</p>
          <p className="flex items-center gap-2"><Terminal size={10} className="text-purple-500"/> ACCESS: Token Bag_GATEWAY</p>
        </div>
      </section>

      {/* --- SECTION 2: HORIZONTAL SCROLL (Neon Green Style) --- */}
      <section className="horizontal-wrapper py-16 bg-green-500 text-black border-y border-white/20 overflow-hidden relative">
        <div className="scrolling-text whitespace-nowrap text-[10vh] font-black italic uppercase select-none flex gap-10">
          <span>SHARE_POWER • NO_KEYS • ENCRYPTED_TUNNEL • token_EXECUTING • </span>
          <span>SHARE_POWER • NO_KEYS • ENCRYPTED_TUNNEL • MISHAL_EXECUTING • </span>
        </div>
      </section>

      {/* --- SECTION 3: BENTO GRID --- */}
      <section className="bento-section py-32 px-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          <div className="bento-card md:col-span-4 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-12 relative overflow-hidden group">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-green-500/10 blur-[100px] group-hover:bg-green-500/20 transition-all" />
            <h3 className="text-4xl font-bold italic mb-4">THE_EXECUTION</h3>
            <p className="text-gray-400 text-lg font-light leading-relaxed">
              Mishal can execute high-end AI models like <span className="text-green-500 font-mono">Llama-3</span> and <span className="text-purple-500 font-mono">Groq</span> directly from your shared token bag. Zero friction, total security.
            </p>
          </div>

          <div className="bento-card md:col-span-2 bg-purple-600/10 border border-purple-500/20 rounded-[2.5rem] p-10 flex flex-col justify-between group">
             <div className="p-4 bg-purple-500/20 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                <ArrowRight className="text-purple-400 rotate-[-45deg]" />
             </div>
             <h4 className="text-2xl font-black italic">Token Bag</h4>
          </div>

        </div>
        
      </section>
    </div>
  );
};