var $ = require('jquery');

exports.getAll = function (callback) {
    return $.ajax({
        type: 'GET',
        url: '/notifications',
        success: function (data) {
            return callback(null, data);
        },
        error: function (err) {
            return callback(err);
        }
    });
};

exports.remove = function (id, callback) {
    return $.ajax({
        type: 'DELETE',
        url: '/notification/' + id,
        success: function (data) {
            return callback(null, data);
        },
        error: function (err) {
            return callback(err);
        }
    });
};

exports.removeAll = function (callback) {
    return $.ajax({
        type: 'DELETE',
        url: '/notifications',
        success: function (data) {
            return callback(null, data);
        },
        error: function (err) {
            return callback(err);
        }
    });
};