import { motion } from 'framer-motion';
import { ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import { supabase } from '../lib/Supabase';// <-- Yeh zaroori hai bhai!

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
    console.log("Login sequence started:", data);
  } catch (error) {
    console.error("Auth Error details:", error.message);
    alert("Login Error: " + error.message);
  }
};

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-md p-10 mx-4"
      >
        <div className="bg-[#0f0f0f]/50 backdrop-blur-3xl border border-white/5 p-12 rounded-[4rem] shadow-2xl text-center">
          {/* Logo Box */}
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-[2rem] flex items-center justify-center mx-auto mb-10 rotate-12 hover:rotate-0 transition-transform duration-500 shadow-xl shadow-blue-500/20">
            <Lock className="text-white" size={32} />
          </div>

          <h2 className="text-5xl font-black tracking-tighter mb-4 italic uppercase text-white">Identity_Vault</h2>
          <p className="text-gray-500 font-light leading-relaxed mb-12 uppercase text-[10px] tracking-[0.3em]">
            Zero-Trust Protocol <br /> Authentication Required
          </p>

          <button 
            onClick={handleGoogleLogin}
            className="group relative w-full py-6 bg-white text-black rounded-[1.5rem] font-bold overflow-hidden transition-all active:scale-95"
          >
            {/* Hover Slide Effect */}
            <div className="absolute inset-0 bg-blue-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center justify-center gap-3 group-hover:text-white transition-colors duration-500 uppercase tracking-widest text-sm">
              Connect with Google <ArrowRight size={18} />
            </span>
          </button>

          <div className="mt-10 pt-10 border-t border-white/5 flex items-center justify-center gap-4 text-gray-600">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-mono tracking-widest uppercase">Secured by Supabase & AES-256</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};