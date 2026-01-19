import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, LayoutDashboard, LogIn, Menu, X, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Protocol', path: '/protocol' },
    { name: 'Docs', path: '/docs' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 px-6 py-6 ${
          scrolled ? 'md:py-4' : 'md:py-8'
        }`}
      >
        <div className={`mx-auto max-w-7xl transition-all duration-500 ${
          scrolled 
          ? 'bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-8 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
          : 'bg-transparent px-2 py-0'
        } flex justify-between items-center relative overflow-hidden`}>
          
          {/* Subtle Ambient Glow inside Nav */}
          {scrolled && <div className="absolute inset-0 bg-blue-500/5 pointer-events-none" />}

          {/* LOGO SECTION */}
          <Link to="/" className="flex items-center gap-2 group z-10">
            <div className="relative">
              <Shield className="text-blue-500 group-hover:scale-110 transition-transform duration-500" fill="currentColor" size={24} />
              <div className="absolute inset-0 bg-blue-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
            </div>
            <span className="font-black text-xl tracking-tighter italic text-white">
              TOKEN<span className="text-blue-500">BAG</span>
            </span>
          </Link>
          
          {/* CENTER LINKS (Liquid Hover Effect) */}
          <div className="hidden md:flex items-center gap-2 bg-white/5 p-1 rounded-full border border-white/5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className={`relative px-6 py-2 text-[11px] font-mono uppercase tracking-[0.2em] transition-colors duration-300 ${
                  location.pathname === link.path || hoveredLink === link.name ? 'text-white' : 'text-gray-500'
                }`}
              >
                {/* Floating pill background */}
                {(hoveredLink === link.name || location.pathname === link.path) && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full z-[-1]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                {link.name}
              </Link>
            ))}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-3 z-10">
            <Link 
              to="/dashboard" 
              className="p-2.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-all duration-300"
            >
              <LayoutDashboard size={18} />
            </Link>

            <Link 
              to="/auth" 
              className="group relative bg-white text-black px-6 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest overflow-hidden transition-all active:scale-95 flex items-center gap-2"
            >
              <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
                Access_Vault <Zap size={14} fill="currentColor" />
              </span>
            </Link>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setMobileMenu(!mobileMenu)}
              className="md:hidden p-2 text-white bg-white/5 rounded-lg"
            >
              {mobileMenu ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden p-6"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    onClick={() => setMobileMenu(false)}
                    className="text-2xl font-black italic uppercase tracking-tighter text-gray-500 hover:text-blue-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;