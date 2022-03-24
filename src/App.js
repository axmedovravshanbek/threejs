import React, {Suspense, useEffect, useState} from 'react';
import {Canvas} from "@react-three/fiber"
import {Physics, useBox, usePlane} from '@react-three/cannon'
import {Sky, GizmoHelper, GizmoViewport, Html, OrbitControls, useGLTF, Stars} from '@react-three/drei'
import {Ground} from "./components/Ground";

const Plane = (props) => {
    const [ref] = usePlane(() => ({rotation: [-Math.PI / 2, 0, 0], ...props}));
    return (
        <mesh ref={ref} receiveShadow={true}>
            <planeGeometry args={[100, 100]}/>
            <meshStandardMaterial color={'orange'}/>
        </mesh>
    )
};

const Cube = (props) => {
    const [ref, api] = useBox(() => ({
        mass: 1,
        angularVelocity: [
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20],
        velocity: [
            (Math.random() - 0.5) * 30,
            (Math.random() - 0.5) * 2,
            Math.random() * -50],
        ...props
    }));
    const [r, setRotation] = useState([0, 0, 0]);
    useEffect(() => api.rotation.subscribe(v => setRotation(v)), []);
    const {nodes, materials} = useGLTF('/dice.glb');
    const counter = () => {
        const {abs} = Math;
        if ((abs(r[0]) < 0.1 && abs(r[2]) < 0.1) || (abs(r[0]) > 3 && abs(r[2]) > 3)) return 1;
        if ((abs(r[0]) < 0.1 && r[2] < -1.5 && r[2] > -1.67) || (abs(r[0]) > 3 && r[2] > 1.5 && r[2] < 1.67)) return 2;
        if ((abs(r[1]) < 0.1 && r[0] < -1.5 && r[0] > -1.67)) return 3;
        if ((abs(r[1]) < 0.1 && r[0] > 1.5 && r[0] < 1.67)) return 4;
        if ((abs(r[0]) > 3 && r[2] < -1.5 && r[2] > -1.67) || (abs(r[0]) < 0.1 && r[2] > 1.5 && r[2] < 1.67)) return 5;
        if ((abs(r[0]) < 0.1 && abs(r[2]) > 3) || (abs(r[0]) > 3 && abs(r[2]) < 0.1)) return 6;
    };
    return (
        <group ref={ref}>
            <mesh castShadow={true} scale={0.5} geometry={nodes.Cube002.geometry} material={materials['Material.001']}/>
            <mesh castShadow={true} scale={0.5} geometry={nodes.Cube002_1.geometry} material={materials.Material}/>
            <Html>
                <div style={{background: '#00000088', color: 'white', fontWeight: 700}}>
                    <h2 style={{margin: 20}}>{counter()}</h2>
                    <p style={{display: 'none'}}>{`Rx:${
                        (r[0] * 180 / Math.PI).toFixed(0)
                    } Ry:${
                        (r[1] * 180 / Math.PI).toFixed(0)
                    } Rz:${
                        (r[2] * 180 / Math.PI).toFixed(0)
                    }
                     sx:${Math.sin(r[0]).toFixed(0)}\u00A0cx:${Math.cos(r[0]).toFixed(1)}
                     sy:${Math.sin(r[1]).toFixed(0)}\u00A0cy:${Math.cos(r[1]).toFixed(1)}
                     sz:${Math.sin(r[2]).toFixed(0)}\u00A0cz:${Math.cos(r[2]).toFixed(1)}`
                    }</p>
                </div>
            </Html>
        </group>
    )
};

const Collisions = () => {
    const [ref1] = usePlane(() => ({position: [0, 0, -10], rotation: [0, 0, 0]}));
    const [ref2] = usePlane(() => ({position: [0, 0, 10], rotation: [0, -Math.PI, 0]}));
    const [ref3] = usePlane(() => ({position: [10, 0, 0], rotation: [0, -Math.PI / 2, 0]}));
    const [ref4] = usePlane(() => ({position: [-10, 0, 0], rotation: [0, Math.PI / 2, 0]}));

    return (
        <group>
            <mesh receiveShadow={true} castShadow={true} ref={ref1}>
                <boxGeometry args={[20, 4, 0.1]}/>
                <meshStandardMaterial color='#966F33'/>
            </mesh>
            <mesh receiveShadow={true} castShadow={true} ref={ref2}>
                <boxGeometry args={[20, 4, 0.1]}/>
                <meshStandardMaterial color='#966F33'/>
            </mesh>
            <mesh receiveShadow={true} castShadow={true} ref={ref3}>
                <boxGeometry args={[20, 4, 0.1]}/>
                <meshStandardMaterial color='#966F33'/>
            </mesh>
            <mesh receiveShadow={true} castShadow={true} ref={ref4}>
                <boxGeometry args={[20, 4, 0.1]}/>
                <meshStandardMaterial color='#966F33'/>
            </mesh>
        </group>
    )
};

export const App = () => {
    const x = (Math.random() - 0.5) * 3.14;
    return (
        <Canvas dpr={[1, 5]} shadows camera={{position: [0, 15, 12], fov: 50}}>
            <Suspense fallback={null}>
                <Physics gravity={[0, -9.81, 0]}>
                    <Collisions/>
                    <Ground/>
                    <Cube rotation={[0, x, -1.5]} position={[-2.8, 4, 8]}/>
                    <Cube rotation={[3.14, x, 1.5]} position={[-1.4, 4, 8]}/>
                    <Cube rotation={[3.14, 0, 3.14]} position={[0, 4, 8]}/>
                    <Cube rotation={[-1.5, 0, -1.5]} position={[1.4, 4, 8]}/>
                    <Cube rotation={[1.5, x, 0]} position={[2.8, 4, 8]}/>
                </Physics>
                <spotLight angle={1.25} penumbra={0.5} position={[5, 10, 4]} castShadow={true}/>
                <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
                    <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white"/>
                </GizmoHelper>
                <OrbitControls/>
                {/*<ambientLight/>*/}
            </Suspense>
        </Canvas>
    );
};
useGLTF.preload('/dice.glb');
