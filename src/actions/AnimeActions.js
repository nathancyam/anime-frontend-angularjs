"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var AnimeConstants = require('../constants/AnimeConstants');

var AnimeActions = {
    filter: function (filters) {
        AppDispatcher.dispatch({
            actionType: AnimeConstants.ANIME_FILTER,
            filters: filters
        });
    },

    reset: function () {
        AppDispatcher.dispatch({
            actionType: AnimeConstants.ANIME_RESET
        });
    },

    getAllInfo: function () {
        AppDispatcher.dispatch({
            actionType: AnimeConstants.ANIME_GET_ALL_INFO
        })
    }
};

module.exports = AnimeActions;
