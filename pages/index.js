import { useEffect, useRef, useState } from "react";

import { extend } from "@react-three/fiber";

import {Canvas, useFrame, useThree} from "@react-three/fiber";
import styles from "@/styles/Home.module.css";

import OrbitControls from "@/components/orbit_controls";
import AudioPlane from "@/components/plane";
import { AudioAnalyzer } from "@/components/analyzer";
import Text from "@/components/text";

export default function Home() {
	const [analyzer, setAnalyzer] = useState(null)

	const audioElmRef = useRef(null);

	const play = () => {
		if(window !== undefined && !analyzer)
		{
			setAnalyzer(new AudioAnalyzer(audioElmRef.current));	
		}
	}

	return (
		<div className={styles.scene}>
			<Canvas
				shadows
				className={styles.canvas}
				camera={{
					position: [0,0,50]
				}}
			>
				<OrbitControls
					autoRotate={false}
					enableDamping={true}
					enableZoom={true}
					enablePan={true}
					dampingFactor={0.5}
					maxDistance={1000}
					minDistance={100}
				/>
				<Text 
					position={[-15,30,-10]}
					rotation={[Math.PI / 4,0,0]}
					text={"For Ellese"}
				/>
				{analyzer && 
				<AudioPlane
					_analyzer={analyzer}
					rotation={[(-Math.PI / 3), 0, 0]}
					position={[0,5,0]}
				/>}
			</Canvas>
			<div className={styles.player}>
				<audio 
					src={"/audio/fur_elise.mp3"}
					controls
					onPlay={() => { 
						play();
					}}
					ref={audioElmRef}
				/>				
			</div>
		</div>
	)
}
