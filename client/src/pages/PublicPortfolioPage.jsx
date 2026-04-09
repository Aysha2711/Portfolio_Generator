import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Link as LinkIcon, Code, Globe, ExternalLink, Briefcase, MapPin, Edit3 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const PublicPortfolioPage = () => {
  const { username } = useParams();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/portfolio/${username}`);
        setPortfolio(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Portfolio not found');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center text-white p-4">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-slate-400 text-lg mb-8">{error || 'Portfolio not found'}</p>
        <Link to="/" className="text-indigo-400 hover:text-indigo-300">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-indigo-500/30">
      
      {/* Edit Button overlay */}
      <div className="fixed top-18 right-6 z-50">
        <Link to={`/edit/${portfolio.username}`} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white transition-all shadow-lg">
          <Edit3 className="w-4 h-4" />
        </Link>
      </div>

      {/* Header Section */}
      <header className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {portfolio.profileImage ? (
            <img src={portfolio.profileImage} alt={portfolio.fullName} className="w-42 h-42 rounded-full object-cover border-4 border-slate-800 shadow-xl mx-auto mb-6" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex justify-center items-center text-4xl font-bold text-white shadow-xl mx-auto mb-6">
              {portfolio.fullName.charAt(0)}
            </div>
          )}
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {portfolio.fullName}
          </h1>
          {portfolio.title && (
            <h2 className="text-xl sm:text-2xl text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-400 font-medium mb-6">
              {portfolio.title}
            </h2>
          )}
          {portfolio.bio && (
            <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-8">
              {portfolio.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex justify-center flex-wrap gap-4">
            {portfolio.contact?.email && (
              <a href={`mailto:${portfolio.contact.email}`} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4" /> Email
              </a>
            )}
            {portfolio.contact?.github && (
              <a href={portfolio.contact.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Code className="w-4 h-4" /> GitHub
              </a>
            )}
            {portfolio.contact?.linkedin && (
              <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <LinkIcon className="w-4 h-4" /> LinkedIn
              </a>
            )}
            {portfolio.contact?.website && (
              <a href={portfolio.contact.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Globe className="w-4 h-4" /> Website
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 space-y-24">
        
        {/* Skills Section */}
        {portfolio.skills?.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-indigo-500 rounded-full"></span>
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {portfolio.skills.map((skill, index) => (
                <span key={index} className="px-5 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 shadow-sm hover:border-indigo-500/50 hover:text-indigo-300 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects?.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-purple-500 rounded-full"></span>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, index) => (
                <div key={index} className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1">
                  <h4 className="text-xl font-bold text-white mb-2">{project.name}</h4>
                  <p className="text-slate-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech, i) => tech && (
                        <span key={i} className="text-xs px-2 py-1 bg-indigo-500/10 text-indigo-300 rounded-md">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-4 mt-auto">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noreferrer" className="text-sm flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
                        <Code className="w-4 h-4" /> Code
                      </a>
                    )}
                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noreferrer" className="text-sm flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors">
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolio.experience?.length > 0 && portfolio.experience.filter(e => e.company).length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-pink-500 rounded-full"></span>
              Experience
            </h3>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {portfolio.experience.map((exp, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-800 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white/5 border border-white/10 shadow hover:bg-white/10 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <h4 className="font-bold text-lg text-white">{exp.role}</h4>
                      <time className="text-sm font-medium text-indigo-400 mt-1 sm:mt-0">{exp.duration}</time>
                    </div>
                    <div className="text-slate-300 mb-3 flex items-center gap-2 font-medium">
                      <MapPin className="w-4 h-4 text-slate-500" /> {exp.company}
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default PublicPortfolioPage;
