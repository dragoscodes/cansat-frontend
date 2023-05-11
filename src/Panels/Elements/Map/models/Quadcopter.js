import { MeshWobbleMaterial, useGLTF } from '@react-three/drei'

export default function Quadcopter(props) {
    const { nodes, materials } = useGLTF("./quadcopter.glb");
    return (
        <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.PlacaMotoare.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={materials["Material.005"]}
          position={[0.04, 11.18, 75.2]}
          scale={5.49}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials["Material.003"]}
          position={[-75.06, 11.17, 0.55]}
          scale={5.49}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={materials["Material.002"]}
          position={[75.1, 11.18, -0.25]}
          scale={5.49}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Material.004"]}
          position={[0.01, 11.17, -74.9]}
          scale={5.49}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cone.geometry}
          material={materials["Material.006"]}
          position={[30, 9.75, 30]}
          rotation={[-Math.PI / 2, 0, -2.36]}
          scale={[4.62, 42.34, 4.62]}
        />
      </group>
    );
}

useGLTF.preload("./quadcopter.glb");
