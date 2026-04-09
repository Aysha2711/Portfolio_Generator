import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Plus, Trash2, ArrowRight, Save, UserCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

const EditPortfolioPage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/portfolio/${username}`);
        const data = res.data;
        // Ensure arrays are not empty for the form
        if (!data.skills || data.skills.length === 0) data.skills = [''];
        if (!data.projects || data.projects.length === 0) data.projects = [{ name: '', description: '', techStack: [''], githubLink: '', liveDemo: '' }];
        if (!data.experience || data.experience.length === 0) data.experience = [{ company: '', role: '', duration: '', description: '' }];
        if (!data.contact) data.contact = { email: '', linkedin: '', github: '', website: '' };

        setFormData(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load portfolio.');
      } finally {
        setFetching(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  const handleBasicChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleContactChange = (e) => setFormData({ ...formData, contact: { ...formData.contact, [e.target.name]: e.target.value } });
  
  const handleSkillChange = (index, value) => {
    const newSkills = [...formData.skills];
    newSkills[index] = value;
    setFormData({ ...formData, skills: newSkills });
  };
  const addSkill = () => setFormData({ ...formData, skills: [...formData.skills, ''] });
  const removeSkill = (index) => setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== index) });

  const handleProjectChange = (index, field, value) => {
    const newProjects = [...formData.projects];
    newProjects[index][field] = value;
    setFormData({ ...formData, projects: newProjects });
  };
  const handleProjectTechChange = (projIndex, techValue) => {
    const newProjects = [...formData.projects];
    newProjects[projIndex].techStack = techValue.split(',');
    setFormData({ ...formData, projects: newProjects });
  };
  const addProject = () => setFormData({ ...formData, projects: [...formData.projects, { name: '', description: '', techStack: [''], githubLink: '', liveDemo: '' }] });
  const removeProject = (index) => setFormData({ ...formData, projects: formData.projects.filter((_, i) => i !== index) });

  const handleExperienceChange = (index, field, value) => {
    const newExp = [...formData.experience];
    newExp[index][field] = value;
    setFormData({ ...formData, experience: newExp });
  };
  const addExperience = () => setFormData({ ...formData, experience: [...formData.experience, { company: '', role: '', duration: '', description: '' }] });
  const removeExperience = (index) => setFormData({ ...formData, experience: formData.experience.filter((_, i) => i !== index) });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const cleanedData = {
        ...formData,
        skills: formData.skills.filter(s => s.trim() !== ''),
      };
      
      const res = await axios.put(`${API_URL}/api/portfolio/${username}`, cleanedData, {
        headers: {
          Authorization: `Bearer ${user?.token}`
        }
      });
      navigate(`/portfolio/${res.data.username}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
     return <div className="min-h-screen bg-slate-900 flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div></div>;
  }

  if (error && !formData) {
    return <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white"><p className="text-xl text-red-400">{error}</p></div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-200">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Edit Portfolio</h1>
            <p className="mt-2 text-slate-400">Update your details to keep your portfolio fresh.</p>
          </div>
          <UserCircle className="w-12 h-12 text-indigo-500" />
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl mb-8">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-12">
          
          {/* Section: Basic Info */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Username (Unique URL)</label>
                <input disabled name="username" value={formData.username} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-slate-500 cursor-not-allowed" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Full Name *</label>
                <input required name="fullName" value={formData.fullName} onChange={handleBasicChange} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Professional Title</label>
                <input name="title" value={formData.title} onChange={handleBasicChange} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Profile Image URL</label>
                <input name="profileImage" value={formData.profileImage} onChange={handleBasicChange} type="url" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-400 mb-2">Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleBasicChange} rows={3} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none resize-none" />
              </div>
            </div>
          </div>

          {/* Section: Contact */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Contact & Social</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                <input name="email" value={formData.contact.email} onChange={handleContactChange} type="email" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">LinkedIn URL</label>
                <input name="linkedin" value={formData.contact.linkedin} onChange={handleContactChange} type="url" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">GitHub URL</label>
                <input name="github" value={formData.contact.github} onChange={handleContactChange} type="url" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Personal Website</label>
                <input name="website" value={formData.contact.website} onChange={handleContactChange} type="url" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-indigo-500 outline-none" />
              </div>
            </div>
          </div>

          {/* Section: Skills */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-semibold text-white">Skills</h2>
              <button type="button" onClick={addSkill} className="text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium transition-colors">
                <Plus className="w-4 h-4 mr-1" /> Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-4">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <input 
                      value={skill} 
                      onChange={(e) => handleSkillChange(index, e.target.value)} 
                      type="text" 
                      className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-indigo-500 outline-none w-40" 
                    />
                    <button type="button" onClick={() => removeSkill(index)} className="ml-2 text-red-400 hover:text-red-300">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Projects */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-semibold text-white">Projects</h2>
              <button type="button" onClick={addProject} className="text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium transition-colors">
                <Plus className="w-4 h-4 mr-1" /> Add Project
              </button>
            </div>
            
            <div className="space-y-8">
              {formData.projects.map((project, index) => (
                <div key={index} className="p-5 rounded-xl border border-slate-700 bg-slate-800/50 relative">
                  <button type="button" onClick={() => removeProject(index)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Project Name</label>
                      <input value={project.name} onChange={(e) => handleProjectChange(index, 'name', e.target.value)} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Tech Stack</label>
                      <input value={project.techStack ? project.techStack.join(', ') : ''} onChange={(e) => handleProjectTechChange(index, e.target.value)} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                      <textarea value={project.description} onChange={(e) => handleProjectChange(index, 'description', e.target.value)} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm resize-none" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">GitHub Link</label>
                      <input value={project.githubLink} onChange={(e) => handleProjectChange(index, 'githubLink', e.target.value)} type="url" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Live Demo</label>
                      <input value={project.liveDemo} onChange={(e) => handleProjectChange(index, 'liveDemo', e.target.value)} type="url" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Experience */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="text-xl font-semibold text-white">Experience</h2>
              <button type="button" onClick={addExperience} className="text-indigo-400 hover:text-indigo-300 flex items-center text-sm font-medium transition-colors">
                <Plus className="w-4 h-4 mr-1" /> Add Experience
              </button>
            </div>
            
            <div className="space-y-8">
              {formData.experience.map((exp, index) => (
                <div key={index} className="p-5 rounded-xl border border-slate-700 bg-slate-800/50 relative">
                  <button type="button" onClick={() => removeExperience(index)} className="absolute top-4 right-4 text-slate-500 hover:text-red-400">
                    <Trash2 className="w-5 h-5" />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Company</label>
                      <input value={exp.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Role</label>
                      <input value={exp.role} onChange={(e) => handleExperienceChange(index, 'role', e.target.value)} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-400 mb-1">Duration</label>
                      <input value={exp.duration} onChange={(e) => handleExperienceChange(index, 'duration', e.target.value)} type="text" className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                      <textarea value={exp.description} onChange={(e) => handleExperienceChange(index, 'description', e.target.value)} rows={2} className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-sm resize-none" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <button 
              type="submit" 
              disabled={loading}
              className={`flex items-center px-8 py-4 font-bold text-white transition-all duration-200 rounded-xl ${loading ? 'bg-indigo-500/50 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/30'}`}
            >
              {loading ? 'Saving...' : 'Save Changes'}
              {!loading && <Save className="ml-2 w-5 h-5" />}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPortfolioPage;
