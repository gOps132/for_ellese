
import { useFrame } from "@react-three/fiber"
import { useRef } from "react";

import * as THREE from "three";

import vertexShader from "./shaders/planeVertex.glsl";
import fragmentShader from "./shaders/planeFragment.glsl";

export default function AudioPlane(props) {
	const mat_ref = useRef();
	let initial_uniform = {
		u_time: {
			type: "f",
			value: 1.0,
		},
		u_amplitude: {
			type: "f",
			value: 3.0,
		}
	}
	// TODO: PASS U_TIME VALUE PROPERLY
	useFrame(({clock}) => {
		let t = clock.getElapsedTime();
		let fft = props._analyzer.getFFT();
		
		console.log(fft);

		mat_ref.current.uniforms = {
			u_time: {value: t},
			u_data_arr: {
				type: "float[64]",
				value: fft,
			},
		}
	});

	return (
		<group dispose={null}>
			<mesh
				ref={mat_ref}
				{...props}
			>
				<planeGeometry args={[64,64,64,64]} />
				{/* shader material */}
				<shaderMaterial
					vertexShader={vertexShader}
					fragmentShader={fragmentShader}
					uniforms={initial_uniform}
					wireframe={true}
					// blending={THREE.AdditiveBlending}
					// side={THREE.BackSide}
				/>
			</mesh>
		</group>
	)
}