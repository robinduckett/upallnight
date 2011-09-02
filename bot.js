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
  'girlohyeah', 'girlsmile', 'girlsoon', 'girlwhat',
  'girlmeh', 'girlewbte', 'girlchortle', 'girlconcentrate',
  'sadtroll', 'trolol', 'butreally', 'wtfsnarf',
  'trolldad', 'trollface', 'serious', 'chew',
  'wtfomg', 'fffffffuuuuuuuu', 'rage', 'yuno',
  'grrr', 'omgwtffff', 'fuckyea', 'fapfapfap',
  'ohgodwhat', 'crying', 'whatwhat', 'okay',
  'foreveralone', 'milk', 'whatcomputer', 'ohwhatthe',
  'ohgodno', 'mjwhat', 'cerealleft', 'cerealright',
  'cerealwhat', 'cerealcoffee', 'cerealwait', 'cerealchew',
  'cerealspit', 'cerealdad', 'dadrip', 'itspikachu'
];

var texts = [
    'What\'s up?'
];

var facesLength = faces.length;
var textsLength = texts.length;
var randomFace;
var randomText;

setInterval(function() {
    randomFace = Math.floor(Math.random()* facesLength);
    $('#msg').val('(' + faces[randomFace] + ')');
    send_message();
},50000);

setInterval(function() {
    randomText = Math.floor(Math.random()* textsLength);
    $('#msg').val(texts[randomText]);
    send_message();
},400000);
