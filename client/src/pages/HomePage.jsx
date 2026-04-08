import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Code, Layout, Rocket, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 flex flex-col justify-center items-center text-center px-4">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/20 blur-[120px]"></div>
      </div>

      <div className="z-10 max-w-4xl max-auto space-y-8">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          Own Your <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400">Developer Identity</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Generate an aesthetic, professional, and fully responsive developer portfolio in minutes. Stand out to recruiters and peers.
        </p>
        
        <div className="pt-8">
          <Link 
            to={user ? "/create" : "/login"} 
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-200 bg-indigo-600 font-pj rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30"
          >
            Create Portfolio
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="z-10 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-24">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-400">
            <Layout className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Beautiful Design</h3>
          <p className="text-slate-400">Modern layouts, glassmorphism, and dark mode tailored for developers.</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400">
            <Code className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Showcase Your Stack</h3>
          <p className="text-slate-400">Highlight your skills, projects, and tech stack in a structured format.</p>
        </div>
        
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center mb-4 text-pink-400">
            <Rocket className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Instantly Live</h3>
          <p className="text-slate-400">Get a unique, shareable public URL instantly upon publishing.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
