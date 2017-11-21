var express = require('express');
var insta = require('../components/instagram');
var Vibrant = require('node-vibrant');
var router = express.Router();
var latestImg = insta.fetchLatest;
var style = "";
var image = "";
// get image for generating CSS
latestImg('11896865', [20], function(err, medias, pagination, remaining, limit){
  var index = Math.floor(Math.random()*20);
  var image = medias[index]['images']['standard_resolution']['url'];
  style += '.fs_img{ float:left; \n width:100%;\n height:100%;\n filter:blur(6px);\n display:block\n; position:absolute;\n z-index:-1;\n background:url('+image+');\nbackground-size:cover;}\n'
  console.log('get index', index);
  Vibrant.from(medias[index]['images']['standard_resolution']['url']).getPalette((err, palette) => buildCSS(err, palette));
});
function buildCSS(err, object){
  if(typeof object !== 'undefined'){
    loop(object);
  }
}
function loop(swatches){
  console.log(Object.keys(swatches));
  Object.keys(swatches).forEach(function(obj){
    console.log(obj, swatches[obj], swatches[obj]['rgb']);
    style += '.'+obj.toLowerCase()+'{\n';
    // text
    style += ' color: rgb('+parseInt(swatches[obj]['rgb'][0])+','+parseInt(swatches[obj]['rgb'][1])+','+parseInt(swatches[obj]['rgb'][2])+');\n'
    style += '}\n';
    style += '.'+obj.toLowerCase()+'_bg{\n';
    // semi-transparent bg
    style += ' background: rgba('+parseInt(swatches[obj]['rgb'][0])+','+parseInt(swatches[obj]['rgb'][1])+','+parseInt(swatches[obj]['rgb'][2])+', .8);\n'
    style += '}\n';
    style += '.'+obj.toLowerCase()+'_bg_solid{\n';
    // solid color
    style += ' background: rgb('+parseInt(swatches[obj]['rgb'][0])+','+parseInt(swatches[obj]['rgb'][1])+','+parseInt(swatches[obj]['rgb'][2])+');\n'
    style += '}\n';
    if(obj.toLowerCase() == 'vibrant'){
      style += 'a{\n';
      style += ' color:rgb('+parseInt(swatches[obj]['rgb'][0])+','+parseInt(swatches[obj]['rgb'][1])+','+parseInt(swatches[obj]['rgb'][2])+');\n';
      style += '}\n';
      style += 'a:hover{\n';
      style += ' background:rgb('+parseInt(swatches[obj]['rgb'][0])+','+parseInt(swatches[obj]['rgb'][1])+','+parseInt(swatches[obj]['rgb'][2])+');\n';
      style += ' color:#fff\n';
      style += '}\n';
    }
  });
}
router.get('/*', function(req, res, next) {
  res.render('index', { title: 'Dan Norton', css: style });
});

module.exports = router;
