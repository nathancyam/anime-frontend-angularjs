jest.dontMock('../../constants/TorrentsConstants');
jest.dontMock('../TorrentsStore');
jest.dontMock('object-assign');

describe('TorrentStore', function () {
    var TorrentsConstants = require('../../constants/TorrentsConstants');
    var AppDispatcher;
    var TorrentsStore;
    var callback;

    var actionDownloadTorrent = {
        actionType: TorrentsConstants.TORRENTS_DOWNLOAD,
        torrent: {
            app_id: "nyaatorrents_000001",
            name: "Example.torrent",
            readableSize: "100 MB",
            status: "static",
            href: "http://www.example.com/asdf.torrent"
        }
    };

    var Fixtures = {
        torrents: [
            {
                id: '000001',
                name: "Example.torrent",
                readableSize: "100 MB",
                status: "static",
                href: "http://www.example.com/asdf.torrent"
            },
            {
                id: '000002',
                name: "Example.torrent",
                readableSize: "100 MB",
                status: "static",
                href: "http://www.example.com/asdf.torrent"
            },
            {
                id: '000003',
                name: "Example.torrent",
                readableSize: "100 MB",
                status: "static",
                href: "http://www.example.com/asdf.torrent"
            }
        ]
    };

    beforeEach(function () {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        TorrentsStore = require('../TorrentsStore');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should initially return an empty object', function () {
        var TorrentResource = require('../../resources/Torrents');
        var all = TorrentsStore.getAll('Bakemonogatari');
        expect(all).toEqual({});
        expect(TorrentResource.getTorrent.mock.calls[0][0]).toEqual("Bakemonogatari");
    });

    it('should make a call to get torrents for an anime', function () {
        var TorrentResource = require('../../resources/Torrents');
        TorrentsStore.getAll('Bakemonogatari');
        expect(TorrentResource.getTorrent.mock.calls[0][0]).toEqual("Bakemonogatari");
        TorrentResource.getTorrent.mock.calls[0][1](null, Fixtures.torrents);

        var all = TorrentsStore.getAll("Bakemonogatari");
        expect(typeof all).toEqual("object");
        expect(Object.keys(all).length).toEqual(Object.keys(Fixtures.torrents).length);
    });

    it('should update the _torrent object when downloads are initialised', function () {
        var TorrentResource = require('../../resources/Torrents');
        TorrentsStore.getAll("Bakemonogatari");
        TorrentResource.getTorrent.mock.calls[0][1](null, Fixtures.torrents);

        callback(actionDownloadTorrent);
        expect(TorrentResource.addTorrent.mock.calls.length).toBe(1);

        var torrent = TorrentsStore.getAll("Bakemonogatari");
        expect(torrent.status).not.toBe('static');
    });
});