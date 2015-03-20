jest.dontMock('../AnnImage.jsx');

describe('AnnImage component', function () {
    it('should show the image as a prop', function () {
        var React = require('react/addons');
        var AnnImage = require('../AnnImage.jsx');
        var TestUtils = React.addons.TestUtils;

        var images = ['http://example.com/image01.jpg', 'http://example.com/image02.jpg'];
        var imageComponent = TestUtils.renderIntoDocument(
            <AnnImage images={images} />
        );

        var imgTag = TestUtils.findRenderedDOMComponentWithTag(
            imageComponent, 'img');

        expect(imgTag.getDOMNode().src).toEqual('http://example.com/image01.jpg');
    });
});
