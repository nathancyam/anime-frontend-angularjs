"use strict";
jest.dontMock('../TorrentList.jsx');
jest.dontMock('object-assign');

var Helper = {
    genRandomNumber: function (min, max) {
        return (Math.random() * (max - min) + min).toFixed(0);
    },
    getRandomElementFromArray: function (array) {
        return array[Math.floor(Math.random() * array.length)];
    }
};

describe('Torrent Item component', function () {
    var React, TestUtils, TorrentList, Fixtures, TorrentTable, TorrentItem;
    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        TorrentList = require('../TorrentList.jsx');
        TorrentTable = require('../TorrentTable.jsx');
        TorrentItem = require('../TorrentItem.jsx');

        Fixtures = { list: [] };

        for(var i = 0; i < 50; i++) {
            Fixtures.list.push({
                name: i.toString() + "example",
                readableSize: Helper.genRandomNumber(100, 1000).toString() + " MB",
                seeds: Helper.genRandomNumber(10, 50),
                leeches: Helper.genRandomNumber(10, 50),
                status: "static", href: "http://example.org/something.torrent"
            });
        }
    });
    it('should call the torrent resource once the component is mounted', function () {
        var testComponent = TestUtils.renderIntoDocument(<TorrentList anime="Bakemonogatari" />);
        testComponent.setState({ torrents: Fixtures.list });
        var torrents = TestUtils.scryRenderedComponentsWithType(testComponent, TorrentItem);
        expect(torrents.length).toBe(10);
    });
    it('should set the search state', function () {
        var testComponent = TestUtils.renderIntoDocument(<TorrentList anime="Bakemonogatari" />);
        testComponent.setState({ torrents: Fixtures.list });
        testComponent.handleUserInput("45example");
        var torrents = TestUtils.scryRenderedComponentsWithType(testComponent, TorrentItem);
        expect(torrents.length).toBe(1);
    });
    it('should set the pagination state', function () {
        var testComponent = TestUtils.renderIntoDocument(<TorrentList anime="Bakemonogatari" />);
        testComponent.setState({ torrents: Fixtures.list });
        testComponent.setState({ pageState: 1 });
        var torrents = TestUtils.scryRenderedComponentsWithType(testComponent, TorrentItem);
        expect(torrents[0].props.torrent.name).toEqual("10example");
    });
    it('should set the sorting direction state', function () {
        var testComponent = TestUtils.renderIntoDocument(<TorrentList anime="Bakemonogatari" />);
        testComponent.setState({ torrents: Fixtures.list });
        testComponent.handleSortBy({ attribute: 'seeds', direction: 'asc'});
        var torrents = TestUtils.scryRenderedComponentsWithType(testComponent, TorrentItem);
        expect(torrents[0].props.torrent.seeds <= torrents[9].props.torrent.seeds).toBeTruthy();
    });
});
