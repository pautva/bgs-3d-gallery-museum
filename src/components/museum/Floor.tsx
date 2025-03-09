import { MeshReflectorMaterial } from "@react-three/drei";
import React from "react";

interface FloorProps {
  width: number;
  length: number;
  position: [number, number, number];
}

const Floor: React.FC<FloorProps> = ({ width, length, position }) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, length]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        mirror={0.5}
        resolution={2048}
        mixBlur={1}
        mixStrength={80}
        roughness={1}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        metalness={0.4}
      />
    </mesh>
  );
};

export default Floor;
