var faces = [
  'neutral1', 'neutral2', 'neutral4', 'neutral7',
  'neutral12', 'neutral13', 'neutral15', 'neutral37',
  'poker', 'badpokerface', 'retard', 'almost',
  'almost2', 'confused', 'smarm', 'french',
  'almost3', 'thickpoker', 'richfu', 'thingswentokay',
  'yawn'
];

var replaceFaces = function(element) {
    var toReplace, replaceWith,offsetRight,offsetTop;
    var chat = $(element);
    for(face in faces) {
        offsetTop = -Math.floor(face / 4) * 65;
        offsetRight = -(face % 4) * 65;
        replaceWith = "<img class='face' style='background-position:" + offsetRight + "px " + offsetTop + "px'>";
        toReplace = '[(]' + faces[face] + '[)]';
        chat.html(chat.html().replace(new RegExp(toReplace,"gi"), replaceWith)); 
    }
}

$(function() {
  for (var i = 0; i < faces.length; i++) {
    offsetTop = -Math.floor(i / 4) * 64;
    offsetRight = -(i % 4) * 64;
    
    var face = "<div class='face' style='zoom: 50%; float: left; background-position:" + offsetRight + "px " + offsetTop + "px'>";
    $('#faces').append(face);
  }
});
