
export class AudioAnalyzer {

	constructor(audioElement) {
		this.state = {
			ctx: null,
			analyzerNode: null,
			sourceNode: null,
		};
	
		this.state.ctx = new AudioContext();
		this.state.analyzerNode = this.state.ctx.createAnalyser();

		/* FIXED!
		*	InvalidStateError: Failed to execute 'createMediaElementSource' on 'AudioContext': HTMLMediaElement 
		*	already connected previously to a different MediaElementSourceNode.
		*/
		this.state.sourceNode = this.state.ctx.createMediaElementSource(audioElement);		
		this.state.sourceNode.connect(this.state.analyzerNode);
		this.state.analyzerNode.connect(this.state.ctx.destination);

		// this.state.analyzerNode.minDecibels = -60;
		// this.state.analyzerNode.smoothingTimeConstant = 0.8;
		this.state.analyzerNode.fftSize = 1024;
	}
  
	getFFT() {
		const data = new Uint8Array(this.state.analyzerNode.frequencyBinCount);
		this.state.analyzerNode.getByteFrequencyData(data);
		return data;
	}
}