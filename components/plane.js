
import { useFrame } from "@react-three/fiber"
import { useRef } from "react";

export default function AudioPlane(props) {
	
	let mat_ref = useRef()
	useFrame(({clock}) => {
		const fft = props._analyzer.getFFT();
		// console.log(fft);
	});

	return (
		<group>
			<mesh
				{...props}
				ref={mat_ref}
			>
				<planeGeometry args={[64,64,64,64]} />
				<meshNormalMaterial
					wireframe={true}
				/>
			</mesh>
		</group>
	)
}