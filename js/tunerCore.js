window.AudioContext = window.AudioContext || window.webkitAudioContext;

function Tuner() {
  this.context = new AudioContext();
  this.timer = null;
  this.analyser = null;
  this.dataArray = null;

  this.tunerReady = (update) => {
    const constraints = { audio: true };
    navigator.mediaDevices.getUserMedia(constraints).then((mediaStream) => {
      const microPhone = this.context.createMediaStreamSource(mediaStream);
      const analyser = this.context.createAnalyser();
      microPhone.connect(analyser);

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(analyser.fftSize);
      this.analyser = analyser;
      this.dataArray = dataArray;
      this.update = update;
      this.tunerUpdate();
    }).catch(this.tunerCatchError);
  }

  this.tunerUpdate = () => {
    const { analyser, dataArray, update } = this;
    const data = analyser.getByteFrequencyData(dataArray);
    // console.log(analyser.getByteTimeDomainData(dataArray))
    update && update({
      dataArray,
    });
    this.timer = setTimeout(this.tunerUpdate, 20);
  }

  this.tunerStop = () => {
    clearTimeout(this.timer);
  }

  this.tunerCatchError = (error) => {
    console.error(error);
  }
}

export default Tuner;