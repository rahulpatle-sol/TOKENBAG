import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera, Stars } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const FloatingNode = ({ position, color, speed, distort }) => {
  const mesh = useRef();
  
  // Mouse movement follow karne ke liye subtle parallax
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.position.y = position[1] + Math.sin(t * speed) * 0.2;
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.z = t * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={mesh} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          speed={speed}
          distort={distort}
          radius={1}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </Sphere>
    </Float>
  );
};

export const Scene = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3b82f6" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#a855f7" />
        
        {/* Background Stars for Depth */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* 3 Main Nodes representing Fast, Share, Secure */}
        <FloatingNode position={[-4, 2, -2]} color="#3b82f6" speed={2} distort={0.4} /> {/* Blue */}
        <FloatingNode position={[4, -2, -3]} color="#22c55e" speed={1.5} distort={0.5} /> {/* Green */}
        <FloatingNode position={[0, -3, -1]} color="#a855f7" speed={2.5} distort={0.3} /> {/* Purple */}

        {/* Subtle Fog for Premium Look */}
        <color attach="background" args={['#020202']} />
        <fog attach="fog" args={['#020202', 5, 15]} />
      </Canvas>
    </div>
  );
};