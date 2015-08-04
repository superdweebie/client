$.player = function(id){

  if (!$.player._instance){

    if (!Audio) return;

    var player = new Audio();

    var ogg = player.canPlayType('audio/ogg');
    var mp3 = player.canPlayType('audio/mpeg');
    var extension;

    if (mp3 === 'probably') extension = 'mp3'
    else if (ogg === 'probably' || ogg === 'maybe') extension = 'ogg'
    else extension = 'mp3'

    player.src = id + '/audio.' + extension;

    $.player._instance = player;
  }

  return $.player._instance;
};
