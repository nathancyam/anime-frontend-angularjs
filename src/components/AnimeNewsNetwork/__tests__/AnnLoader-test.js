jest.dontMock('../AnnLoader.jsx');

describe('AnnLoader component', function () {
    it('show and hide the loader during the ANN request', function () {
        var React = require('react/addons');
        var TestUtils = React.addons.TestUtils;
        var Loader = require('../AnnLoader.jsx');

        var loadingComponent = TestUtils.renderIntoDocument(
            <Loader show={true} />
        );
        var hideComponent = TestUtils.renderIntoDocument(
            <Loader show={false} />
        );

        var loadClass = TestUtils.findRenderedDOMComponentWithTag(
            loadingComponent, 'img').getDOMNode().style;
        var hideClass = TestUtils.findRenderedDOMComponentWithTag(
            hideComponent, 'img').getDOMNode().style;

        loadClass = loadClass._values;
        hideClass = hideClass._values;

        expect(loadClass.opacity).toEqual('1');
        expect(loadClass['z-index']).toEqual('1');
        expect(hideClass.opacity).toEqual('0');
        expect(hideClass['z-index']).toEqual('1');
    });
});