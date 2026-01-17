import { Routes, Route } from 'react-router-dom';
import { Hero } from './Components/Hero';
import { Dashboard } from './pages/DashBoard';
import { Chat } from './pages/Chatinterface';
import { Auth } from './Components/Auth';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/deploy" element={<Dashboard />} /> {/* Token banane wala */}
<Route path="/access" element={<Chat />} />      {/* Kisi ka token use karne wala */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/chat/:bagId" element={<Chat />} />
      <Route path="*" element={<div className="h-screen flex items-center justify-center text-white">404 | NOT_FOUND</div>} />
    </Routes>
  );
};

export default AppRoutes;