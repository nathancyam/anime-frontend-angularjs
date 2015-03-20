jest.dontMock('../AnnInfoType.jsx');

describe('AnnInfoType component', function () {
    it('should show the information regarding an anime', function () {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var AnnInfoType = require('../AnnInfoType.jsx');

        var info = ['Sci-fi','Harem'];
        var infoComponent = TestUtils.renderIntoDocument(
            <AnnInfoType title="Genres" info={info} />
        );

        var infoSpans = TestUtils.scryRenderedDOMComponentsWithTag(
            infoComponent, 'span');
        var title = TestUtils.findRenderedDOMComponentWithClass(
            infoComponent, 'infotype');

        expect(title.getDOMNode().textContent).toEqual('Genres:');

        expect(infoSpans[0].getDOMNode().textContent).toEqual('Sci-fi');
        expect(infoSpans[1].getDOMNode().textContent).toEqual('Harem');
    });
});