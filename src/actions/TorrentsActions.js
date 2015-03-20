"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TorrentConstants = require('../constants/TorrentsConstants');

var TorrentsActions = {
    download: function (torrent) {
        AppDispatcher.dispatch({
            actionType: TorrentConstants.TORRENTS_DOWNLOAD,
            torrent: torrent
        });
    }
};

module.exports = TorrentsActions;