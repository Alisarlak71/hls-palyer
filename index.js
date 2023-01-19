var player = videojs('videojs-shaka-player', {
  autoplay: true,
  techOrder: ['shaka', 'html5'], // shaka tech will handle HLS and DASH
  width: 800,
  height: 450,
  shaka: {
    debug: false,
    sideload: false,
    configuration: {
      // just an example of setting shaka player config options
      streaming: {
        bufferBehind: 40,
        bufferingGoal: 20
      }
    }
  }
});
player.qualityPickerPlugin();
player.src([{
  type: 'application/dash+xml',
  src: 'http://94.232.169.99/hls/123.m3u8'
  //src: 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd'
  //src: 'https://storage.googleapis.com/shaka-demo-assets/angel-one-hls/hls.m3u8'
  //src: 'https://storage.googleapis.com/shaka-demo-assets/bbb-dark-truths-hls/hls.m3u8'
}]);

var stream = document.getElementById('stream');
var play = document.getElementById('play');

play.addEventListener('click', function() {
  var type = 'application/dash+xml';
  if (stream.value.indexOf('m3u8') > -1) {
    type = 'application/x-mpegURL';
  } else if (stream.value.indexOf('mp4') > -1) {
    // this will resort back to the html5 tech
    type = 'video/mp4';
  }
  player.reset();
  player.qualityPickerPlugin();
  player.src([{
    type: type,
    src: stream.value
  }]);
});
