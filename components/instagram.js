var ig = require('instagram-node').instagram({});
var constants = require('../config/globals');
// ig.use({client_id:constants.instagram.client_id, client_secret:constants.instagram.client_secret});
ig.use({access_token:constants.instagram.access_token});
exports.fetchUser = function(userId){
	// ig.user(userId, function(err, result, remaining, limit){
	// 	console.log("ig: ", err, result, remaining, limit);
	// });
	ig.user_media_recent(userId, 3, function(err, medias, pagination, remaining, limit){
		console.log(medias[0], medias[0].images);
	});
}
exports.fetchLatest = function(userId, opts, cb){
	// console.log('getting ', userId);
	return ig.user_media_recent(userId, opts, cb)
}
