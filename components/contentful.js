var express = require('express');
var contentful = require('contentful');
var client = contentful.createClient({
  space:'8n3hay1km9ce',
  accessToken:'92f77e1e6acdc455bd7846bfa5a687de183054063ad64d22125586139d3b64d5'
})
exports.fetch = function(type){
  // gets nav
  return client.getEntry('9fXXQJVotyku4iCaeeMGI');
}
exports.fetchEntries = function(type){
  return client.getEntries({'content_type':type});
}
exports.fetchSingle = function(id, res){
  return client.getEntry(id);
}
