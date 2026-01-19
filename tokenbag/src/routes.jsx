import { Routes, Route } from 'react-router-dom';
import { Hero } from './Components/Hero';
import { Dashboard } from './pages/DashBoard';
import { Chatinterface } from './pages/Chatinterface'; // Naam match kiya
import { Auth } from './Components/Auth';
import { Protocol } from './pages/Protocol';
import { Docs } from './pages/Docs';

// Routes ke andar:

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/deploy" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Sahi dynamic route jisse NaN error nahi aayega */}
      <Route path="/chat/:bagId" element={<Chatinterface />} />
      <Route path="/protocol" element={<Protocol />} />
<Route path="/docs" element={<Docs />} />
      {/* Fallback route */}
      <Route path="/access" element={<div className="text-white p-10">Please use a valid Bag ID link.</div>} />
      <Route path="*" element={<div className="h-screen flex items-center justify-center text-white font-mono">404 | NODE_NOT_FOUND</div>} />
    </Routes>
  );
};

export default AppRoutes;