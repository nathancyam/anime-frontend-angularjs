jest.dontMock('../TorrentPaginationEntry.jsx');

describe('Torrent pagination entry component', function () {
    var React, TestUtils, TorrentPaginationEntry;
    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        TorrentPaginationEntry = require('../TorrentPaginationEntry.jsx');
    });
    it('should show the correct label', function () {
        var callback = jest.genMockFn();
        var testComponent = TestUtils.renderIntoDocument(
            <TorrentPaginationEntry handlePagination={callback}
                pageNumber={0}
            />
        );
        var linkTag = TestUtils.findRenderedDOMComponentWithTag(testComponent, 'a');
        expect(linkTag.getDOMNode().textContent).toEqual("1");
    });
    it('should call the callback with the corrent page number', function () {
        var callback = jest.genMockFn();
        var testComponent = TestUtils.renderIntoDocument(
            <TorrentPaginationEntry handlePagination={callback}
                pageNumber={0}
            />
        );
        var linkTag = TestUtils.findRenderedDOMComponentWithTag(testComponent, 'a');
        TestUtils.Simulate.click(linkTag);
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toEqual(0);
    });
});