import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Zap, Cpu, Database, Share2, Key, EyeOff } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Protocol = () => {
  const containerRef = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal animations for sections
      gsap.utils.toArray(".protocol-section").forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020202] text-white min-h-screen font-sans selection:bg-blue-500">
      
      {/* 1. HERO: WHY STP? */}
      <section className="protocol-section pt-40 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold tracking-[0.3em] uppercase mb-8">
          The Problem vs The Solution
        </div>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-8 leading-none">
          WHY_<span className="text-blue-500 text-outline-white">STP?</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed max-w-3xl mx-auto">
          API keys are like master keys to your digital vault. Sharing them in plain text is a security nightmare. 
          <span className="text-white font-bold italic"> Sharable Token Protocol</span> wraps your power in a secure, non-custodial layer.
        </p>
      </section>

      {/* 2. THE PROCESS: HOW IT WORKS */}
      <section className="protocol-section py-32 px-6 bg-white/5 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-10 tracking-tighter">The_Architecture</h2>
            <div className="space-y-12">
              {[
                { icon: <Lock />, title: "Encapsulation", desc: "Your API Key is encrypted and stored in an isolated Supabase vault. It never leaves the server." },
                { icon: <Zap />, title: "Token Masking", desc: "A unique Bag_ID is generated. This ID acts as a proxy for your compute power." },
                { icon: <Share2 />, title: "Distributed Access", desc: "Users connect via Bag_ID. The protocol validates the request and routes it to Groq/Llama." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold italic mb-2 tracking-tight">0{i+1}. {item.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
             {/* Visual Diagram Placeholder */}
             <div className="aspect-square bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[4rem] border border-white/10 flex items-center justify-center p-12">
                <div className="w-full h-full border border-dashed border-white/20 rounded-full animate-spin-slow flex items-center justify-center relative">
                   <div className="absolute top-0 bg-blue-500 p-4 rounded-xl shadow-lg shadow-blue-500/50"><Cpu size={32}/></div>
                   <div className="absolute bottom-0 bg-purple-500 p-4 rounded-xl shadow-lg shadow-purple-500/50"><Database size={32}/></div>
                   <div className="bg-white p-6 rounded-3xl text-black"><Lock size={40}/></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. SECURITY: THE STACK */}
      
      <section className="protocol-section py-32 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black italic tracking-tighter mb-4 uppercase">Security_Stack</h2>
          <p className="text-gray-500 font-mono text-xs tracking-widest uppercase">Encryption Standard: Grade-A Enterprise</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <EyeOff />, title: "Zero_Logs", text: "We don't log your prompts or API outputs. Privacy is hardcoded." },
            { icon: <Shield />, title: "Non-Custodial", text: "You own your keys. You can revoke access instantly from the dashboard." },
            { icon: <Fingerprint className="text-blue-500" />, title: "Handshake v2", text: "Every session is validated using dynamic JWT tokens through Supabase." }
          ].map((item, i) => (
            <div key={i} className="p-10 bg-[#080808] border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all">
               <div className="mb-6">{item.icon}</div>
               <h4 className="text-lg font-bold italic uppercase mb-4 tracking-tighter">{item.title}</h4>
               <p className="text-gray-500 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="protocol-section py-40 px-6">
        <div className="bg-blue-600 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-20 group-hover:rotate-45 transition-transform duration-1000">
            <Zap size={200} fill="white" />
          </div>
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
            Ready_to_Deploy?
          </h2>
          <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-medium">
            Join the next generation of AI compute sharing. Secure your node today.
          </p>
          <button className="px-12 py-5 bg-white text-black rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform shadow-2xl">
            Go to Identity_Vault
          </button>
        </div>
      </section>

    </div>
  );
};

const Fingerprint = ({ className, size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
);