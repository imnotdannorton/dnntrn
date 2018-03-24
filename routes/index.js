var express = require('express');
var insta = require('../components/instagram');

var Vibrant = require('node-vibrant');
var router = express.Router();
var latestImg = insta.fetchLatest;
var style = "";
var image = "";
var script = {}
var imageList = []
// get image for generating CSS
// latestImg('11896865', [20], function(err, medias, pagination, remaining, limit){
//   var index = Math.floor(Math.random()*20);
//   var image = medias[index]['images']['standard_resolution']['url'];
//   style += '.fs_img{ float:left; \n width:110%;\n height:110%;\n filter:blur(6px);\n display:block\n; position:fixed;\n background:url('+image+');\nbackground-size:cover;}\n'
//   console.log('get index', index);
//   Vibrant.from(medias[index]['images']['standard_resolution']['url']).getPalette((err, palette) => buildCSS(err, palette, image));
// });
function updateImage(){
  latestImg('11896865', [20], function(err, medias, pagination, remaining, limit){
    // console.log(medias);
    imageList = medias;
    var img = "";
    if(typeof medias !== 'undefined' && medias.length > 0){
      var index = Math.floor(Math.random()*(medias.length-1));
      img = medias[index]['images']['standard_resolution']['url'];
      console.log("got img", image);
    }else{
      console.log("use default");
      img = 'https://instagram.fbed1-2.fna.fbcdn.net/vp/ba735c054b561d3c88398d76bc58ddc2/5B3146D3/t51.2885-15/s750x750/sh0.08/e35/28765976_160462074659930_5283855250724225024_n.jpg';
    }
    style += '.fs_img{ float:left; \n width:110%;\n height:110%;\n filter:blur(6px);\n display:block\n; position:fixed;\n background:url('+img+');\nbackground-size:cover;}\n'
    // console.log('get index', index);
    Vibrant.from(img).getPalette((err, palette) => buildCSS(err, palette, img));
  }); 
}
function buildCSS(err, object, img){
  if(typeof object !== 'undefined'){
    loop(object);
    object.sourceImg = img;
    script = JSON.stringify(object);
    // console.log("script ", script);
  }
}
function loop(swatches){
  // console.log(Object.keys(swatches));
  Object.keys(swatches).forEach(function(obj){
    if(swatches[obj]){
      // console.log(obj, swatches[obj], swatches[obj]['_rgb']);
      style += '.'+obj.toLowerCase()+'{\n';
      // text
      style += ' color: rgb('+parseInt(swatches[obj]['_rgb'][0])+','+parseInt(swatches[obj]['_rgb'][1])+','+parseInt(swatches[obj]['_rgb'][2])+');\n'
      style += '}\n';
      style += '.'+obj.toLowerCase()+'_bg{\n';
      // semi-transparent bg
      style += ' background: rgba('+parseInt(swatches[obj]['_rgb'][0])+','+parseInt(swatches[obj]['_rgb'][1])+','+parseInt(swatches[obj]['_rgb'][2])+', .8);\n'
      style += '}\n';
      style += '.'+obj.toLowerCase()+'_bg_solid{\n';
      // solid color
      style += ' background: rgb('+parseInt(swatches[obj]['_rgb'][0])+','+parseInt(swatches[obj]['_rgb'][1])+','+parseInt(swatches[obj]['_rgb'][2])+');\n'
      style += '}\n';
      style += '.'+obj.toLowerCase()+'_bg_solid a{\n';
      // solid color
      style += ' color:#fff;\n';
      style += '}\n';
      // border
      style += '.'+obj.toLowerCase()+'_border{\n';
      style += ' border-color: rgb('+parseInt(swatches[obj]['_rgb'][0])+','+parseInt(swatches[obj]['_rgb'][1])+','+parseInt(swatches[obj]['_rgb'][2])+');\n'
      style += '}\n';
      if(obj.toLowerCase() == 'vibrant'){
        style += 'a{\n';
        style += ' color:rgb('+parseInt(swatches[obj]['_rgb'][0])+','+parseInt(swatches[obj]['_rgb'][1])+','+parseInt(swatches[obj]['_rgb'][2])+');\n';
        style += '}\n';
        style += 'a:hover{\n';
        style += ' background:rgb('+parseInt(swatches[obj]['_rgb'][0])+','+parseInt(swatches[obj]['_rgb'][1])+','+parseInt(swatches[obj]['_rgb'][2])+');\n';
        style += ' color:#fff\n';
        style += '}\n';
      }  
    }
    
  });
}
router.get('/*', function(req, res, next) {
  updateImage();
  console.log('script: ', script);
  res.render('index', { title: 'Dan Norton', css: style, script:script });
});

module.exports = router;
