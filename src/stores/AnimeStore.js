"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AnimeConstants = require('../constants/AnimeConstants');
var AnimeResource = require('../resources/Anime');
var assign = require('object-assign');

const CHANGE_EVENT = 'change';

var _anime = [];
var _filterAnime = [];
var _filters = {};

var AnimeStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getAll: function () {
        if (_anime.length === 0) {
            AnimeResource.getAll(function (err, response) {
                _anime = response;
                this.emitChange();
            }.bind(this));
        }

        if (Object.keys(_filters).length > 0) {
            return _filterAnime;
        } else {
            return _anime;
        }
    },

    reset: function (fetchFromServer) {
        fetchFromServer = fetchFromServer || true;

        _anime = [];
        if (fetchFromServer) {
            this.getAll();
        } else {
            this.emitChange();
        }
    },

    filter: function (filters) {
        _filters = filters;

        if (filters.reset) {
            _filters = {};
            _filterAnime = [];
        } else {

            let _canCompare = (compareKey, aObj, bObj) => {
                return (typeof aObj[compareKey] !== "undefined" &&
                        typeof bObj[compareKey] !== "undefined");
            };

            _filterAnime = _anime.filter((anime) => {
                var _filterFunc = [];

                if (_canCompare('title', filters, anime)) {
                    _filterFunc.push(() => {
                        return anime.title.toLowerCase().indexOf(filters.title.toLowerCase()) !== -1;
                    });
                }

                if (_canCompare('is_complete', filters, anime)) {
                    _filterFunc.push(() => {
                        return anime.is_complete === filters.is_complete;
                    });
                }

                if (_canCompare('is_watching', filters, anime)) {
                    _filterFunc.push(() => {
                        return anime.is_watching === filters.is_watching;
                    });
                }

                let passFilter = _filterFunc.filter((fn) => {
                    return fn();
                });

                return passFilter.length === _filterFunc.length && passFilter.length !== 0;
            });
        }

        return _filterAnime;
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case AnimeConstants.ANIME_UPDATE:
            AnimeStore.getAll();
            break;
        case AnimeConstants.ANIME_FILTER:
            AnimeStore.filter(action.filters);
            AnimeStore.emitChange();
            break;
        case AnimeConstants.ANIME_RESET:
            AnimeStore.reset();
            break;
        case AnimeConstants.ANIME_GET_ALL_INFO:
            AnimeResource.getAllInfo(function (err, result) {
                AnimeConstants.reset();
            });
            break;
        default:
            break;
    }
});

module.exports = AnimeStore;
