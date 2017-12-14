var Spotify = require('spotify-web-api-node');
var constants = require('../config/globals');
var spotifyClient = new Spotify({
	'clientId':constants.spotifyClientID,
	'clientSecret':constants.spotifyClientSecret
});
var spotifyObj = {};
// Retrieve an access token.
spotifyClient.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyClient.setAccessToken(data.body['access_token']);
  }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
  });

spotifyObj.fetchLatest = function(req, res){
	spotifyClient.getMyRecentlyPlayedTracks().then(function(data){
		console.log(data);
		res.json(data);
	}).catch(function(err){
		console.log(err);
		res.json(err);
	});
}
spotifyObj.fetchTopTracks = function(req, res){
	spotifyClient.request('https://api.spotify.com/v1/me/top/tracks').then(function(data){
		console.log(data);
		res.json(data);
	}).catch(function(err){
		console.log(err);
		res.json(err);
	});
}
spotifyObj.fetchTopArtists = function(req, res){
	spotifyClient.request('https://api.spotify.com/v1/me/top/artists').then(function(data){
		console.log(data);
		res.json(data);
	}).catch(function(err){
		console.log(err);
		res.json(err);
	});
}

module.exports = spotifyObj;