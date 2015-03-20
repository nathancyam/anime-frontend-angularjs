"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var TorrentConstants = require('../constants/TorrentsConstants');
var TorrentResource = require('../resources/Torrents');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _torrents = {};

/**
 * @param id
 * @param updates
 */
var update = function (id, updates) {
    _torrents[id] = assign({}, _torrents[id], updates);
};

var TorrentsStore = assign({}, EventEmitter.prototype, {

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getSearchTorrent: function (searchText) {
        return _torrents[searchText] || [];
    },

    getAll: function (searchText) {
        if (this.getSearchTorrent(searchText).length === 0 &&
            typeof searchText === 'string') {

            TorrentResource.getTorrent(searchText, function (err, response) {
                if (err) {
                    throw new Error('Failed to get torrents from the server.');
                } else {
                    _torrents[searchText] = {};
                    // Assume response is an array and set the IDs
                    response.forEach(function (res) {
                        var id = 'nyaatorrents_' + res.id;
                        res.app_id = id;
                        _torrents[searchText][id] = res;
                    });
                    this.emitChange();
                }
            }.bind(this));
        }
        return this.getSearchTorrent(searchText);
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case TorrentConstants.TORRENTS_DOWNLOAD:
            var torrent = action.torrent;
            update(action.torrent.app_id, { status: "adding" });
            TorrentResource.addTorrent(torrent.href, function (err) {
                if (err) {
                    update(action.torrent.app_id, { status: "error" });
                } else {
                    update(action.torrent.app_id, { status: "added" });
                }
                TorrentsStore.emitChange();
            });
            TorrentsStore.emitChange();
            break;
        default:
            break;
    }
});

module.exports = TorrentsStore;