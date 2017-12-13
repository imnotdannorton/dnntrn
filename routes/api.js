var express = require('express');
var contentful = require('../components/contentful');
var insta = require('../components/instagram');
var spotify = require('../components/spotify');
var express = require('express');
var router = express.Router();

// router.all('*', function (req, res) {
//     var fetchNav = contentful.fetch();
//     fetchNav.then(function(navData){
//     	console.log(navData);
//       res.JSON(navData.items);
//     });
//   });

router.get('/nav', function(req, res){
	console.log("fetching nav", contentful);
	var fetchNav = contentful.fetch();
  fetchNav.then(res.json.bind(res));
});

router.get('/insta', function(req, res){
	insta.fetchUser('11896865');
});
router.get('/listening', function(req, res){
  spotify.fetchLatest(req, res);
});
router.get('/top-tracks', function(req, res){
  spotify.fetchTopTracks(req, res);
});
router.get('/top-artists', function(req, res){
  spotify.fetchTopArtists(req, res);
});
router.get('/entries/:type', function(req, res){
	var entries = contentful.fetchEntries(req.params.type);
	entries.then(res.json.bind(res));
});
router.get('/projects/:id', function(req, res){
    // res.render('project', contentful.fetchSingle(req.params.id, res));
    var fetch = contentful.fetchSingle(req.params.id);
    // var fetchNav = contentful.fetch();
    fetch.then(function(entry){
      page.content = entry.fields
      console.log(page);
      // res.render('project', page);
      }
    );
  });
module.exports = router;
