import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  mousePosition: React.MutableRefObject<{ x: number; y: number }>;
}

function ParticleField({ count = 100, mousePosition }: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      velocities[i * 3] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }

    return { positions, velocities };
  }, [count]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry();
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    return geo;
  }, [particles.positions]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;

      // Update positions with velocity
      positions[idx] += particles.velocities[idx];
      positions[idx + 1] += particles.velocities[idx + 1];
      positions[idx + 2] += particles.velocities[idx + 2];

      // Add subtle sine wave motion
      positions[idx + 1] += Math.sin(time * 0.5 + i * 0.1) * 0.002;

      // Mouse repulsion
      const mouseX = mousePosition.current.x * 10;
      const mouseY = -mousePosition.current.y * 10;
      const dx = positions[idx] - mouseX;
      const dy = positions[idx + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 3) {
        const force = (3 - dist) / 3 * 0.02;
        positions[idx] += dx * force;
        positions[idx + 1] += dy * force;
      }

      // Boundary wrapping
      if (positions[idx] > 10) positions[idx] = -10;
      if (positions[idx] < -10) positions[idx] = 10;
      if (positions[idx + 1] > 10) positions[idx + 1] = -10;
      if (positions[idx + 1] < -10) positions[idx + 1] = 10;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connection lines
    if (linesRef.current) {
      const linePositions: number[] = [];
      const maxConnections = 3;
      const connectionDistance = 2.5;

      for (let i = 0; i < count; i++) {
        let connections = 0;
        for (let j = i + 1; j < count && connections < maxConnections; j++) {
          const dx = positions[i * 3] - positions[j * 3];
          const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
          const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < connectionDistance) {
            linePositions.push(
              positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
              positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
            );
            connections++;
          }
        }
      }

      lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    }
  });

  return (
    <>
      <points ref={meshRef} geometry={geometry}>
        <pointsMaterial
          size={0.08}
          color="#0070a0"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#0070a0" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
}

export default function ParticleBackground() {
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <ParticleField count={80} mousePosition={mousePosition} />
      </Canvas>
    </div>
  );
}
