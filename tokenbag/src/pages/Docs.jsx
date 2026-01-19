import { useEffect, useRef } from 'react';
import { Terminal, Copy, BookOpen, Code, Cpu, ShieldCheck, Share2, Info } from 'lucide-react';
import gsap from 'gsap';

export const Docs = () => {
  const sidebarLinks = [
    "Introduction", "The STP Protocol", "Setup Guide", "Creating Nodes", "Security Model", "API Reference"
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-blue-500">
      
      {/* 1. TOP PROGRESS BAR */}
      <div className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-purple-500 z-[100] w-full" />

      <div className="max-w-[1440px] mx-auto flex">
        
        {/* --- SIDEBAR (Desktop Only) --- */}
        <aside className="hidden lg:block w-72 h-screen sticky top-0 border-r border-white/5 p-10 pt-32 overflow-y-auto">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.3em] mb-8">Documentation</p>
          <nav className="space-y-6">
            {sidebarLinks.map((link) => (
              <a key={link} href={`#${link.toLowerCase().replace(/ /g, '-')}`} 
                 className="block text-sm text-gray-500 hover:text-blue-400 transition-colors font-medium">
                {link}
              </a>
            ))}
          </nav>
        </aside>

        {/* --- MAIN CONTENT --- */}
        <main className="flex-1 pt-32 pb-40 px-6 md:px-20 max-w-4xl">
          
          {/* Section: Intro */}
          <section id="introduction" className="mb-24">
            <div className="flex items-center gap-3 mb-6 text-blue-500">
              <BookOpen size={20} />
              <span className="text-[10px] font-mono uppercase tracking-widest">Guide_v2.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-8 uppercase leading-none">
              The_Technical<br/><span className="text-blue-500 italic">Manifesto</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-6 font-medium">
              TokenBag is a non-custodial infrastructure built for the decentralized sharing of AI compute. 
              Our goal is to solve the <span className="text-white">"Key Leakage"</span> problem by creating a secure proxy layer between API providers (Groq/Llama) and end-users.
            </p>
          </section>

          {/* Section: How it Works (STP Protocol) */}
          <section id="the-stp-protocol" className="mb-24">
            <h2 className="text-2xl font-black italic uppercase mb-8 flex items-center gap-3">
              <Cpu size={24} className="text-purple-500" /> 01. The STP Protocol
            </h2>
            <p className="text-gray-400 mb-10 leading-relaxed">
              Sharable Token Protocol (STP) is our proprietary handshaking mechanism. It works in three distinct phases:
            </p>

            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                <div className="text-blue-500 mb-4 font-mono text-xs font-bold">Phase_01</div>
                <h4 className="font-bold text-sm mb-2 uppercase italic">Vaulting</h4>
                <p className="text-[11px] text-gray-500">API keys are AES-256 encrypted and stored in a private Supabase vault instance.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                <div className="text-purple-500 mb-4 font-mono text-xs font-bold">Phase_02</div>
                <h4 className="font-bold text-sm mb-2 uppercase italic">Bag Creation</h4>
                <p className="text-[11px] text-gray-500">A unique identifier (Bag_ID) is generated, linking the user to specific compute limits.</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/5 rounded-3xl">
                <div className="text-green-500 mb-4 font-mono text-xs font-bold">Phase_03</div>
                <h4 className="font-bold text-sm mb-2 uppercase italic">Proxy Exec</h4>
                <p className="text-[11px] text-gray-500">Requests are routed through our Edge-Tunnel, stripping all sensitive metadata.</p>
              </div>
            </div>
          </section>

          {/* Section: Creating Nodes (Step-by-Step) */}
          <section id="creating-nodes" className="mb-24">
            <h2 className="text-2xl font-black italic uppercase mb-10 flex items-center gap-3">
              <Terminal size={24} className="text-blue-500" /> 02. Creating Your Node
            </h2>
            
            <div className="space-y-12 border-l border-white/5 ml-4 pl-10 relative">
              <div className="relative">
                <div className="absolute -left-[50px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-[#020202]" />
                <h3 className="font-bold text-white mb-2 italic uppercase tracking-tight">Step 01: Connect Identity</h3>
                <p className="text-gray-500 text-sm">Auth via Identity Vault (Google/Supabase). This creates your secure master bucket.</p>
              </div>
              
              <div className="relative">
                <div className="absolute -left-[50px] top-1 w-5 h-5 bg-white/20 rounded-full border-4 border-[#020202]" />
                <h3 className="font-bold text-white mb-2 italic uppercase tracking-tight">Step 02: Attach Compute</h3>
                <p className="text-gray-500 text-sm">Add your Groq API key. The protocol will run a 0.01ms handshake to verify tokens.</p>
                <div className="mt-4 p-4 bg-black rounded-xl border border-white/5 font-mono text-[11px]">
                   <span className="text-gray-500">// Initialize bag</span><br/>
                   const myBag = TokenBag.<span className="text-blue-400">create</span>({"{"} <br/>
                   &nbsp;&nbsp;provider: <span className="text-green-400">'groq'</span>, <br/>
                   &nbsp;&nbsp;limit: <span className="text-purple-400">'unlimited'</span> <br/>
                   {"}"})
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[50px] top-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-[#020202]" />
                <h3 className="font-bold text-white mb-2 italic uppercase tracking-tight">Step 03: Distributed Sharing</h3>
                <p className="text-gray-500 text-sm">Deploy the Bag. Copy the Bag_ID and share it. Users can now use your power via your tunnel.</p>
              </div>
            </div>
          </section>

          {/* Section: Security */}
          <section id="security-model" className="mb-24">
            <div className="p-10 bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[3rem]">
              <h2 className="text-2xl font-black italic uppercase mb-6 flex items-center gap-3">
                <ShieldCheck size={24} className="text-green-500" /> Security_Architecture
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed font-medium">
                We implement <span className="text-white font-bold italic">Zero-Knowledge-Metadata</span>. Our proxy servers do not log prompt content or user-specific API keys.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-[9px] uppercase tracking-widest text-gray-500">
                <span className="px-4 py-2 bg-white/5 rounded-full border border-white/5">AES-256-GCM</span>
                <span className="px-4 py-2 bg-white/5 rounded-full border border-white/5">TLS 1.3 Tunneling</span>
                <span className="px-4 py-2 bg-white/5 rounded-full border border-white/5">JWT Auth</span>
              </div>
            </div>
          </section>

          {/* Footer Info */}
          <div className="pt-10 border-t border-white/5 flex justify-between items-center opacity-40">
            <p className="text-[10px] font-mono">Last Updated: Jan 2026</p>
            <div className="flex gap-4">
              <Share2 size={16} />
              <Info size={16} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};