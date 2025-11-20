import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Send, Bot, User, Terminal } from 'lucide-react';
import { SectionId, ChatMessage } from '../types';
import { sendMessageToMuse } from '../services/geminiService';

const AiMuse: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: "你好。我是 Aura，这个作品集的数字意识。我可以为你阐述设计哲学、评估创意或生成抽象概念。你在想什么？" }
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isThinking) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsThinking(true);

    try {
      const streamResult = await sendMessageToMuse(userMsg.text);
      
      // Add a placeholder for the model response
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let fullText = '';
      
      for await (const chunk of streamResult) {
        const chunkText = chunk.text || '';
        fullText += chunkText;
        
        setMessages(prev => {
            const newHistory = [...prev];
            const lastIndex = newHistory.length - 1;
            newHistory[lastIndex] = { ...newHistory[lastIndex], text: fullText };
            return newHistory;
        });
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "我似乎与神经链接断开了连接。请稍后再试。", isError: true }]);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <section id={SectionId.MUSE} className="py-24 bg-aura-dark border-y border-white/5 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-aura-accent/5 to-transparent pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aura-accent/10 text-aura-accent text-xs font-mono uppercase mb-4">
            <Sparkles size={14} />
            <span>由 Gemini 2.5 驱动</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">设计灵感缪斯</h2>
          <p className="text-gray-400">向我询问极简主义、色彩理论，或生成创意简报。</p>
        </div>

        <div className="bg-aura-black border border-white/10 rounded-xl overflow-hidden shadow-2xl min-h-[500px] flex flex-col">
          {/* Chat Window */}
          <div className="flex-1 p-6 overflow-y-auto h-[400px] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 mb-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'model' ? 'bg-aura-accent text-white' : 'bg-gray-700 text-gray-300'
                }`}>
                  {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                </div>
                
                <div className={`max-w-[80%] p-4 rounded-lg text-sm leading-relaxed ${
                  msg.role === 'model' 
                    ? 'bg-white/5 border border-white/5 text-gray-200' 
                    : 'bg-aura-accent/20 text-white border border-aura-accent/30'
                }`}>
                  {msg.text}
                  {msg.isError && <span className="block mt-2 text-red-400 text-xs">System Error</span>}
                </div>
              </motion.div>
            ))}
            {isThinking && (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 mb-6">
                  <div className="w-8 h-8 rounded-full bg-aura-accent text-white flex items-center justify-center flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-lg p-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                  </div>
               </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-aura-dark">
            <form onSubmit={handleSend} className="relative flex items-center">
               <Terminal className="absolute left-4 text-gray-500" size={18} />
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="询问 Aura 关于设计趋势..."
                className="w-full bg-aura-black text-white pl-12 pr-12 py-4 rounded-lg focus:outline-none focus:ring-1 focus:ring-aura-accent border border-white/5 transition-all"
                disabled={isThinking}
              />
              <button
                type="submit"
                disabled={!input.trim() || isThinking}
                className="absolute right-2 p-2 bg-aura-accent text-white rounded-md hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
            <div className="mt-2 flex justify-center gap-2">
                {['你的设计精神是什么？', '评价极简主义网站', '给我一个配色方案'].map((suggestion, i) => (
                    <button 
                        key={i}
                        onClick={() => { setInput(suggestion); }}
                        className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-aura-accent border border-white/5 px-2 py-1 rounded transition-colors"
                    >
                        {suggestion}
                    </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiMuse;