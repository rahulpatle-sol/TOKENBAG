import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

export const TokenModal = ({ isOpen, onClose, onCreate }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = () => {
    onCreate(apiKey); // Dashboard mein jo handleCreate hai usko ye key pass hogi
    setApiKey("");    // Clear input
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />
          <motion.div 
            initial={{ y: 100, scale: 0.9, opacity: 0 }} 
            animate={{ y: 0, scale: 1, opacity: 1 }} 
            exit={{ y: 100, scale: 0.9, opacity: 0 }}
            className="relative bg-[#0a0a0a] border border-white/10 p-12 rounded-[3rem] w-full max-w-xl shadow-[0_0_100px_rgba(37,99,235,0.1)]"
          >
            <button onClick={onClose} className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors"><X size={24}/></button>
            
            <div className="mb-10 text-center">
              <div className="inline-flex p-4 bg-blue-600/10 rounded-3xl text-blue-500 mb-4">
                <Sparkles size={32} />
              </div>
              <h3 className="text-4xl font-black tracking-tighter italic uppercase">Initialize_Bag</h3>
              <p className="text-gray-500 mt-2 font-mono text-sm uppercase tracking-widest">Deploying to decentralized vault</p>
            </div>
            
            <div className="space-y-8">
              <div className="group">
                <label className="text-[10px] text-gray-500 uppercase tracking-[0.4em] mb-3 block ml-2">Master_API_Key (Groq)</label>
                <input 
                  type="password" 
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="gsk_xxxxxxxxxxxxxxxxxxxx" 
                  className="w-full bg-white/[0.03] border border-white/10 p-6 rounded-2xl outline-none focus:border-blue-500 focus:bg-white/[0.05] transition-all font-mono text-blue-400 placeholder:text-gray-700" 
                />
                <p className="text-[10px] text-gray-600 mt-3 ml-2 italic underline underline-offset-4 decoration-blue-500/30">Leave blank to use system default key</p>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full py-6 bg-blue-600 text-white rounded-[1.5rem] font-black tracking-widest flex items-center justify-center gap-3 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_40px_rgba(37,99,235,0.2)]"
              >
                EXECUTE DEPLOYMENT <Send size={20}/>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};