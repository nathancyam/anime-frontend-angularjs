jest.dontMock('../TorrentTable.jsx');

var Helper = {
    genRandomNumber: function (min, max) {
        return (Math.random() * (max - min) + min).toFixed(0);
    },
    getRandomElementFromArray: function (array) {
        return array[Math.floor(Math.random() * array.length)];
    }
};

describe('TorrentTable component', function () {
    var React;
    var TestUtils;
    var TorrentTable;
    var callback;
    var Fixtures = {
        list: {},
        sortCategories: ['seeds', 'leeches']
    };
    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        TorrentTable = require('../TorrentTable.jsx');
        callback = jest.genMockFn();

        for(var i = 0; i < 50; i++) {
            var key = Helper.genRandomNumber(1, 999999);
            Fixtures.list[key] = {
                name: i + "example",
                readableSize: Helper.genRandomNumber(100, 1000).toString() + " MB",
                seeds: Helper.genRandomNumber(10, 50),
                leeches: Helper.genRandomNumber(10, 50),
                status: "static",
                href: "http://example.org/something.torrent"
            };
        }
    });
    it('should sort the results in order', function () {
        var sortElement = {
            attribute: Helper.getRandomElementFromArray(Fixtures.sortCategories),
            direction: 'asc'
        };
        var TorrentComponent = require('../TorrentItem.jsx');
        var testComponent = TestUtils.renderIntoDocument(
            <TorrentTable list={Fixtures.list}
                filterText=""
                sortOrder={sortElement}
                pageNumber={0}
                handleSortAction={callback}
                entriesPerPage={10}
            />
        );

        var seedTorrents = TestUtils.scryRenderedComponentsWithType(testComponent, TorrentComponent);
        var firstTorrentEntry = seedTorrents[0].props.torrent[sortElement.attribute];
        var lastTorrentEntry = seedTorrents[9].props.torrent[sortElement.attribute];
        expect(firstTorrentEntry).toBeLessThan(lastTorrentEntry);
    });
    it('should sort the results in order specified by the prop', function () {
        var sortElement = {
            attribute: Helper.getRandomElementFromArray(Fixtures.sortCategories),
            direction: 'desc'
        };
        var TorrentComponent = require('../TorrentItem.jsx');
        var testComponent = TestUtils.renderIntoDocument(
            <TorrentTable list={Fixtures.list}
                filterText=""
                sortOrder={sortElement}
                pageNumber={0}
                handleSortAction={callback}
                entriesPerPage={10}
            />
        );

        var seedTorrents = TestUtils.scryRenderedComponentsWithType(testComponent, TorrentComponent);
        var firstTorrentEntry = seedTorrents[0].props.torrent[sortElement.attribute];
        var lastTorrentEntry = seedTorrents[9].props.torrent[sortElement.attribute];
        expect(lastTorrentEntry).toBeLessThan(firstTorrentEntry);
    });
    it('should change the sort order attribute and directions', function () {
        var sortElement = {
            attribute: 'seeds',
            direction: 'desc'
        };
        var testComponent = TestUtils.renderIntoDocument(
            <TorrentTable list={Fixtures.list}
                filterText=""
                sortOrder={sortElement}
                pageNumber={0}
                handleSortAction={callback}
                entriesPerPage={10}
            />
        );
        testComponent.handleSortInput({ attribute: 'seeds' });
        testComponent.handleSortInput({ attribute: 'leeches' });
        expect(callback.mock.calls[0][0]).toEqual({ attribute: 'seeds', direction: 'asc' });
        expect(callback.mock.calls[1][0]).toEqual({ attribute: 'leeches', direction: 'asc' });
    });
});