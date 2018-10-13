window.AudioContext = window.AudioContext || window.webkitAudioContext;
window.navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

  var d = document.getElementById('d');
  for(var i=0; i<256; i++) {
    d.innerHTML += '<div></div>';
  }
  var dd = document.querySelectorAll('#d div');

  var s = document.getElementById('s');
  var p = document.getElementById('p');
  var timer;
  var context = new AudioContext();
  navigator.getUserMedia({audio: true}, function(stream) {
    var microphone = context.createMediaStreamSource(stream);
    var analyser = context.createAnalyser();
    microphone.connect(analyser);
    //analyser.connect(context.destination);

    analyser.fftSize = 2048;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(analyser.fftSize);
    analyser.getByteFrequencyData(dataArray);

    s.onclick = function(){
      clearTimeout(timer);
    };

    p.onclick = function(){
      if(!timer) {
        update();
      }
    };

    function update(){
      console.log(dataArray);
      analyser.getByteFrequencyData(dataArray);
      for(var j=0; j<256; j++){
        dd[j].style.height = dataArray[j]+'px';
        dd[j].style.background = 'rgba('+(255-j)+','+j*2+',0,1)';
      }
      timer = setTimeout(update,0);
    }

  }, function(){
    console.log('error');
  });