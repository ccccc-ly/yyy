import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SectionId } from '../types';

const Hero: React.FC = () => {
  return (
    <section id={SectionId.HERO} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-aura-accent font-display tracking-[0.2em] uppercase text-sm mb-4">
            数字工匠 & 创意开发者
          </h2>
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-tight mb-8">
            设计 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              超乎想象
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-10">
            我将极致美学与智能科技融合，打造如魔法般的数字体验。
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <button 
            onClick={() => document.getElementById(SectionId.PORTFOLIO)?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white text-aura-black font-bold text-sm uppercase tracking-widest hover:bg-aura-accent hover:text-white transition-colors duration-300"
          >
            浏览精选作品
          </button>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown size={24} />
      </motion.div>
    </section>
  );
};

export default Hero;