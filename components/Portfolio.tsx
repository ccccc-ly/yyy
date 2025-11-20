import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, SectionId } from '../types';
import { ArrowUpRight, Plus, Trash2, Settings, X, Upload, Image as ImageIcon } from 'lucide-react';

const DEFAULT_PROJECTS: Project[] = [
  { id: '1', title: 'Nebula 金融', category: 'UI/UX', year: '2023', imageUrl: 'https://picsum.photos/seed/nebula/800/600' },
  { id: '2', title: 'Kinetic 品牌', category: '品牌设计', year: '2024', imageUrl: 'https://picsum.photos/seed/kinetic/600/800' },
  { id: '3', title: 'Zenith 建筑', category: '艺术指导', year: '2023', imageUrl: 'https://picsum.photos/seed/zenith/800/800' },
  { id: '4', title: 'Flow 心流', category: 'UI/UX', year: '2024', imageUrl: 'https://picsum.photos/seed/flow/800/600' },
  { id: '5', title: 'Echo 系统', category: '品牌设计', year: '2022', imageUrl: 'https://picsum.photos/seed/echo/600/800' },
  { id: '6', title: 'Mono 杂志', category: '艺术指导', year: '2023', imageUrl: 'https://picsum.photos/seed/mono/800/600' },
];

const CATEGORIES = ['全部', 'UI/UX', '品牌设计', '艺术指导'];

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [filter, setFilter] = useState('全部');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isManaging, setIsManaging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [newProject, setNewProject] = useState<Partial<Project>>({
    title: '',
    category: 'UI/UX',
    year: new Date().getFullYear().toString(),
    imageUrl: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load from LocalStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('aura_portfolio_projects');
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse projects", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever projects change
  useEffect(() => {
    localStorage.setItem('aura_portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  const handleAddProject = () => {
    if (!newProject.title || !newProject.imageUrl) return;
    
    const project: Project = {
      id: Date.now().toString(),
      title: newProject.title,
      category: newProject.category as any,
      year: newProject.year || '2024',
      imageUrl: newProject.imageUrl
    };

    setProjects([project, ...projects]);
    setIsModalOpen(false);
    setNewProject({ title: '', category: 'UI/UX', year: new Date().getFullYear().toString(), imageUrl: '' });
  };

  const handleDeleteProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('确定要删除这个项目吗？')) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProject(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredProjects = filter === '全部' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id={SectionId.PORTFOLIO} className="py-24 bg-aura-black relative">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">精选作品</h2>
            <p className="text-gray-400 max-w-md">精选数字艺术收藏。 {isManaging ? <span className="text-aura-accent font-bold">管理模式已开启</span> : ''}</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-sm uppercase tracking-wider border border-white/10 transition-all ${
                  filter === cat 
                    ? 'bg-white text-black border-white' 
                    : 'text-gray-400 hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
            <button 
              onClick={() => setIsManaging(!isManaging)}
              className={`ml-4 p-2 rounded-full border transition-all ${isManaging ? 'bg-aura-accent border-aura-accent text-white' : 'border-white/10 text-gray-500 hover:text-white'}`}
              title="管理作品"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {/* Add New Card (Visible only in Manager Mode) */}
            {isManaging && (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setIsModalOpen(true)}
                className="aspect-[4/5] md:aspect-square border-2 border-dashed border-white/20 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-aura-accent hover:border-aura-accent hover:bg-white/5 cursor-pointer transition-all group"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus size={32} />
                </div>
                <span className="uppercase tracking-widest text-sm font-bold">添加项目</span>
              </motion.div>
            )}

            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project.id}
                className="group relative aspect-[4/5] md:aspect-square overflow-hidden bg-aura-gray cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                
                {/* Admin Delete Button */}
                {isManaging && (
                  <button 
                    onClick={(e) => handleDeleteProject(project.id, e)}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-red-500/90 text-white rounded-full flex items-center justify-center hover:bg-red-600 shadow-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                {/* Overlay */}
                <div className={`absolute inset-0 bg-black/60 flex flex-col justify-end p-8 transition-opacity duration-300 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-0 md:opacity-0'
                }`}>
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-aura-accent text-xs font-mono uppercase mb-2 block">{project.category} — {project.year}</span>
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-display font-bold">{project.title}</h3>
                        <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Reset Button (Bottom utility) */}
        {isManaging && (
            <div className="mt-12 text-center">
                <button 
                    onClick={() => {
                        if(window.confirm("重置为默认演示数据？所有更改都将丢失。")) {
                            setProjects(DEFAULT_PROJECTS);
                            localStorage.removeItem('aura_portfolio_projects');
                        }
                    }}
                    className="text-xs text-gray-600 hover:text-red-500 underline"
                >
                    重置为默认演示数据
                </button>
            </div>
        )}
      </div>

      {/* Add Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
              className="relative bg-aura-dark border border-white/10 w-full max-w-lg rounded-2xl p-8 shadow-2xl"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
              
              <h3 className="text-2xl font-display font-bold mb-6">添加新项目</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">项目标题</label>
                  <input 
                    type="text" 
                    value={newProject.title}
                    onChange={e => setNewProject({...newProject, title: e.target.value})}
                    className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-aura-accent outline-none"
                    placeholder="例如：赛博朋克 UI"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">类别</label>
                    <select 
                      value={newProject.category}
                      onChange={e => setNewProject({...newProject, category: e.target.value as any})}
                      className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-aura-accent outline-none appearance-none"
                    >
                      {CATEGORIES.filter(c => c !== '全部').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">年份</label>
                    <input 
                      type="text" 
                      value={newProject.year}
                      onChange={e => setNewProject({...newProject, year: e.target.value})}
                      className="w-full bg-black border border-white/10 rounded-lg p-3 text-white focus:border-aura-accent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">项目图片</label>
                  
                  <div className="flex gap-2 mb-2">
                    <button 
                       type="button"
                       className="text-xs px-3 py-1 rounded bg-white/10 hover:bg-white/20"
                       onClick={() => fileInputRef.current?.click()}
                    >
                        上传文件
                    </button>
                    <span className="text-xs text-gray-500 flex items-center">或在下方输入 URL</span>
                  </div>
                  
                  <input 
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-3 text-gray-500" size={18} />
                    <input 
                        type="text" 
                        value={newProject.imageUrl}
                        onChange={e => setNewProject({...newProject, imageUrl: e.target.value})}
                        className="w-full bg-black border border-white/10 rounded-lg p-3 pl-10 text-white focus:border-aura-accent outline-none"
                        placeholder="https://..."
                    />
                  </div>
                  {newProject.imageUrl && (
                    <div className="mt-4 relative aspect-video rounded-lg overflow-hidden border border-white/10">
                        <img src={newProject.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <button 
                  onClick={handleAddProject}
                  disabled={!newProject.title || !newProject.imageUrl}
                  className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-aura-accent hover:text-white transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  创建项目
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Portfolio;