import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lock, Fingerprint } from 'lucide-react';
import { supabase } from '../lib/Supabase';

export const Auth = () => {
  
  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Auth Error:", error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#020202] overflow-hidden px-6">
      
      {/* 1. GRAIN OVERLAY (Premium SaaS Feel) */}
      <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* 2. RESPONSIVE BACKGROUND GLOWS */}
      <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/10 rounded-full blur-[80px] md:blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-md"
      >
        <div className="bg-[#080808]/80 backdrop-blur-2xl border border-white/5 p-8 md:p-14 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden">
          
          {/* Top Tag - Mobile Responsive */}
          <div className="flex justify-center mb-8">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-[9px] font-mono tracking-[0.2em] text-blue-400 uppercase">
                <Fingerprint size={12}/> Secure_Access_Point
             </div>
          </div>

          {/* Logo Animation */}
          <motion.div 
            whileHover={{ rotate: 0, scale: 1.05 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mx-auto mb-8 md:mb-10 rotate-12 transition-all duration-500 shadow-xl shadow-blue-500/20"
          >
            <Lock className="text-white" size={28} />
          </motion.div>

          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 italic uppercase text-white leading-none">
              Identity<br/><span className="text-blue-500">_Vault</span>
            </h2>
            <p className="text-gray-500 font-medium leading-relaxed mb-10 md:mb-12 uppercase text-[9px] md:text-[10px] tracking-[0.2em] max-w-[200px] mx-auto">
              Authorization required to <br className="hidden md:block"/> access shared nodes.
            </p>
          </div>

          {/* Connect Button */}
          <button 
            onClick={handleGoogleLogin}
            className="group relative w-full py-5 md:py-6 bg-white text-black rounded-[1.2rem] md:rounded-[1.5rem] font-bold overflow-hidden transition-all active:scale-95 shadow-lg shadow-white/5"
          >
            {/* Background Animation On Hover */}
            <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-expo" />
            
            <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-500 uppercase tracking-[0.15em] text-xs md:text-sm">
              Connect with Google <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>

          {/* Bottom Footer Info */}
          <div className="mt-8 md:mt-10 pt-8 md:pt-10 border-t border-white/5">
            <div className="flex items-center justify-center gap-4 text-gray-600">
              <ShieldCheck size={14} className="text-blue-500/50" />
              <span className="text-[8px] md:text-[10px] font-mono tracking-widest uppercase font-semibold">
                Protocol: <span className="text-gray-400">STP/2.0_Active</span>
              </span>
            </div>
            
            <p className="mt-4 text-[8px] text-gray-700 uppercase tracking-widest text-center font-mono">
              Encryption: AES-256-GCM + SUPABASE_AUTH
            </p>
          </div>
        </div>
      </motion.div>

      {/* 3. SUBTLE DECORATIVE LINE (Mobile Hidden) */}
      <div className="absolute bottom-10 left-10 hidden md:block">
         <div className="flex items-center gap-4">
            <div className="h-[1px] w-20 bg-white/10" />
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.5em]">System_Ready</p>
         </div>
      </div>
    </div>
  );
};