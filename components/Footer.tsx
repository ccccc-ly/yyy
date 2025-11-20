import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-8 border-t border-white/5 text-center">
      <p className="text-gray-600 text-sm">
        © {new Date().getFullYear()} AURA. 基于 React & Tailwind 构建。
      </p>
    </footer>
  );
};

export default Footer;