import React, {Suspense} from 'react';

import {Canvas} from "@react-three/fiber"
import {Physics} from '@react-three/cannon'
import {GizmoHelper, GizmoViewport,Sky,  OrbitControls} from '@react-three/drei'

import {Ground} from "./components/Ground";
import {Collisions} from "./components/collisions";
import {Dice} from "./components/dice";

export const App = () => {
    const x = (Math.random() - 0.5) * 3.14;
    return (
        <Canvas dpr={[1, 5]} shadows camera={{position: [0, 12, 15], fov: 50}}>
            <Suspense fallback={null}>
                <Sky/>
                <Physics gravity={[0, -9.81, 0]}>
                    <Collisions/>
                    <Ground/>
                    <Dice rotation={[0, x, -1.5]} position={[-2.8, 4, 8]}/>
                    <Dice rotation={[3.14, x, 1.5]} position={[-1.4, 4, 8]}/>
                    <Dice rotation={[3.14, 0, 3.14]} position={[0, 4, 8]}/>
                    <Dice rotation={[-1.5, 0, -1.5]} position={[1.4, 4, 8]}/>
                    <Dice rotation={[1.5, x, 0]} position={[2.8, 4, 8]}/>
                </Physics>
                <spotLight color='#fffdd0' angle={1.25} penumbra={0.5} position={[5, 10, 4]} castShadow={true}/>
                {/*<GizmoHelper alignment="bottom-right" margin={[80, 80]}>*/}
                {/*    <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="white"/>*/}
                {/*</GizmoHelper>*/}
                {/*<OrbitControls/>*/}
                {/*<ambientLight/>*/}
            </Suspense>
        </Canvas>
    );
};
