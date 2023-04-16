import * as THREE from "three";

import { extend } from "@react-three/fiber";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { useFrame, useThree } from "@react-three/fiber";

import cedarville from "../public/font/Cedarville_Cursive_Regular.json";
import { useRef } from "react";

extend({TextGeometry});

export default function Text(props){
	const mat_ref = useRef();
	const font = new FontLoader().parse(cedarville);
	const { camera } = useThree();
	useFrame(() => {
		mat_ref.current.rotation.copy(camera.rotation);
		mat_ref.current.rotation.x = camera.rotation.x + props.rotation[0];
	})
	return (
		<mesh 
			{...props}
			ref={mat_ref}
		>
			<textGeometry 
				args={
					[
						(props.text ? props.text : 'text'),
						{
							font,
							size: (props.size ? props.size : 4),
							height: 1,
							curveSegments: 12,
							bevelEnabled: false,
							bevelThickness: 1,
						}
					]
				}/>
		</mesh>
	); 
} 