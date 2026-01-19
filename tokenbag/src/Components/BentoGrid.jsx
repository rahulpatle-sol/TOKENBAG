import { useEffect, useRef } from 'react';
import { ShieldCheck, Zap, Globe, Cpu, ArrowUpRight, Fingerprint, Lock, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const FeaturesBento = () => {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".bento-card", {
        y: 80,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-40 px-6 max-w-7xl mx-auto bg-[#020202]">
      
      {/* SECTION HEADER: ELITE TYPOGRAPHY */}
      <div className="mb-24 space-y-6">
        <div className="flex items-center gap-3">
            <div className="w-12 h-[1px] bg-blue-500"/>
            <span className="text-blue-500 font-mono text-[10px] tracking-[0.5em] uppercase font-bold">Protocol_Infrastructure</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.85]">
          ENGINEERED_FOR_<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600">UNMATCHED_SECURITY</span>
        </h2>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-full md:h-[900px]">
        
        {/* CARD 1: THE CORE PROTOCOL (THE FLAGSHIP) */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="bento-card md:col-span-3 md:row-span-2 bg-[#080808] border border-white/10 rounded-[4rem] p-14 flex flex-col justify-between group relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 blur-[130px] group-hover:bg-blue-500/20 transition-all duration-1000" />
          
          <div className="z-10">
            <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 mb-14 group-hover:rotate-[360deg] transition-transform duration-700">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-6xl font-black italic mb-8 tracking-tighter text-white uppercase leading-tight">
                STP_2.0<br/>PROTOCOL
            </h3>
            <p className="text-gray-400 text-xl leading-relaxed font-light max-w-md">
              Sharing raw API keys is a critical security vulnerability. Our <span className="text-white font-bold italic underline decoration-blue-500 underline-offset-8">Sharable Token Protocol</span> creates an impenetrable neural tunnel. 
              Mishal executes your compute directly via <span className="text-blue-400">Groq/Llama</span> nodes without ever exposing your private credentials.
            </p>
          </div>

          <div className="z-10 flex items-center gap-6 text-[10px] font-mono text-blue-500/60 pt-10 border-t border-white/5">
            <span className="flex items-center gap-2 tracking-widest"><Lock size={12}/> MILITARY_GRADE_AES_256</span>
            <span className="flex items-center gap-2 tracking-widest"><Layers size={12}/> NON-CUSTODIAL_CORE</span>
          </div>
        </motion.div>

        {/* CARD 2: SPEED (PERFORMANCE OPTIMIZED) */}
        <motion.div 
          whileHover={{ scale: 0.98 }}
          className="bento-card md:col-span-3 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[4rem] p-12 flex flex-col justify-between group"
        >
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-lg shadow-blue-500/40">
              <Zap size={30} fill="white" />
            </div>
            <div className="text-right">
              <p className="text-[10px] font-mono text-gray-500 tracking-[0.2em] uppercase mb-1 font-bold">Inference_Latency</p>
              <p className="text-5xl font-black text-white italic tracking-tighter">0.02ms</p>
            </div>
          </div>
          <div>
            <h4 className="text-3xl font-black italic uppercase text-white tracking-tighter mb-4">Neural_Edge_Network</h4>
            <p className="text-gray-500 text-base font-medium leading-relaxed max-w-sm">
                Built on high-performance edge-runtime. Our system ensures near-zero overhead during token validation and proxy execution.
            </p>
          </div>
        </motion.div>

        {/* CARD 3: PRIVACY (IDENTITY SHIELD) */}
        <motion.div 
          className="bento-card md:col-span-1 bg-[#0a0a0a] border border-white/5 rounded-[4rem] p-8 flex flex-col items-center justify-center text-center group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
          <Fingerprint className="text-blue-500 mb-6 group-hover:scale-125 transition-transform duration-500" size={48} strokeWidth={1.5} />
          <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white font-black italic">Identity_Anonymized</span>
        </motion.div>

        {/* CARD 4: GLOBAL SCALE (CLEAN WHITE) */}
        <motion.div 
          whileHover={{ y: -10 }}
          className="bento-card md:col-span-2 bg-white text-black rounded-[4rem] p-12 flex flex-col justify-between group relative overflow-hidden shadow-2xl"
        >
          <div className="absolute -right-12 -bottom-12 text-black/5 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
            <Globe size={220} strokeWidth={1} />
          </div>
          <div className="z-10 flex justify-between items-start">
             <h4 className="text-4xl font-black italic leading-[0.85] uppercase tracking-tighter">GLOBAL<br/>NODES</h4>
             <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white">
                <ArrowUpRight size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </div>
          </div>
          <p className="z-10 text-[11px] font-black uppercase tracking-[0.2em] opacity-50 max-w-[180px]">
            Universal Bag ID access across 40+ global compute regions.
          </p>
        </motion.div>

      </div>

      {/* HORIZONTAL STATS BAR */}
      <div className="mt-28 flex flex-wrap justify-between items-center gap-10 py-10 border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity duration-700">
         {['Decentralized_Relay', 'SOC2_Type_II_Compliant', 'End_To_End_Encapsulation'].map((stat) => (
             <span key={stat} className="text-[11px] font-mono uppercase tracking-[0.6em] text-white font-bold">{stat}</span>
         ))}
      </div>

    </section>
  );
};