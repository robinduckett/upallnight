var faces = [
  'neutral1', 'neutral2', 'neutral4', 'neutral7',
  'neutral12', 'neutral13', 'neutral15', 'neutral37',
  'poker', 'badpokerface', 'retard', 'almost',
  'almost2', 'thickpoker', 'richfu', 'thingswentokay',
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
