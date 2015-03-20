jest.dontMock('../TorrentItem.jsx');

describe('Torrent Item component', function () {
    var React, TestUtils, TorrentItem, torrentFixture, TorrentDownload;
    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        TorrentItem = require('../TorrentItem.jsx');
        TorrentDownload = require('../TorrentDownload.jsx');
        torrentFixture = {
            name: "example",
            readableSize: "100MB",
            seeds: 50,
            leeches: 100,
            status: "static",
            href: "http://example.org/something.torrent"
        };
    });
    it('should show the torrent information via props', function () {
        var callback = jest.genMockFn();
        var component = TestUtils.renderIntoDocument(
            <TorrentItem torrent={torrentFixture}
                handleTorrentAdd={callback}
                torrentState="static"
            />
        );

        var nameDom = TestUtils.findRenderedDOMComponentWithClass(component, 'name');
        var sizeDom = TestUtils.findRenderedDOMComponentWithClass(component, 'size');
        var seedsDom = TestUtils.findRenderedDOMComponentWithClass(component, 'seeds');
        var leechesDom = TestUtils.findRenderedDOMComponentWithClass(component, 'leeches');

        expect(nameDom.getDOMNode().textContent).toEqual(torrentFixture.name);
        expect(sizeDom.getDOMNode().textContent).toEqual(torrentFixture.readableSize);
        expect(seedsDom.getDOMNode().textContent).toEqual(torrentFixture.seeds.toString());
        expect(leechesDom.getDOMNode().textContent).toEqual(torrentFixture.leeches.toString());
    });
    it('should have the TorrentDownload component', function () {
        var callback = jest.genMockFn();
        var TorrentItem = require('../TorrentItem.jsx');
        var component = TestUtils.renderIntoDocument(
            <TorrentItem torrent={torrentFixture}
                handleTorrentAdd={callback}
                torrentState="static"
            />
        );

        var itemComponent = TestUtils.findRenderedComponentWithType(component, TorrentItem);
        expect(itemComponent.props.torrent).toEqual(torrentFixture);
        expect(itemComponent.props.torrentState).toEqual(torrentFixture.status);
    });
    it('should change state when the child TorrentDownload component is clicked', function () {
        var component = TestUtils.renderIntoDocument(<TorrentItem torrent={torrentFixture} />);
        var dlComponent = TestUtils.findRenderedComponentWithType(component, TorrentDownload);

        expect(component.state.torrentState).toEqual(torrentFixture.status);
        dlComponent.handleTorrentAdd();
        expect(dlComponent.props.torrentState).toEqual(component.state.torrentState);
    });
});