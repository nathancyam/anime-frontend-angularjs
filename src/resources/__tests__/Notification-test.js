"use strict";

jest.dontMock('../Notification');

describe('Notification resource', function () {

    var $;
    var Resource;
    var callback;

    beforeEach(function () {
        $ = require('jquery');
        Resource = require('../Notification');
        callback = jest.genMockFn();
    });

    it('should make a GET request for the notifications', function () {
        Resource.getAll(callback);
        expect($.ajax).toBeCalled();
        expect($.ajax).toBeCalledWith({
            type: 'GET',
            url: '/notifications',
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });
    });

    it('should make a DELETE request for deleting a notification', function () {
        Resource.remove("aaa", callback);

        expect($.ajax).toBeCalled();
        expect($.ajax).toBeCalledWith({
            type: 'DELETE',
            url: '/notification/aaa',
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });
    });

    it('should make a DELETE request for deleting all notifications', function () {
        Resource.removeAll(callback);

        expect($.ajax).toBeCalled();
        expect($.ajax).toBeCalledWith({
            type: 'DELETE',
            url: '/notifications',
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });
    });
});