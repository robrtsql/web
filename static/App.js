var creds = require('creds')

var cheerio = require('cheerio');
var LastFmNode = require('lastfm').LastFmNode;
var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

/* wrap lastfm because the package does not follow
 * callback standards and therefore cannot be
 * promisified as-is */ 

var getArtistsWithHandlers = function(callback) {
    var lastfm = new LastFmNode({
        api_key: creds.api_key,
        secret: creds.secret,
    });
    lastfm.request("user.getTopArtists", {
        user: "flossoraptor",
        period: "7day",
        limit: 5,
        handlers: {
            success: function(data) {
                callback(null, data);
            },
            error: callback
        }
    });
};

var getArtists = Promise.promisify(getArtistsWithHandlers);

var createArtistRow = function($, i, artist) {
    var row = $('<tr></tr>');
    row.append($('<td></td>').text(i+1));

    var img = $('<img></img>')
        .data('src', 'holder.js/200x200')
        .attr('class', 'img-thumbnail')
        .attr('alt', 'Picture of ' + artist['name'] + ' from last.fm')
        .attr('src', artist['image'].find(function(image) { return image['size'] === 'medium' })['#text']);
    row.append($('<td></td>').append(img));

    row.append($('<td></td>').text(artist['name']));
    row.append($('<td></td>').text(artist['playcount']));
    return row;
};

var buildIndex = async (function () {
    var templateHtml = await (fs.readFileAsync('./index.html', 'utf-8'));
    var $ = cheerio.load(templateHtml);
    var topArtists = await (getArtists())['topartists']['artist'];
    var artistsTable = $('#weekly-top-artists tbody');
    artistsTable.empty();

    for (var i = 0; i < topArtists.length; i++) {
        artistsTable.append(createArtistRow($, i, topArtists[i]));
    }

    await (fs.writeFileAsync('./dist/index.html', $.html(), 'utf-8'));
});

buildIndex()
	.then (function () { })
	.catch(function (err) { console.log('Err! : ' + err); });
