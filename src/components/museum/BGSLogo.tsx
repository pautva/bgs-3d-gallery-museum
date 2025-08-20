import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.MeshStandardMaterial;
  };
};

export function BGSLogo(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF("/models/BGS-logo.glb") as GLTFResult;
  
  return (
    <group {...props} dispose={null}>
      {Object.entries(nodes).map(([key, node]) => {
        if (node.geometry) {
          return (
            <mesh
              key={key}
              castShadow
              receiveShadow
              geometry={node.geometry}
              material={node.material || materials[Object.keys(materials)[0]]}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

useGLTF.preload("/models/BGS-logo.glb");