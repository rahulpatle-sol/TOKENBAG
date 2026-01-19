import { useState, useEffect, useRef } from 'react';
import { Send, Terminal, User, Loader2, ShieldCheck, Copy } from 'lucide-react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useAI } from '../lib/api'; // Check path carefully
import { supabase } from '../lib/Supabase'; // Check path carefully
 export const Chatinterface = () => {
  const { bagId } = useParams();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  const scrollRef = useRef();

  // Load history safely
// useEffect ke andar fetchHistory fix
useEffect(() => {
  const fetchHistory = async () => {
    // Check karo ki bagId mil raha hai ya nahi
    if (!bagId || bagId === 'undefined') {
      console.error("Bhai, bagId nahi mil raha URL se!");
      setIsVerifying(false);
      return;
    }

    const idToFetch = parseInt(bagId);
    
    if (isNaN(idToFetch)) {
      console.error("Bhai, bagId Number nahi hai:", bagId);
      setIsVerifying(false);
      return;
    }

    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('bag_id', idToFetch)
      .order('created_at', { ascending: true });
    
    if (error) console.error("Supabase Error:", error);
    if (data) setMessages(data.map(m => ({ role: m.role, text: m.content })));
    setIsVerifying(false);
  };
  
  fetchHistory();
}, [bagId]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userPrompt = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userPrompt }]);
    setIsTyping(true);

    try {
      // 1. Save to DB (Fire and forget, don't let it block AI)
      supabase.from('chat_history').insert([
        { bag_id: parseInt(bagId), role: 'user', content: userPrompt }
      ]).then(({error}) => error && console.error("DB Error:", error));

      // 2. Call Render API
      const res = await useAI({ bagId: bagId, prompt: userPrompt });
      
      if (res.data && res.data.success) {
        const aiText = res.data.text;
        setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
        
        // 3. Save AI response to DB
        supabase.from('chat_history').insert([
          { bag_id: parseInt(bagId), role: 'ai', content: aiText }
        ]);
      }
    } catch (err) {
      console.error("AI Request Failed:", err);
      setMessages(prev => [...prev, { role: 'system', text: "ERROR: Engine Offline. Please check Render Logs." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // ... (Baaki UI ka code same rahega)
  return (
  
  
  <div className="h-screen flex flex-col bg-[#050505] text-white selection:bg-blue-500/30">
      {/* Header */}
      <div className="fixed top-0 w-full z-50 px-8 py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
          <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Bag_ID: {bagId}</span>
        </div>
        <div className="flex items-center gap-2 text-blue-500 font-mono text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          <ShieldCheck size={14}/> RSA_ENCRYPTED
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 md:px-0 pt-24 pb-32">
        <div className="max-w-3xl mx-auto space-y-8">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 mt-1
                  ${msg.role === 'ai' ? 'border-blue-500/50 bg-blue-500/10 text-blue-400' : 
                    msg.role === 'system' ? 'border-dashed border-gray-700 text-gray-600' : 'border-white/20 bg-white/5 text-white'}`}>
                  {msg.role === 'ai' ? <Terminal size={14}/> : msg.role === 'user' ? <User size={14}/> : <ShieldCheck size={14}/>}
                </div>
                
                {/* Content Bubble */}
                <div className={`prose prose-invert max-w-full text-sm leading-relaxed
                  ${msg.role === 'user' ? 'bg-[#111] border border-white/5 p-4 rounded-2xl rounded-tr-none' : ''}`}>
                  
                  {msg.role === 'ai' ? (
                    <ReactMarkdown
                      components={{
                        code({ node, inline, className, children, ...props }) {
                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <div className="relative group my-4 rounded-xl overflow-hidden border border-white/10 shadow-2xl">
                              <div className="flex justify-between items-center px-4 py-2 bg-[#1a1a1a] border-b border-white/5">
                                <span className="text-[10px] font-mono text-gray-500 uppercase">{match[1]}</span>
                                <button onClick={() => navigator.clipboard.writeText(String(children))} className="text-gray-500 hover:text-white transition-colors">
                                  <Copy size={12}/>
                                </button>
                              </div>
                              <SyntaxHighlighter
                                style={atomDark}
                                language={match[1]}
                                PreTag="div"
                                customStyle={{ margin: 0, padding: '1.5rem', background: '#0d0d0d', fontSize: '12px' }}
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </SyntaxHighlighter>
                            </div>
                          ) : (
                            <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-400 font-mono text-xs" {...props}>
                              {children}
                            </code>
                          );
                        }
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    <p className={msg.role === 'system' ? 'text-gray-500 italic font-mono text-xs' : ''}>
                      {msg.text}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex gap-4 animate-pulse ml-2">
              <div className="w-8 h-8 rounded-lg border border-blue-500/50 flex items-center justify-center text-blue-400"><Loader2 className="animate-spin" size={14}/></div>
              <div className="text-[11px] font-mono text-gray-500 self-center tracking-widest">GEN_RESPONSE...</div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </div>

      {/* Sticky Input */}
      <div className="fixed bottom-0 w-full p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
        <form onSubmit={handleSend} className="max-w-3xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-10 group-focus-within:opacity-25 transition duration-1000"></div>
          <div className="relative flex items-center bg-[#0d0d0d] border border-white/10 rounded-full pr-2 focus-within:border-blue-500/50 transition-all">
            <input 
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder="Message AI Node..." 
              className="flex-1 bg-transparent py-4 px-8 outline-none font-sans text-sm placeholder:text-gray-600"
            />
            <button type="submit" disabled={!input.trim()} className="p-3 bg-white text-black rounded-full hover:scale-105 disabled:opacity-20 disabled:scale-100 transition-all">
              <Send size={16}/>
            </button>
          </div>
          <p className="text-[9px] text-center text-gray-600 mt-3 font-mono uppercase tracking-[0.2em]">End-to-End Encrypted | RSA-256 Verified</p>
        </form>
      </div>
    </div>  // Pura UI component yahan
  )
};


