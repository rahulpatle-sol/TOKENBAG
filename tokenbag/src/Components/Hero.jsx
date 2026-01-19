import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene } from './Scene'; 
import { ArrowRight, Shield, Globe, Zap, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const containerRef = useRef();
  const titleRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Text Entrance
      gsap.from(".reveal", {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out"
      });

      // 2. Parallax on Title
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 30;
        const yPos = (clientY / window.innerHeight - 0.5) * 30;
        gsap.to(titleRef.current, { x: xPos, y: yPos, duration: 2, ease: "power2.out" });
      };
      window.addEventListener("mousemove", handleMouseMove);

      // 3. Bento Cards Scroll Entrance
      gsap.from(".bento-card", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: ".bento-section",
          start: "top 85%",
        }
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020202] text-white overflow-hidden selection:bg-blue-500">
      
      {/* NOISE TEXTURE OVERLAY */}
      <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* --- SECTION 1: 3D HERO --- */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20">
        <div className="absolute inset-0 z-0 scale-110">
          <Scene /> {/* This is where your 3D Nodes live */}
        </div>

        {/* TOP BADGE */}
        <div className="reveal z-10 mb-8">
            <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-2 group cursor-pointer hover:border-blue-500/50 transition-all">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">v2.0 Protocol Active</span>
                <ChevronRight size={14} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
            </div>
        </div>

        <div className="z-10 text-center px-6 pointer-events-none">
          <div ref={titleRef} className="will-change-transform">
            <h1 className="text-[12vw] md:text-[9vw] font-black italic tracking-tighter leading-none mb-4">
               TOKEN<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-green-500">BAG</span>
            </h1>
          </div>
          <p className="reveal max-w-2xl mx-auto text-gray-400 text-base md:text-xl font-medium leading-relaxed opacity-80">
            Encapsulated API sharing protocol. Mask identity, share compute, and <br className="hidden md:block"/> execute neural nodes with <span className="text-white">zero key exposure</span>.
          </p>

          <div className="reveal mt-12 flex flex-wrap items-center justify-center gap-5 pointer-events-auto">
            <a   href='/auth' className="px-10 py-5 bg-white text-black rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Initialize Vault
            </a>
            <a  href='/docs' className="px-10 py-5 bg-white/5 border border-white/10 backdrop-blur-xl rounded-full font-black uppercase text-xs tracking-widest hover:bg-white/10 transition-all">
                Read Docs.sh
            </a>
          </div>
        </div>

        {/* FLOATING HUD */}
        <div className="absolute bottom-12 left-12 hidden lg:block opacity-30 font-mono text-[9px] uppercase tracking-[0.3em] space-y-2">
            <p className="flex items-center gap-2"><div className="w-1 h-1 bg-blue-500"/> System: Quantum_Safe</p>
            <p className="flex items-center gap-2"><div className="w-1 h-1 bg-purple-500"/> Handshake: Active</p>
        </div>
      </section>

      {/* --- SECTION 2: BENTO GRID --- */}
      <section className="bento-section py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Card 1: Large Feature */}
          <div className="bento-card md:col-span-8 bg-[#080808] border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-opacity">
                <Shield size={180} className="text-blue-500" />
            </div>
            <div className="relative z-10">
                <h3 className="text-4xl font-black italic uppercase mb-6 tracking-tighter">The_Encapsulation</h3>
                <p className="text-gray-500 text-lg max-w-md font-medium leading-relaxed">
                    Every request is routed through a <span className="text-white">secure backend tunnel</span>. Your API keys never touch the client browser. Total isolation.
                </p>
            </div>
          </div>

          {/* Card 2: Medium Feature */}
          <div className="bento-card md:col-span-4 bg-blue-600 rounded-[3rem] p-10 flex flex-col justify-between text-white group cursor-pointer shadow-2xl shadow-blue-500/20">
             <div className="flex justify-between items-start">
                <Globe size={32} />
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                    <ArrowRight size={20} className="-rotate-45" />
                </div>
             </div>
             <div>
                <h4 className="text-3xl font-black italic uppercase mb-2">Global_Nodes</h4>
                <p className="text-blue-100 text-sm font-bold opacity-80 uppercase tracking-widest text-[10px]">99.9% Uptime Protocol</p>
             </div>
          </div>

        </div>
      </section>
    </div>
  );
};