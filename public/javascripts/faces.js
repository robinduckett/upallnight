var faces = [
  'neutral1', 'neutral2', 'neutral4', 'neutral7',
  'neutral12', 'neutral13', 'neutral15', 'neutral37',
  'poker', 'badpokerface', 'retard', 'almost',
  'almost2', 'thickpoker', 'richfu', 'thingswentokay',
  'yawn'
];

(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);

var replaceFaces = function(element) {
    var toReplace, replaceWith,offsetRight,offsetTop;
    var chat = $(element);
    for(face in faces) {    
        replaceWith = "<img class='face'>";
        toReplace = faces[face];
        chat.html(chat.html().replace(new RegExp(toReplace,"gi"), replaceWith)); 
    }
}
