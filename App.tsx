import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AiMuse from './components/AiMuse';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-aura-black text-white font-sans selection:bg-aura-accent selection:text-white">
      <Header />
      <main>
        <Hero />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      <AiMuse />
    </div>
  );
};

export default App;
