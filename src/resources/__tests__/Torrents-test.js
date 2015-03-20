jest.dontMock('../Torrents');

describe('Torrent Resource', function () {
    it('should make a AJAX request for Torrents for an anime', function () {
        var $ = require('jquery');
        var TorrentResource = require('../Torrents');

        var callback = jest.genMockFunction();
        TorrentResource.getTorrent('Bakemonogatari', callback);

        expect($.ajax).toBeCalledWith({
            type: "GET",
            url: encodeURI('/nyaatorrents/search?name=Bakemonogatari'),
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });
    });
    it('should call the callback with the results', function () {
        var $ = require('jquery');
        var TorrentResource = require('../Torrents');

        var callback = jest.genMockFunction();
        TorrentResource.getTorrent('Bakemonogatari', callback);

        var mockResponse = [{ torrent: 'test1.torrent' }, { torrent: 'test2.torrent' }];
        $.ajax.mock.calls[0][0].success(mockResponse);

        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][1]).toEqual(mockResponse);
    });
    it('should add an AJAX POST request to add a torrent', function () {
        var $ = require('jquery');
        var TorrentResource = require('../Torrents');

        var callback = jest.genMockFunction();
        var mockUrl = 'http://example.com/example.torrent';
        TorrentResource.addTorrent(mockUrl, callback);
        expect(callback.mock.calls.length).toBe(0);

        expect($.ajax).toBeCalledWith({
            type: "POST",
            url: encodeURI('/torrent/add'),
            data: { torrentUrl: mockUrl },
            success: jasmine.any(Function),
            error: jasmine.any(Function)
        });

        var mockResponse = { status: 'SUCCESS' };
        $.ajax.mock.calls[0][0].success(mockResponse);
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][1]).toEqual(mockResponse);
    });
});