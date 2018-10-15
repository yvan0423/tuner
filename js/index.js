import Tuner from './tunerCore';

var d = document.getElementById('d');
for(var i=0; i<256; i++) {
  d.innerHTML += '<div></div>';
}
var dd = document.querySelectorAll('#d div');
var stop = document.getElementById('stop');
var play = document.getElementById('play');

const tuner = new Tuner();

document.addEventListener('visibilitychange', () => {
  const { visibilityState } = document;
  if (visibilityState === 'visible') {
    tuner.tunerUpdate();
  }
  if(visibilityState === 'hidden') {
    tuner.tunerStop();
  }
});

tuner.tunerReady(({ dataArray }) => {
  for(var j=0; j<256; j++){
    dd[j].style.height = dataArray[j]+'px';
    dd[j].style.background = 'rgba('+(255-j)+','+j*2+',0,1)';
  }
});

// stop.onclick = tuner.tunerStop;

// play.onclick = tuner.tunerUpdate;