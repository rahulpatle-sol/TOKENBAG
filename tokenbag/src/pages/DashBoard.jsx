import { useState, useEffect } from 'react';
import { Plus, Loader2, ArrowRight, Trash2, Power, PowerOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/Supabase'; 
import { createBag } from '../lib/api';

export const Dashboard = () => {
  const [bags, setBags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [externalId, setExternalId] = useState("");
  const [newKey, setNewKey] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const fetchBags = async () => {
    try {
      // 1. Check Session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const user = session.user;
      setUserProfile(user.user_metadata);

      // 2. Fetch only THIS user's bags
      const { data, error } = await supabase
        .from('token_bags')
        .select('*')
        .eq('user_id', user.id) // Sirf aapke banaye bags
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setBags(data);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchBags();
    // Real-time update (Optional but good)
    const subscription = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'token_bags' }, fetchBags)
      .subscribe();

    return () => supabase.removeChannel(subscription);
  }, []);

  const toggleService = async (id, currentStatus) => {
    const { error } = await supabase
      .from('token_bags')
      .update({ is_active: !currentStatus })
      .eq('id', id);
    if (!error) fetchBags();
  };

  const deleteBag = async (id) => {
    if (window.confirm("Bhai, delete kar du?")) {
      const { error } = await supabase.from('token_bags').delete().eq('id', id);
      if (!error) fetchBags();
    }
  };

  const handleCreateBag = async () => {
    setIsCreating(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const res = await createBag({ 
        apiKey: newKey || undefined, 
        userId: user.id, 
        email: user.email 
      });

      if (res.data.success) {
        setIsModalOpen(false);
        setNewKey("");
        fetchBags();
      }
    } catch (err) {
      alert("Creation Failed: " + err.message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white pt-28 px-6 md:px-10 pb-20 font-sans">
      
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12 bg-white/[0.02] border border-white/5 p-6 rounded-[2rem]">
        <div className="flex items-center gap-4">
          {userProfile?.avatar_url ? (
            <img src={userProfile.avatar_url} className="w-12 h-12 rounded-full border-2 border-blue-600" alt="profile" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              {userProfile?.full_name?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <h4 className="text-lg font-black italic uppercase tracking-tighter">
              {userProfile?.full_name || "Agent_Active"}
            </h4>
            <p className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">Auth_Node: Verified</p>
          </div>
        </div>
        <div className="text-right hidden md:block">
            <p className="text-[10px] text-gray-500 uppercase font-mono">Status</p>
            <p className="text-xs font-bold text-green-500">SYSTEM_OPTIMAL_1ms</p>
        </div>
      </div>

      {/* SEARCH/JOIN SECTION */}
      <div className="max-w-4xl mx-auto mb-16">
        <form onSubmit={(e) => { e.preventDefault(); if(externalId) window.location.href=`/chat/${externalId}` }} className="relative flex gap-4 bg-[#0a0a0a] border border-white/5 p-4 rounded-3xl focus-within:border-blue-500/50 transition-all">
          <input 
            type="text" 
            value={externalId} 
            onChange={(e) => setExternalId(e.target.value)} 
            placeholder="Enter External Bag ID to Connect..." 
            className="flex-1 bg-transparent p-4 outline-none font-mono text-sm" 
          />
          <button type="submit" className="bg-blue-600 px-8 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 uppercase text-[10px] tracking-widest">
            Connect <ArrowRight size={14}/>
          </button>
        </form>
      </div>

      {/* VAULT GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-10 px-2">
          <h2 className="text-5xl font-black italic tracking-tighter uppercase">Vault_Storage</h2>
          <button onClick={() => setIsModalOpen(true)} className="p-5 bg-white text-black rounded-full hover:rotate-90 transition-all shadow-xl active:scale-95">
            <Plus size={24}/>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-blue-500" size={40} /></div>
        ) : bags.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-[3rem]">
            <p className="text-gray-500 font-mono text-sm uppercase tracking-widest">Vault is empty. Deploy your first node.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bags.map((bag) => (
              <motion.div key={bag.id} whileHover={{ y: -5 }} className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[3rem] group hover:border-blue-500/30 transition-all">
                <div className="flex justify-between mb-8 items-start">
                  <div>
                    <p className="text-[9px] text-gray-600 uppercase font-mono italic">Network_Traffic</p>
                    <p className="text-2xl font-black text-blue-500 tracking-tighter">{bag.usage_count || 0} <span className="text-[10px]">MSG</span></p>
                  </div>
                  <button onClick={() => toggleService(bag.id, bag.is_active)} className={`p-3 rounded-2xl transition-all border ${bag.is_active ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                    {bag.is_active ? <Power size={18}/> : <PowerOff size={18}/>}
                  </button>
                </div>

                <div className="mb-10">
                   <p className="text-[9px] text-gray-600 uppercase font-mono mb-1">Node_Address</p>
                   <h3 className="text-lg font-mono text-gray-200">ID_{bag.bag_id}</h3>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/chat/${bag.bag_id}`);
                      alert("Link Copied! Share this with others.");
                    }} 
                    disabled={!bag.is_active} 
                    className="flex-1 py-4 bg-white/5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-600 disabled:opacity-20 transition-all"
                  >
                    Share_Node
                  </button>
                  <button onClick={() => deleteBag(bag.id)} className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all">
                    <Trash2 size={18}/>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6 backdrop-blur-md bg-black/60">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-[#0a0a0a] border border-white/10 p-10 rounded-[3rem] w-full max-w-md">
              <h3 className="text-3xl font-black mb-8 italic tracking-tighter uppercase">Deploy_New_Node</h3>
              <p className="text-[10px] text-gray-500 mb-4 font-mono uppercase tracking-widest">Master API Key (Optional)</p>
              <input 
                type="password" 
                value={newKey} 
                onChange={(e) => setNewKey(e.target.value)} 
                placeholder="Paste Groq Key here..." 
                className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl outline-none focus:border-blue-500 mb-8 font-mono text-xs text-blue-400" 
              />
              <div className="flex gap-4">
                <button onClick={() => setIsModalOpen(false)} className="flex-1 py-5 bg-white/5 rounded-2xl font-bold uppercase text-[10px]">Cancel</button>
                <button 
                  onClick={handleCreateBag} 
                  disabled={isCreating}
                  className="flex-[2] py-5 bg-blue-600 rounded-2xl font-black italic uppercase text-[10px] flex items-center justify-center gap-2"
                >
                  {isCreating ? <Loader2 className="animate-spin" size={14} /> : "Initialize_Node"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};