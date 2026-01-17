import { useState, useEffect } from 'react';
import { Plus, Zap, Share2, Shield, Search, Terminal, Loader2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/Supabase'; 
import { createBag } from '../lib/api';

export const Dashboard = () => {
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [externalId, setExternalId] = useState(""); // Doosre ki ID ke liye
  const [newKey, setNewKey] = useState("");

  const fetchBags = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase.from('token_bags').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (data) setBags(data);
      }
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchBags(); }, []);

  const handleJoinExternal = (e) => {
    e.preventDefault();
    if (externalId) window.location.href = `/chat/${externalId}`;
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-28 px-6 md:px-10 pb-20 font-sans">
      
      {/* SECTION 1: JOIN EXTERNAL NODE (Doosre ki ID use karne ke liye) */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="flex items-center gap-3 mb-6">
            <Search className="text-blue-500" size={20}/>
            <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-gray-500">Connect_To_External_Node</h3>
          </div>
          <form onSubmit={handleJoinExternal} className="relative flex gap-4">
            <input 
              type="text" 
              value={externalId}
              onChange={(e) => setExternalId(e.target.value)}
              placeholder="Enter Bag ID (e.g. X-9921)..."
              className="flex-1 bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-blue-500 transition-all font-mono text-sm"
            />
            <button type="submit" className="bg-blue-600 px-8 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 uppercase text-xs tracking-widest">
              Connect <ArrowRight size={16}/>
            </button>
          </form>
        </div>
      </div>

      {/* SECTION 2: YOUR VAULT (Apne create aur share karne ke liye) */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10 px-2">
          <div>
            <h2 className="text-6xl font-black italic tracking-tighter uppercase">Vault</h2>
            <p className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em] mt-2 italic">Managed_Nodes: {bags.length}</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="p-5 bg-white text-black rounded-full hover:scale-110 transition-all shadow-xl active:scale-95"
          >
            <Plus size={24}/>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bags.map((bag) => (
              <motion.div 
                key={bag.id}
                whileHover={{ y: -8 }}
                className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[3rem] group hover:border-blue-500/20 transition-all relative"
              >
                <div className="flex justify-between mb-10">
                  <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-500"><Zap size={20} fill="currentColor"/></div>
                  <span className="text-[9px] font-mono text-green-500 uppercase py-1 px-3 border border-green-500/20 rounded-full">Active_Patch</span>
                </div>
                <h3 className="text-xl font-mono mb-8 tracking-tighter text-gray-400 font-bold italic underline decoration-blue-500/30">ID: {bag.bag_id}</h3>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/chat/${bag.bag_id}`);
                    alert("TUNNEL_LINK_COPIED");
                  }}
                  className="w-full py-5 bg-white/5 rounded-2xl group-hover:bg-blue-600 transition-all font-bold uppercase text-[10px] tracking-widest flex items-center justify-center gap-3"
                >
                  Share Tunnel <Share2 size={14}/>
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL (New Bag Create) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] w-full max-w-md shadow-2xl"
            >
              <h3 className="text-3xl font-black mb-8 italic tracking-tighter uppercase">Initialize_Node</h3>
              <input 
                type="password" value={newKey} onChange={(e) => setNewKey(e.target.value)}
                placeholder="Groq API Key (Optional)" 
                className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl outline-none focus:border-blue-500 mb-8 font-mono text-xs"
              />
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-white/5 rounded-2xl font-bold uppercase text-[10px] tracking-widest">Cancel</button>
                <button onClick={async () => {
                   const { data: { user } } = await supabase.auth.getUser();
                   const res = await createBag({ apiKey: newKey || undefined, userId: user.id, email: user.email });
                   if (res.data.success) { setIsModalOpen(false); fetchBags(); }
                }} className="flex-[2] py-5 bg-blue-600 rounded-2xl font-black italic uppercase text-[10px] tracking-widest shadow-lg shadow-blue-500/20">Create_Bag</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};