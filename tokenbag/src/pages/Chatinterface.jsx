import { useState, useEffect, useRef } from 'react';
import { Send, Terminal, User, Loader2, ShieldCheck, AlertTriangle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useAI } from '../lib/api';

export const Chat = () => {
  const { bagId } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const scrollRef = useRef();

  useEffect(() => {
    // RSA & Email Confirmation Emulation
    const initTunnel = async () => {
      setTimeout(() => {
        setIsVerifying(false);
        setMessages([
          { role: 'system', text: `[SYSTEM]: RSA-256 Key Exchange Successful.` },
          { role: 'system', text: `[TUNNEL]: Connected to Bag #${bagId}. Session active.` }
        ]);
      }, 2000);
    };
    initTunnel();
  }, [bagId]);

  useEffect(() => { scrollRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userPrompt = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userPrompt }]);
    setIsTyping(true);

    try {
      const res = await useAI({ bagId: bagId, prompt: userPrompt });
      if (res.data.success) {
        setMessages(prev => [...prev, { role: 'ai', text: res.data.text }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { role: 'system', text: "CRITICAL_ERROR: Handshake failed. Node offline." }]);
    } finally { setIsTyping(false); }
  };

  if (isVerifying) return (
    <div className="h-screen bg-[#020202] flex flex-col items-center justify-center font-mono">
      <Loader2 className="animate-spin text-green-500 mb-6" size={40} />
      <p className="text-[10px] tracking-[0.5em] text-gray-500 animate-pulse">CONFIRMING_RSA_PATCH_ZONE...</p>
    </div>
  );

  return (
    <div className="h-screen pt-20 flex flex-col bg-[#020202] text-white selection:bg-blue-500">
      {/* HUD Header */}
      <div className="px-8 py-4 border-b border-white/5 bg-[#050505] flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="text-[10px] font-mono text-gray-400 tracking-[0.2em] uppercase">Status: Tunnel_Encrypted</span>
        </div>
        <div className="flex items-center gap-2 text-blue-500 font-mono text-[10px]">
          <ShieldCheck size={14}/> RSA_ACTIVE
        </div>
      </div>

      {/* Main Terminal Area */}
      <div className="flex-1 overflow-y-auto px-6 md:px-20 py-10 space-y-8">
        <div className="max-w-4xl mx-auto space-y-10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border shrink-0
                ${msg.role === 'ai' ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' : 
                  msg.role === 'system' ? 'border-dashed border-gray-700 text-gray-600' : 'border-white/20 bg-white/5 text-white'}`}>
                {msg.role === 'ai' ? <Terminal size={18}/> : <User size={18}/>}
              </div>
              
              <div className={`p-6 rounded-3xl max-w-[85%] text-sm leading-relaxed
                ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 
                  msg.role === 'system' ? 'text-gray-500 italic font-mono text-[11px]' : 'bg-[#0a0a0a] border border-white/5 rounded-tl-none'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-6 animate-pulse">
              <div className="w-10 h-10 rounded-full border border-blue-500/50 flex items-center justify-center text-blue-400"><Loader2 className="animate-spin" size={18}/></div>
              <div className="text-[11px] font-mono text-gray-500 self-center tracking-widest">MISHAL_IS_PATCHING_RESPONSE...</div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-10 bg-gradient-to-t from-black to-transparent">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto relative group">
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Send command to remote node..." 
            className="w-full bg-[#0a0a0a] border border-white/5 py-6 px-10 rounded-full focus:border-blue-600 outline-none transition-all pr-20 font-mono text-sm placeholder:text-gray-700"
          />
          <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-blue-600 rounded-full hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
            <Send size={18}/>
          </button>
        </form>
      </div>
    </div>
  );
};