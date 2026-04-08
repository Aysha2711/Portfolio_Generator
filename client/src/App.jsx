import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreatePortfolioPage from './pages/CreatePortfolioPage';
import PreviewPage from './pages/PreviewPage';
import PublicPortfolioPage from './pages/PublicPortfolioPage';
import EditPortfolioPage from './pages/EditPortfolioPage';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname) && !location.pathname.startsWith('/portfolio/');

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white">
      {showNavbar && <Navbar />}
      <main className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<CreatePortfolioPage />} />
          <Route path="/preview" element={<PreviewPage />} />
          <Route path="/portfolio/:username" element={<PublicPortfolioPage />} />
          <Route path="/edit/:username" element={<EditPortfolioPage />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
