import React from 'react';
import {usePlane} from '@react-three/cannon';
import {LinearMipMapLinearFilter, NearestFilter, RepeatWrapping, TextureLoader} from 'three';

import grass from '../images/grass.jpg';

export const Ground = (props) => {
    const [ref] = usePlane(() => ({rotation: [-Math.PI / 2, 0, 0], ...props}));
    const texture = new TextureLoader().load(grass);

    texture.magFilter = NearestFilter;
    texture.minFilter = LinearMipMapLinearFilter;
    texture.wrapS = RepeatWrapping;
    texture.wrapT = RepeatWrapping;
    texture.repeat.set(100, 100);

    return (
        <mesh ref={ref} receiveShadow={true}>
            <planeBufferGeometry args={[100, 100]}/>
            <meshStandardMaterial map={texture}/>
        </mesh>
    );
};
