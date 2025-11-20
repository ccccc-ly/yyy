import React from 'react';
import { Mail, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { SectionId } from '../types';

const Contact: React.FC = () => {
  return (
    <section id={SectionId.CONTACT} className="py-24 bg-aura-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        <div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-8">让我们创造 <br /> 非凡之作。</h2>
          <p className="text-gray-400 text-lg mb-12 leading-relaxed">
            我目前接受自由职业项目委托，也对全职机会持开放态度。
            如果你有需要落地的愿景，我随时倾听。
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-aura-accent">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">邮箱</p>
                <a href="mailto:hello@aura.design" className="text-xl hover:text-aura-accent transition-colors">hello@aura.design</a>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-aura-accent">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">工作室</p>
                <p className="text-xl">中国，上海</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-12">
            {[Github, Linkedin, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="bg-aura-dark p-8 md:p-12 rounded-2xl border border-white/5">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">姓名</label>
                <input type="text" className="w-full bg-aura-black border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-aura-accent transition-colors" placeholder="张三" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gray-500">邮箱</label>
                <input type="email" className="w-full bg-aura-black border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-aura-accent transition-colors" placeholder="zhangsan@example.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">主题</label>
              <select className="w-full bg-aura-black border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-aura-accent transition-colors appearance-none">
                <option>项目咨询</option>
                <option>商务合作</option>
                <option>演讲邀请</option>
                <option>其他</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest text-gray-500">留言</label>
              <textarea rows={4} className="w-full bg-aura-black border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-aura-accent transition-colors" placeholder="请描述您的项目需求..."></textarea>
            </div>

            <button className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-aura-accent hover:text-white transition-all duration-300 uppercase tracking-widest text-sm">
              发送信息
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;