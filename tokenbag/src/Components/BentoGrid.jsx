import { Shield, Zap, Lock, EyeOff, Globe, Cpu } from 'lucide-react';

export const FeaturesBento = () => {
  return (
    <section className="py-40 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-full md:h-[700px]">
        
        {/* Card 1: The "Why" (Big Card) */}
        <div className="md:col-span-3 md:row-span-2 bg-white/5 border border-white/10 rounded-[2.5rem] p-12 flex flex-col justify-between group overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] group-hover:bg-cyan-500/20 transition-all" />
          <Shield className="text-cyan-500 mb-8" size={48} />
          <div>
            <h3 className="text-5xl font-black italic mb-6">KYU_BANAYA?</h3>
            <p className="text-gray-400 text-lg leading-relaxed font-light">
              Kyuki API keys share karna risk hai. <span className="text-white">Secure_Bag</span> ek tunnel banata hai jahan Mishal tumhari keys ko bina dekhe tumhare high-end models (Groq/Llama) use kar sake. 
            </p>
          </div>
        </div>

        {/* Card 2: Speed (Small Card) */}
        <div className="md:col-span-3 bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 flex items-center gap-6 group hover:border-cyan-500/50 transition-all">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-400">
            <Zap size={32} />
          </div>
          <div>
            <h4 className="text-xl font-bold uppercase italic">Zero_Latency</h4>
            <p className="text-gray-500 text-sm italic">Ultra-fast tunneling protocol.</p>
          </div>
        </div>

        {/* Card 3: Privacy */}
        <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center">
          <EyeOff className="text-purple-500 mb-4" />
          <span className="text-[10px] font-mono uppercase tracking-widest">No_Logs</span>
        </div>

        {/* Card 4: Global */}
        <div className="md:col-span-2 bg-cyan-500 rounded-[2.5rem] p-8 flex flex-col justify-between text-black group relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <Globe size={120} />
          </div>
          <h4 className="text-2xl font-black italic leading-tight uppercase">Global_Access_Gate</h4>
          <p className="text-sm font-bold opacity-80">Access from anywhere in the world with just one Bag ID.</p>
        </div>

      </div>
    </section>
  );
};