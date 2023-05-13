import React, { useEffect, useLayoutEffect, useState, useContext, useRef } from 'react';
import { DoubleSide } from "three";
import { Canvas, useFrame } from '@react-three/fiber'
import { PresentationControls, PivotControls, CameraControls, OrbitControls, PerspectiveCamera } from '@react-three/drei'
import Quadcopter from './models/Quadcopter'

function GroundPlane() {
    return (
      <>
        <mesh position={[0, -0.1, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[200, 200, 200]} castShadow receiveShadow>
          <planeBufferGeometry />
          <meshStandardMaterial color="#AAAAA" side={DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -200]} rotation={[Math.PI / 2, 0, 0]} scale={[5, 5, 5]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]}/>
            <meshStandardMaterial color="#BBBBBB" side={DoubleSide} />
        </mesh>
      </>
    );
  }

const ArrowScene = (props) => {

    const targetRef = useRef(null);
    const arrowRef = useRef(null);
    const arrowHelperRef = useRef(null);

    useFrame((state, delta) => {
        state.camera.lookAt(targetRef.current.position);
        state.camera.updateProjectionMatrix();

        let len = Math.sqrt(props.lookAt[0] * props.lookAt[0] + props.lookAt[1] * props.lookAt[1] + props.lookAt[2] * props.lookAt[2]);
        arrowHelperRef.current?.setLength(len, 0.1, 0.1);
        arrowRef.current?.lookAt(props.lookAt[0], props.lookAt[1], props.lookAt[2]);

        let dir = state.camera.position.clone().normalize().multiplyScalar(0.1);
        arrowRef.current?.position.set(dir.x, dir.y, dir.z);
    });

    return (
        <>
            <color attach="background" args={['#222222']} />
            <ambientLight intensity={0.1} />
            <directionalLight position={[-10, 20, 10]} />
            <group ref={targetRef}>
                <OrbitControls />
                <PerspectiveCamera
                    makeDefault
                    position={[2, 2, 4]}
                    args={[45, 4.0 / 3, 0.1, 1500]}
                />

                <group ref={arrowRef}>
                    <arrowHelper ref={arrowHelperRef} />
                </group>
            </group>
            <group dispose={null}>
                <group position={[-0.5, 0, -0.5]}>
                    <gridHelper args={[25, 25, 0xff0000, '#808080']} />
                    
                    <group position={[0, 0.5, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                        <gridHelper args={[25, 25, 0xff0000, '#1C7700']} />
                    </group>
                </group>
                <mesh>
                    <sphereBufferGeometry args={[1, 40, 40]} />
                    <meshStandardMaterial color={"#ffffff"} opacity={0.15} transparent />
                </mesh>
                
                <mesh position={[0, 0, 12.5]} scale={[1, 1, 1]} castShadow receiveShadow>
                    <boxGeometry args={[1, 1, 1]}/>
                    <meshStandardMaterial color="#FF0000" />
                </mesh>
            </group>
        </>
    )
}

export const ModelViewer = (props) => {

    const [rotation, setRotation] = useState([0, 0, 0]);

    useEffect(() => {
        if (props.data) {
            setRotation([props.data.navigation.roll, props.data.navigation.pitch, props.data.navigation.yaw]);
        }
    }, [props.data]);

    return (
        <Canvas shadows colorManagement dpr={[1, 2]} camera={{ fov: 25, position: [0, 0, 8] }}>
        <color attach="background" args={['#FFFFFF']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[-10, 20, 10]} />
        <PresentationControls snap global zoom={1} rotation={[Math.PI / 6, 0, 0]}>
            <group position-y={-160} position-z={-270} dispose={null} rotation={[0, 3 * Math.PI / 4, 0]}>
                <group rotation={rotation}>
                    <Quadcopter />
                </group>
            </group>
            <group position-y={-160} position-z={-270} dispose={null}>
                <gridHelper args={[400, 40, 0xff0000, 'gray']} />
                <GroundPlane />
            </group>
        </PresentationControls>
    </Canvas>
    )
}

export default ModelViewer;