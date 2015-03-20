var $ = require('jquery');

exports.getSearch = function (name, callback) {
    return $.ajax({
        type: "GET",
        url: encodeURI('/mal/search?name=' + name),
        success: function (data) {
            return callback(null, data);
        },
        error: function (err) {
            return callback(err);
        }
    });
};
