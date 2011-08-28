var adjectives = [
  'angry',
  'bewildered',
  'clumsy',
  'defeated',
  'embarrassed',
  'fierce',
  'grumpy',
  'helpless',
  'itchy',
  'jealous',
  'lazy',
  'mysterious',
  'nervous',
  'obnoxious',
  'panicky',
  'repulsive',
  'scary',
  'thoughtless',
  'uptight',
  'worried'
];

var nouns = [
  'actor',
  'airplane',
  'airport',
  'army',
  'baseball',
  'beef',
  'birthday',
  'boy',
  'brush',
  'bushes',
  'butter ',
  'cast',
  'cave',
  'cent',
  'cherries',
  'cherry',
  'cobweb',
  'coil',
  'cracker',
  'dinner',
  'eggnog',
  'elbow',
  'face',
  'fireman',
  'flavor',
  'gate',
  'glove',
  'glue',
  'goldfish',
  'goose',
  'grain',
  'hair',
  'haircut',
  'hobbies',
  'holiday',
  'hot',
  'jellyfish',
  'ladybug',
  'mailbox',
  'number',
  'oatmeal',
  'pail',
  'pancake',
  'pear',
  'pest',
  'popcorn',
  'queen',
  'quicksand',
  'quiet',
  'quilt',
  'rainstorm',
  'scarecrow',
  'scarf',
  'stream',
  'street',
  'sugar',
  'throne',
  'toothpaste',
  'twig',
  'volleyball',
  'wood',
  'wrench'
];

function ucfirst (str) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: ucfirst('kevin van zonneveld');
    // *     returns 1: 'Kevin van zonneveld'
    str += '';
    var f = str.charAt(0).toUpperCase();
    return f + str.substr(1);
}

module.exports = function() {
  var ad = parseInt(Math.random() * adjectives.length);
  var no = parseInt(Math.random() * nouns.length);
  
  return ucfirst(adjectives[ad]) + ucfirst(nouns[no]);
}
