jest.dontMock('../TorrentSort.jsx');

describe('Torrent sort component', function () {
    var React;
    var TestUtils;
    var TorrentSort;
    var callback;
    var testComponent;

    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        TorrentSort = require('../TorrentSort.jsx');
        callback = jest.genMockFn();
        testComponent = TestUtils.renderIntoDocument(
            <TorrentSort sortProperty="anime"
                handleSortAction={callback}
            />
        );
    });

    it('should show the sort attribute', function () {
        var strongTag = TestUtils.findRenderedDOMComponentWithTag(testComponent, 'strong');
        expect(strongTag.getDOMNode().textContent).toBe("Anime");
    });

    it('should sent the sort property on click', function () {
        var thTag = TestUtils.findRenderedDOMComponentWithTag(testComponent, 'th');
        TestUtils.Simulate.click(thTag);
        expect(callback.mock.calls.length).toEqual(1);
        expect(callback.mock.calls[0][0]).toEqual("anime");
    });

    it('should use the label prop if it is specified', function () {
        var labelTestComponent = TestUtils.renderIntoDocument(
            <TorrentSort sortProperty="readableSize"
                handleSortAction={callback}
                label="Torrent Size"
            />
        );
        var strongTag = TestUtils.findRenderedDOMComponentWithTag(labelTestComponent, 'strong');
        expect(strongTag.getDOMNode().textContent).toBe("Torrent Size");
        expect(strongTag.getDOMNode().textContent).not.toBe("ReadableSize");
    });
});
