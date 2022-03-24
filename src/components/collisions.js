import {usePlane} from "@react-three/cannon";
import {LinearMipMapLinearFilter, NearestFilter, RepeatWrapping, TextureLoader} from "three";
import grass from "../images/wood.png";

export const Collisions = () => {
    usePlane(() => ({position: [0, 0, 10], rotation: [0, -Math.PI, 0]}));
    const [ref1] = usePlane(() => ({position: [0, 0, -10], rotation: [0, 0, 0]}));
    const [ref2] = usePlane(() => ({position: [10, 0, 0], rotation: [0, -Math.PI / 2, 0]}));
    const [ref3] = usePlane(() => ({position: [-10, 0, 0], rotation: [0, Math.PI / 2, 0]}));
    const walls = [ref1, ref2, ref3];

    const texture = new TextureLoader().load(grass);
    texture.magFilter = NearestFilter;
    texture.minFilter = LinearMipMapLinearFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(10, 5);
    return (
        <group>
            {walls.map((ref, i) => (
                <mesh
                    ref={ref}
                    receiveShadow={true}
                    castShadow={true}
                    key={i}
                >
                    <boxGeometry args={[20, 6, 0.1]}/>
                    <meshStandardMaterial map={texture}/>
                </mesh>
            ))}
        </group>
    )
};
