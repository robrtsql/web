'use strict';

var LastFmNode = require('lastfm').LastFmNode;
var creds = require('creds')

const createResponse = (statusCode, body) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify(body),
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-ALlow-Methods': 'GET,PUT,POST,DELETE',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    }
};

exports.get = (event, context, callback) => {
    var lastfm = new LastFmNode({
      api_key: creds.api_key,
      secret: creds.secret,
    });
	var request = lastfm.request("user.getTopTracks", {
	  user: "flossoraptor",
      period: "7day",
	  handlers: {
		success: function(data) {
          callback(null, createResponse(200, data));
		},
		error: function(error) {
		  callback(null, createResponse(500, error));
		}
	  }
	});
};
