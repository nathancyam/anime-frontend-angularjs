jest.dontMock('../TorrentDownload.jsx');

describe('TorrentDownload component', function () {
    var React, TestUtils, Fixtures;
    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        Fixtures = {
            torrent: {
                status: "static",
                href: "http://example.org/example.torrent"
            }
        };
    });
    it('should call the handleTorrent event handler', function () {
        var TorrentDownload = require('../TorrentDownload.jsx');
        var callback = jest.genMockFunction();
        var torrentComponent = TestUtils.renderIntoDocument(
            <TorrentDownload handleTorrentAdd={callback}
                torrent={Fixtures.torrent}
                torrentState="static"
            />
        );

        var linkTag = TestUtils.findRenderedDOMComponentWithTag(
            torrentComponent, 'a'
        );
        var iconTag = TestUtils.findRenderedDOMComponentWithTag(
            torrentComponent, 'i'
        );

        expect(iconTag.getDOMNode().className).toEqual("fa fa-plus");
        TestUtils.Simulate.click(linkTag);
        torrentComponent.props.torrentState = "adding";
        expect(callback.mock.calls.length).toBe(1);
    });
});
