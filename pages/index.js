import React from "react";
import * as THREE from "three";

import { extend } from "@react-three/fiber";

import {Canvas, useFrame, useThree} from "@react-three/fiber";
import styles from "../styles/Home.module.css";

import OrbitControls from "../components/orbit_controls";

export default function Home() {
	let test, audioContext, audioElement, dataArray, analyser, source;
	let audio_id = "fur_elise";
	const setupAudioContext = () => {
		audioContext = new window.AudioContext();
		audioElement = document.getElementById(audio_id);
		source = audioContext.createMediaElementSource(audioElement);
		analyser = audioContext.createAnalyser();
		source.connect(analyser);
		analyser.connect(audioContext.destination);
		analyser.fftSize = 1024;
		dataArray = new Uint8Array(analyser.frequencyBinCount);
	};
	
	const play = async () => {
		if (audioContext === undefined) {
		  setupAudioContext();
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
				<group>
					<mesh
						// rotateZ={-Math.PI / 2 + Math.PI + 4}
					>
						<planeGeometry args={[64,64,64,64]} />
						<meshNormalMaterial
							wireframe={true}
						/>
					</mesh>
				</group>
			</Canvas>
			<div className={styles.player}>
				<audio
				id={audio_id}
				src="/audio/fur_elise.mp3"
				className="w-80"
				controls
				autoPlay
				onPlay={play}
				/>
			</div>
		</div>
	)
}
