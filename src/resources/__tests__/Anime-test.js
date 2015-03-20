jest.dontMock('../Anime');

describe('Anime resource', function () {
    var AnimeResource;
    var $;
    var callback;

    beforeEach(function () {
        AnimeResource = require('../Anime');
        $ = require('jquery');
        callback = jest.genMockFn();
    });

    it('should call into $.ajax with the correct parameters', function () {
        AnimeResource.getAll(callback);

        expect($.ajax).toBeCalledWith({
            type: "GET",
            url: '/anime',
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });
    });

    it('should add the results as the second paramter once the request finishes', function () {
        AnimeResource.getAll(callback);
        $.ajax.mock.calls[0][0].success({ name: "Bakemonogatari" });

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toBeNull();
        expect(callback.mock.calls[0][1]).toEqual({ name: "Bakemonogatari" });
    });

    it('should show an error as the first parameter if the request fails', function () {
        AnimeResource.getAll(callback);

        $.ajax.mock.calls[0][0].error({ error: "Not Found" });

        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual({ error: "Not Found" });
        expect(callback.mock.calls[0][1]).toBeUndefined();
    });
});
