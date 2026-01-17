import Navbar from './Components/Navbar'; 
import Footer from './Components/Footer'; 
import { Noise } from './Components/NoiseOverlay';
import ScrollToTop from './hooks/ScrollTop';
import AppRoutes from './routes'; 
import { FeaturesBento } from './Components/BentoGrid';// Humara naya routes file

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="bg-[#050505] selection:bg-blue-500 selection:text-white min-h-screen">
        <Noise />
        <Navbar />
        
        {/* Saare Pages Yahan Render Honge */}
   
          <AppRoutes />
   
<FeaturesBento/>
        <Footer />
      </div>
    </>
  );
}

export default App;