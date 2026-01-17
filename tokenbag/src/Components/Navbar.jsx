import { motion } from 'framer-motion';
import { Shield, LayoutDashboard, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl"
    >
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 font-black text-xl tracking-tighter italic">
          <Shield className="text-blue-500" fill="currentColor" size={24} />
          TOKENBAG
        </Link>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/features" className="hover:text-white transition-colors">Protocol</Link>
          <Link to="/docs" className="hover:text-white transition-colors">Docs</Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link to="/dashboard" className="text-gray-400 hover:text-white">
            <LayoutDashboard size={20} />
          </Link>
          <a href="/auth" className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform flex items-center gap-2">
            Login <LogIn size={16} />

          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;