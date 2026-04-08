import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Edit, Trash2, ExternalLink } from 'lucide-react';

const DashboardPage = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchPortfolios = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/portfolio/user', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setPortfolios(res.data);
      } catch (err) {
        console.error("Failed to fetch portfolios", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolios();
  }, [user, navigate]);

  const handleDelete = async (username) => {
    if (window.confirm("Are you sure you want to delete this portfolio? This cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:3000/api/portfolio/${username}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setPortfolios(portfolios.filter(p => p.username !== username));
      } catch (err) {
        console.error("Failed to delete portfolio", err);
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-white bg-slate-900">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background blurs */}
      <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[100px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto z-10 relative">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
            <p className="text-slate-400 mt-1">Manage your active portfolios</p>
          </div>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-3 rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/30"
          >
            <Plus className="w-5 h-5" />
            Create Portfolio
          </Link>
        </div>

        {portfolios.length === 0 ? (
          <div className="text-center py-20 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-medium text-white mb-2">No portfolios yet</h3>
            <p className="text-slate-400 mb-6">Create your first portfolio to share your work with the world.</p>
            <Link
              to="/create"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-3 rounded-xl text-sm font-medium transition-all border border-white/5"
            >
              Get Started
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((portfolio) => (
              <div key={portfolio._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors backdrop-blur-sm flex flex-col">
                <div className="grow">
                  <h3 className="text-xl font-bold text-white mb-1 truncate">{portfolio.fullName}</h3>
                  <p className="text-indigo-400 text-sm mb-4 truncate">/{portfolio.username}</p>
                  {portfolio.title && <p className="text-slate-300 text-sm mb-4 line-clamp-2">{portfolio.title}</p>}
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                  <Link
                    to={`/portfolio/${portfolio.username}`}
                    target="_blank"
                    className="flex-1 flex justify-center items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </Link>
                  <Link
                    to={`/edit/${portfolio.username}`}
                    className="flex-1 flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(portfolio.username)}
                    className="flex justify-center items-center gap-2 bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
