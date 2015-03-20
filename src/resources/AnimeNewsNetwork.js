"use strict";

var $ = require('jquery');
var _ = require('lodash');

exports.getSearch = function (name, data, callback) {

    let requestData = {};

    if (_.isFunction(data) && _.isUndefined(callback)) {
        callback = data;
    } else {
        requestData = _.assign(requestData, data);
    }

    return $.ajax({
        type: "GET",
        url: encodeURI('/ann/search?name=' + name),
        data: requestData,
        success: (data) => {
            return callback(null, data);
        },
        error: (err) => {
            return callback(err);
        }
    });
};
