jest.dontMock('../TorrentPagination.jsx');

describe('Torrent Pagination component', function () {
    var React, TestUtils, TorrentPagination, TorrentPaginationEntry, listFixture;
    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        TorrentPagination = require('../TorrentPagination.jsx');
        TorrentPaginationEntry = require('../TorrentPaginationEntry.jsx');

        listFixture = [];
        for (var i = 0; i < 100; i++) {
            listFixture.push(i);
        }
    });
    it('should generate the appropriate number of pagination entries', function () {
        var testComponent = TestUtils.renderIntoDocument(
            <TorrentPagination list={listFixture}
                entriesPerPage={10}
            />
        );

        var entryComponents = TestUtils.scryRenderedComponentsWithType(testComponent, TorrentPaginationEntry);
        expect(entryComponents.length).toEqual(10);
    });
    it('should call the callbacks with the entry', function () {
        var callback = jest.genMockFn();
        var testComponent = TestUtils.renderIntoDocument(
            <TorrentPagination list={listFixture}
                entriesPerPage={10}
                handlePagination={callback}
            />
        );
        var entryComponent = TestUtils.scryRenderedComponentsWithType(testComponent, TorrentPaginationEntry)[5];
        entryComponent.handlePagination();
        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual(5);
    });
});