"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var NotificationConstants = require('../constants/NotificationConstants');

var NotificationActions = {
    remove: function (notification) {
        AppDispatcher.dispatch({
            actionType: NotificationConstants.NOTIFICATION_REMOVE,
            notification: notification
        });
    },
    clearAll: function () {
        AppDispatcher.dispatch({
            actionType: NotificationConstants.NOTIFICATION_CLEAR_ALL
        });
    }
};

module.exports = NotificationActions;
