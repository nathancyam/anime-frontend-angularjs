jest.dontMock('../AnimeNewsNetwork');
jest.dontMock('lodash');

var $;
var AnnResource;

describe('AnimeNewsNetwork resource', function () {

    beforeEach(function () {
        $ = require('jquery');
        AnnResource = require('../AnimeNewsNetwork');
    });

    it('should call $.ajax with the correct parameters', function () {
        var dummyCallback = function () {};
        AnnResource.getSearch('Bakemonogatari', dummyCallback);

        expect($.ajax).toBeCalledWith({
            type: "GET",
            data: {},
            url: encodeURI('/ann/search?name=Bakemonogatari'),
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });
    });

    it('should add the results as the second paramter once the request finishes', function () {
        var callback = jest.genMockFunction();
        AnnResource.getSearch('Bakemonogatari', callback);

        $.ajax.mock.calls[0][0].success({ name: "Bakemonogatari", requireReset: false });

        expect(callback.mock.calls[0][0]).toBeNull();
        expect(callback.mock.calls[0][1]).toEqual({ name: "Bakemonogatari", requireReset: false });
    });

    it('should show an error as the first parameter if the request fails', function () {
        var callback = jest.genMockFunction();
        AnnResource.getSearch('Bakemonogatari', callback);

        $.ajax.mock.calls[0][0].error({ error: "Not Found" });

        expect(callback.mock.calls[0][0]).toEqual({ error: "Not Found" });
        expect(callback.mock.calls[0][1]).toBeUndefined();
    });
});