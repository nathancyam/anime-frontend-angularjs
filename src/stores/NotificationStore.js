"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var NotificationConstants = require('../constants/NotificationConstants');
var Resource = require('../resources/Notification');
var assign = require('object-assign');

var _notifications = {};

var CHANGE_EVENT = 'change';

var _update = function (id, updateData) {
    _notifications[id] = assign({}, _notifications[id], updateData);
};

var _remove = function (id) {
    delete _notifications[id];
};

var NotificationStore = assign({}, EventEmitter.prototype, {
    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    startPolling: function () {
    },
    getAll: function () {
        if (Object.keys(_notifications).length === 0) {
            Resource.getAll(function (err, results) {
                if (err) {
                    console.log(err);
                    return;
                }
                _notifications = results;
                this.emitChange();
            }.bind(this));
        }
        return _notifications;
    },
    remove: function (id) {
        _remove(id);

        Resource.remove(id, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            if (result.status === 'SUCCESS') {
                console.log("Notification successfully dismissed");
            }
        }.bind(this));

        this.emitChange();
    },
    removeAll: function () {
        _notifications = {};
        Resource.removeAll(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            if (result.status === 'SUCCESS') {
                console.log("All notifications dismissed");
            }
            this.emitChange();
        }.bind(this))
    }
});

AppDispatcher.register(function (action) {
    switch (action.actionType) {
        case NotificationConstants.NOTIFICATION_REMOVE:
            NotificationStore.remove(action._id);
            break;
        case NotificationConstants.NOTIFICATION_CLEAR_ALL:
            NotificationStore.removeAll();
            break;
        default:
            break;
    }
});

module.exports = NotificationStore;

