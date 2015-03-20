var $ = require('jquery');

exports.getAll = function (callback) {
    return $.ajax({
        type: "GET",
        url: '/anime',
        success: function (response) {
            return callback(null, response);
        },
        error: function (error) {
            return callback(error);
        }
    });
};

exports.getAllInfo = function (callback) {
    return $.ajax({
        type: "GET",
        url: "/ann/search/all",
        success: function (response) {
            return callback(null, response);
        },
        error: function (error) {
            return callback(error);
        }
    });
};