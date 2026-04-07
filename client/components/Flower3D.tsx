import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import * as THREE from "three";

interface Petal {
  label: string;
  arabicLabel: string;
  angle: number;
  color: string;
}

const petals: Petal[] = [
  {
    label: "الوضعية",
    arabicLabel: "الوضعية المشكلة",
    angle: -Math.PI / 2, // Top
    color: "#00C8FF",
  },
  {
    label: "التحليل",
    arabicLabel: "التحليل والنصوص",
    angle: 0, // Right
    color: "#00E5FF",
  },
  {
    label: "المفاهيم",
    arabicLabel: "المفاهيم",
    angle: Math.PI / 2, // Bottom
    color: "#00D4FF",
  },
  {
    label: "القيم",
    arabicLabel: "القيم والإسقاط",
    angle: Math.PI, // Left
    color: "#00BFFF",
  },
];

interface PetalMeshProps {
  petal: Petal;
  index: number;
  hoveredIndex: number | null;
}

const PetalMesh = ({ petal, index, hoveredIndex }: PetalMeshProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const isHovered = hoveredIndex === index;

  useFrame(() => {
    if (!meshRef.current) return;
    const targetScale = isHovered ? 1.15 : 1;
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 0.1);
  });

  const distance = 1.8;
  const x = Math.cos(petal.angle) * distance;
  const y = Math.sin(petal.angle) * distance;

  // Create petal shape using scaled sphere
  return (
    <group position={[x, y, 0]}>
      {/* Main petal - using scaled sphere */}
      <mesh ref={meshRef} position={[0, 0, 0.1]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial
          color={petal.color}
          emissive={petal.color}
          emissiveIntensity={0.6}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Outer glow */}
      <mesh position={[0, 0, 0.05]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial
          color={petal.color}
          transparent
          opacity={0.2}
        />
      </mesh>

      {/* Larger glow ring */}
      <mesh position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.6, 12, 12]} />
        <meshBasicMaterial
          color={petal.color}
          transparent
          opacity={0.1}
        />
      </mesh>
    </group>
  );
};

interface FlowerSceneProps {
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}

const FlowerScene = ({ hoveredIndex, setHoveredIndex }: FlowerSceneProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Continuous rotation
    groupRef.current.rotation.z = (state.clock.elapsedTime / 5) * Math.PI * 2;
  });

  return (
    <group ref={groupRef}>
      {/* Core circle with glow */}
      <mesh position={[0, 0, 0.15]}>
        <icosahedronGeometry args={[0.3, 3]} />
        <meshStandardMaterial
          color="#00C8FF"
          emissive="#00C8FF"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Core glow halo */}
      <mesh position={[0, 0, 0.1]}>
        <icosahedronGeometry args={[0.45, 2]} />
        <meshBasicMaterial
          color="#00C8FF"
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Larger glow ring */}
      <mesh position={[0, 0, 0.05]}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshBasicMaterial
          color="#0099CC"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Render petals */}
      {petals.map((petal, index) => (
        <PetalMesh
          key={petal.label}
          petal={petal}
          index={index}
          hoveredIndex={hoveredIndex}
        />
      ))}
    </group>
  );
};

interface Flower3DProps {
  onPetalClick: (petalIndex: number) => void;
}

export const Flower3D = ({ onPetalClick }: Flower3DProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const canvas = document.querySelector("canvas");
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      setMouse({ x, y });

      // Simple hover detection
      let hoveredIdx = -1;
      for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];
        const px = Math.cos(petal.angle) * 1.8 * 0.25;
        const py = Math.sin(petal.angle) * 1.8 * 0.25;
        const dist = Math.sqrt((x - px) ** 2 + (y - py) ** 2);
        if (dist < 0.3) {
          hoveredIdx = i;
          break;
        }
      }
      setHoveredIndex(hoveredIdx >= 0 ? hoveredIdx : null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        className="!w-full !h-full"
        gl={{ antialias: true, alpha: true }}
        onClick={(e) => {
          if (hoveredIndex !== null) {
            onPetalClick(hoveredIndex);
          }
        }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <pointLight position={[-10, -10, -10]} intensity={0.4} color="#0099CC" />

        <FlowerScene hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
      </Canvas>

      {/* Cursor hover state */}
      {hoveredIndex !== null && (
        <div className="absolute inset-0 cursor-pointer" />
      )}
    </div>
  );
};
