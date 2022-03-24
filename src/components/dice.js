import React, {useState, useEffect} from 'react'
import {useBox} from "@react-three/cannon";
import {Html, useGLTF} from "@react-three/drei";

export const Dice = (props) => {
    const [ref, api] = useBox(() => ({
        mass: 0.1,
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
    const [hovered, setHover] = useState(false)
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
        <group ref={ref} key={props.key} onClick={() => {
            setHover(false);
            api.position.set(...props.position);
            api.angularVelocity.set(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20);
            api.velocity.set(
                (Math.random() - 0.5) * 30,
                (Math.random() - 0.5) * 2,
                Math.random() * -50)
        }}
               onPointerOver={() => setHover(true)}
               onPointerOut={() => setHover(false)}>
        >
            <mesh castShadow={true} scale={0.5} geometry={nodes.Cube002.geometry}>
                <meshStandardMaterial color='black'/>
            </mesh>
            <mesh castShadow={true} scale={0.5} geometry={nodes.Cube002_1.geometry}>
                <meshStandardMaterial color={hovered?'#ffff55':'white'}/>
            </mesh>
            {/*<Html>*/}
            {/*    <div style={{background: '#00000088', color: 'white', fontWeight: 700}}>*/}
            {/*        <h2 style={{margin: 0}}>{counter()}</h2>*/}
            {/*        <p style={{display: 'none'}}>{`Rx:${*/}
            {/*            (r[0] * 180 / Math.PI).toFixed(0)*/}
            {/*        } Ry:${*/}
            {/*            (r[1] * 180 / Math.PI).toFixed(0)*/}
            {/*        } Rz:${*/}
            {/*            (r[2] * 180 / Math.PI).toFixed(0)*/}
            {/*        }*/}
            {/*         sx:${Math.sin(r[0]).toFixed(0)}\u00A0cx:${Math.cos(r[0]).toFixed(1)}*/}
            {/*         sy:${Math.sin(r[1]).toFixed(0)}\u00A0cy:${Math.cos(r[1]).toFixed(1)}*/}
            {/*         sz:${Math.sin(r[2]).toFixed(0)}\u00A0cz:${Math.cos(r[2]).toFixed(1)}`*/}
            {/*        }</p>*/}
            {/*    </div>*/}
            {/*</Html>*/}
        </group>
    )
};
useGLTF.preload('/dice.glb');
