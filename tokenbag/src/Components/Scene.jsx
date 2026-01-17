import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Box, PerspectiveCamera, Stars, MeshWobbleMaterial } from '@react-three/drei';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DataPacket = ({ position, color }) => {
  const packetRef = useRef();
  
  useFrame((state) => {
    packetRef.current.rotation.x += 0.02;
    packetRef.current.rotation.z += 0.01;
  });

  return (
    <Float speed={10} rotationIntensity={2} floatIntensity={5}>
      <Box ref={packetRef} position={position} args={[0.2, 0.2, 0.2]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={5} />
      </Box>
    </Float>
  );
};

const SecureBagModel = () => {
  const topCover = useRef();
  const bottomPart = useRef();
  const packetsGroup = useRef();

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "30% center",
        scrub: 1,
      }
    });

    // 1. Bag Khulna (Top part moves up, Bottom moves down)
    tl.to(topCover.current.position, { y: 2.5, duration: 1 }, 0)
      .to(bottomPart.current.position, { y: -1.5, duration: 1 }, 0)
      // 2. Packets ka bahar nikalna (Scaling and flying)
      .to(packetsGroup.current.scale, { x: 1, y: 1, z: 1, duration: 1 }, 0.5)
      .to(packetsGroup.current.position, { z: 2, duration: 1 }, 0.5);
  }, []);

  return (
    <group>
      {/* BAG TOP COVER */}
      <Box ref={topCover} args={[3, 0.5, 2]} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </Box>

      {/* BAG BOTTOM PART */}
      <Box ref={bottomPart} args={[3, 1.5, 2]} position={[0, -0.7, 0]}>
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.1} />
        {/* Glow inside the bag */}
        <pointLight position={[0, 0.5, 0]} color="#22c55e" intensity={5} distance={3} />
      </Box>

      {/* FLOATING DATA PACKETS (Inside the bag, hidden initially) */}
      <group ref={packetsGroup} scale={[0, 0, 0]}>
        <DataPacket position={[0.5, 1, 0.5]} color="#22c55e" />
        <DataPacket position={[-0.8, 1.5, -0.5]} color="#22c55e" />
        <DataPacket position={[1.2, 0.8, -0.2]} color="#a855f7" /> {/* Purple Packet */}
        <DataPacket position={[-0.5, 2, 0.8]} color="#ffffff" />
      </group>
    </group>
  );
};

export const Scene = () => {
  return (
    <div className="fixed inset-0 z-0 bg-[#020202]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
        <SecureBagModel />
      </Canvas>
    </div>
  );
};