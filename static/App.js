var creds = require('creds')

var fs = require('fs');
var cheerio = require('cheerio');
var LastFmNode = require('lastfm').LastFmNode;
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');

var buildIndex = async (function () {
    var templateHtml = fs.readFileSync('./index.html', 'utf-8');
    var $ = cheerio.load(templateHtml);
    var lastfm = new LastFmNode({
        api_key: creds.api_key,
        secret: creds.secret,
    });
    var request = lastfm.request("user.getTopTracks", {
        user: "flossoraptor",
        period: "7day",
        handlers: {
            success: function(data) {
                console.log(data);
            },
            error: function(error) {
                console.log(error);
            }
        }
    });
});

buildIndex()
	.then (function () { console.log('Done!'); })
	.catch(function (err) { console.log('Err! : ' + err); });
