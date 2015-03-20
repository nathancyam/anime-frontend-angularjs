var $ = require('jquery');

/**
 * @param animeName
 * @param callback
 * @returns {*}
 */
exports.getTorrent = function (animeName, callback) {
    if ($.isPlainObject(animeName)) {
        return callback(new Error('You must use a string'));
    }
    return $.ajax({
        type: "GET",
        url: encodeURI('/nyaatorrents/search?name=' + animeName),
        success: function (response) {
            return callback(null, response);
        },
        error: function (error) {
            return callback(error);
        }
    });
};

/**
 * @param href
 * @param callback
 * @returns {*}
 */
exports.addTorrent = function (href, callback) {
    return $.ajax({
        type: "POST",
        url: encodeURI('/torrent/add'),
        data: { torrentUrl: href },
        success: function (response) {
            return callback(null, response);
        },
        error: function (error) {
            return callback(error);
        }
    });
};
