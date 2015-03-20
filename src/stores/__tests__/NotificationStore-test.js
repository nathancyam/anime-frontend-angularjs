jest.dontMock('../../constants/NotificationConstants');
jest.dontMock('../NotificationStore');
jest.dontMock('object-assign');

describe('NotificationStore', function () {
    var NotificationConstants = require('../../constants/NotificationConstants');
    var AppDispatcher;
    var NotificationStore;
    var NotificationResource;
    var callback;

    var actionRemoveNotification = {
        actionType: NotificationConstants.NOTIFICATION_REMOVE,
        _id: "aaa"
    };
    var actionRemoveAll = {
        actionType: NotificationConstants.NOTIFICATION_CLEAR_ALL
    };
    var Fixtures = {
        "aaa" : {
            _id: "aaa",
            title: "A title",
            body: "Episode Downloaded"
        },
        "bbb": {
            _id: "bbb",
            title: "A title",
            body: "Episode Downloaded"
        },
        "ccc": {
            _id: "ccc",
            title: "A title",
            body: "Episode Downloaded"
        }
    };

    beforeEach(function () {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        NotificationStore = require('../NotificationStore');
        NotificationResource = require('../../resources/Notification');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function () {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should initially return an empty object', function () {
        var mockFn = jest.genMockFn();
        var all = NotificationStore.getAll(mockFn);
        expect(all).toEqual({});
    });

    it('should make a call to get the notifications from the server', function () {
        var mockFn = jest.genMockFn();
        NotificationStore.getAll(mockFn);
        expect(NotificationResource.getAll.mock.calls.length).toBe(1);
    });

    it('should get the notifications as part of the resource callback', function () {
        NotificationStore.getAll();
        NotificationResource.getAll.mock.calls[0][0](null, Fixtures);
        var all = NotificationStore.getAll();

        expect(NotificationResource.getAll.mock.calls.length).toBe(1);
        expect(Object.keys(all).length).toBe(3);
    });

    describe('Removing notifications', function () {
        beforeEach(function () {
            NotificationStore.getAll();
            NotificationResource.getAll.mock.calls[0][0](null, Fixtures);
        });

        it('should remove all the notifications', function () {
            expect(Object.keys(NotificationStore.getAll()).length).toBe(3);
            callback(actionRemoveAll);
            var all = NotificationStore.getAll();
            expect(Object.keys(all).length).toBe(0);
            expect(NotificationResource.removeAll.mock.calls.length).toBe(1);
        });

        it('should remove a notification', function () {
            expect(Object.keys(NotificationStore.getAll()).length).toBe(3);
            callback(actionRemoveNotification);
            var all = NotificationStore.getAll();
            expect(Object.keys(all).length).toBe(2);
            expect(NotificationResource.remove.mock.calls.length).toBe(1);
            expect(NotificationResource.remove.mock.calls[0][0]).toEqual("aaa");
        });
    });
});
