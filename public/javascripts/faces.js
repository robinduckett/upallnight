var faces = [
  'neutral1', 'neutral2', 'neutral4', 'neutral7',
  'neutral12', 'neutral13', 'neutral15', 'neutral37',
  'poker', 'badpokerface', 'retard', 'almost',
  'almost2', 'confused', 'smarm', 'french',
  'almost3', 'thickpoker', 'richfu', 'thingswentokay',
  'yawn', 'fuckthat', 'lol', 'chortle',
  'hmmm', 'itstime', 'soon', 'almost4',
  'wonder', 'girlyawn', 'girlhappy', 'girlpissed',
  'girllol', 'girlneutral', 'girlcross', 'girlwonder',
  'girlohyeah', 'girlsmile', 'girlsoon', 'girlwhat'
];

var replaceFaces = function(element) {
  var toReplace, replaceWith,offsetRight,offsetTop;
  var chat = $(element);
  
  for (face in faces) {
    offsetTop = -Math.floor(face / 4) * 65;
    offsetRight = -(face % 4) * 65;
    replaceWith = "<span class='face' style='background-position:" + offsetRight + "px " + offsetTop + "px'></span>";
    toReplace = '[(]' + faces[face] + '[)]';
    chat.html(chat.html().replace(new RegExp(toReplace,"gi"), replaceWith)); 
  }
}

$(function() {
  for (var i = 0; i < faces.length; i++) {
    offsetTop = -Math.floor(i / 4) * 32.5;
    offsetRight = -(i % 4) * 32.5;
    
    var face = "<div class='face2' data-face='"+i+"' style='float: left; background-position:" + offsetRight + "px " + offsetTop + "px'>";
    var face2 = $(face);
    
    face2.click(function() {
      $('#msg').val($('#msg').val() + '('+faces[$(this).attr('data-face')]+')');
    });
    $('#faces').append(face2);
  }
  $('#faces').css('width',faces.length * 32.5 + 'px');
});
