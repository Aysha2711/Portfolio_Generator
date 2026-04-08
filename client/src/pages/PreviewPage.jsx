import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Mail, Link as LinkIcon, Code, Globe, ExternalLink, Briefcase, MapPin, UploadCloud, Edit3 } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.portfolio;
  const { user } = useContext(AuthContext);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!formData) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center text-white p-4">
        <h1 className="text-2xl font-bold mb-4">No data to preview</h1>
        <Link to="/create" className="text-indigo-400 hover:text-indigo-300">Go to Create Portfolio</Link>
      </div>
    );
  }

  const portfolio = formData;

  const handlePublish = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('http://localhost:3000/api/portfolio', portfolio, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      navigate(`/portfolio/${res.data.username}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong during publish');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 selection:bg-indigo-500/30">
      
      {/* PREVIEW BANNER AND ACTIONS */}
      <div className="sticky top-0 left-0 right-0 z-50 bg-indigo-600 border-b border-indigo-700 shadow-lg px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-white font-medium flex items-center">
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs mr-2 font-bold uppercase tracking-wider">Preview Mode</span>
          This is how your portfolio will look.
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/create', { state: { portfolio: formData } })} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2">
            <Edit3 className="w-4 h-4" /> Go Back & Edit
          </button>
          <button onClick={handlePublish} disabled={loading} className={`px-4 py-2 bg-white text-indigo-600 hover:bg-slate-100 text-sm font-bold rounded-lg transition-colors flex items-center gap-2 shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}>
             <UploadCloud className="w-4 h-4" />
             {loading ? 'Publishing...' : 'Publish Portfolio'}
          </button>
        </div>
      </div>
      
      {error && (
        <div className="max-w-4xl mx-auto mt-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl">
          {error}
        </div>
      )}

      {/* Header Section */}
      <header className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          {portfolio.profileImage ? (
            <img src={portfolio.profileImage} alt={portfolio.fullName} className="w-32 h-32 rounded-full object-cover border-4 border-slate-800 shadow-xl mx-auto mb-6" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex justify-center items-center text-4xl font-bold text-white shadow-xl mx-auto mb-6">
              {portfolio.fullName?.charAt(0) || '?'}
            </div>
          )}
          
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {portfolio.fullName || 'Your Name'}
          </h1>
          {portfolio.title && (
            <h2 className="text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-medium mb-6">
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
              <a href={`mailto:${portfolio.contact.email}`} onClick={e => e.preventDefault()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Mail className="w-4 h-4" /> Email
              </a>
            )}
            {portfolio.contact?.github && (
              <a href={portfolio.contact.github} onClick={e => e.preventDefault()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Code className="w-4 h-4" /> GitHub
              </a>
            )}
            {portfolio.contact?.linkedin && (
              <a href={portfolio.contact.linkedin} onClick={e => e.preventDefault()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <LinkIcon className="w-4 h-4" /> LinkedIn
              </a>
            )}
            {portfolio.contact?.website && (
              <a href={portfolio.contact.website} onClick={e => e.preventDefault()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
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
                <span key={index} className="px-5 py-2 rounded-full bg-slate-800 border border-slate-700 text-slate-300 shadow-sm transition-colors">
                  {skill || 'Skill'}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolio.projects?.length > 0 && portfolio.projects.filter(p => p.name).length > 0 && (
          <section>
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-purple-500 rounded-full"></span>
              Featured Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolio.projects.map((project, index) => (
                project.name && (
                  <div key={index} className="group p-6 rounded-2xl bg-white/5 border border-white/10 transition-all">
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
                  </div>
                )
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
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
              {portfolio.experience.map((exp, index) => (
                exp.company && (
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
                )
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};

export default PreviewPage;
