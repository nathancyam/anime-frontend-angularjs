jest.dontMock('../MyAnimeList');

describe('MyAnimeList resource', function () {

    var $;
    var MalResource;
    var callback;

    beforeEach(function () {
        $ = require('jquery');
        MalResource = require('../MyAnimeList');
        callback = jest.genMockFn();
    });

    it('should call into $.get with the correct parameters', function () {
        var dummyCallback = function () {};
        MalResource.getSearch('Bakemonogatari', dummyCallback);

        expect($.ajax).toBeCalledWith({
            type: "GET",
            url: encodeURI('/mal/search?name=Bakemonogatari'),
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });
    });

    it('should add the results as the second paramter once the request finishes', function () {
        MalResource.getSearch('Bakemonogatari', callback);

        $.ajax.mock.calls[0][0].success({ name: "Bakemonogatari" });

        expect(callback.mock.calls[0][0]).toBeNull();
        expect(callback.mock.calls[0][1]).toEqual({ name: "Bakemonogatari" });
    });

    it('should show an error as the first parameter if the request fails', function () {
        MalResource.getSearch('Bakemonogatari', callback);

        $.ajax.mock.calls[0][0].error({ error: "Not Found" });

        expect(callback.mock.calls[0][0]).toEqual({ error: "Not Found" });
        expect(callback.mock.calls[0][1]).toBeUndefined();
    });

});
