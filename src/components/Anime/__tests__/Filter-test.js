jest.dontMock('../Filter.jsx');
jest.dontMock('../Filter/Text.jsx');
jest.dontMock('../Filter/Checkbox.jsx');
jest.dontMock('object-assign');

describe('Filter component', function () {
    var React;
    var TestUtils;
    var Filter;
    var filterComponent;
    var AnimeActions;

    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        Filter = require('../Filter.jsx');
        AnimeActions = require('../../../actions/AnimeActions');
        filterComponent = TestUtils.renderIntoDocument(<Filter />);
    });

    it('should call the action method when some filters change', function () {
        var expectedPayload = {
            title: "Shiro",
            reset: false
        };

        var searchInput = TestUtils.scryRenderedDOMComponentsWithTag(filterComponent, 'input')[0];
        var completeInput = TestUtils.scryRenderedDOMComponentsWithTag(filterComponent, 'input')[1];
        var watchingInput = TestUtils.scryRenderedDOMComponentsWithTag(filterComponent, 'input')[2];

        searchInput.getDOMNode().value = 'Shir';
        TestUtils.Simulate.change(searchInput);
        expect(AnimeActions.filter.mock.calls.length).toEqual(1);
        expect(AnimeActions.filter.mock.calls[0][0]).toEqual({ title: 'Shir', reset: false });

        searchInput.getDOMNode().value = 'Shiro';
        TestUtils.Simulate.change(searchInput);
        expect(AnimeActions.filter.mock.calls.length).toEqual(2);
        expect(searchInput.getDOMNode().value).toEqual(expectedPayload.title);
        expect(AnimeActions.filter.mock.calls[1][0]).toEqual(expectedPayload);

        expectedPayload.is_complete = true;
        completeInput.getDOMNode().checked = true;
        TestUtils.Simulate.change(completeInput);
        expect(AnimeActions.filter.mock.calls.length).toEqual(3);
        expect(AnimeActions.filter.mock.calls[2][0]).toEqual(expectedPayload);

        expectedPayload.is_watching = true;
        watchingInput.getDOMNode().checked = true;
        TestUtils.Simulate.change(watchingInput);
        expect(AnimeActions.filter.mock.calls.length).toEqual(4);
        expect(AnimeActions.filter.mock.calls[3][0]).toEqual(expectedPayload);

        expectedPayload.is_complete = false;
        completeInput.getDOMNode().checked = false;
        TestUtils.Simulate.change(completeInput);
        expect(AnimeActions.filter.mock.calls.length).toEqual(5);
        expect(AnimeActions.filter.mock.calls[4][0]).toEqual(expectedPayload);

        expectedPayload.is_watching = false;
        watchingInput.getDOMNode().checked = false;
        TestUtils.Simulate.change(watchingInput);
        expect(AnimeActions.filter.mock.calls.length).toEqual(6);
        expect(AnimeActions.filter.mock.calls[5][0]).toEqual(expectedPayload);

        expectedPayload.title = '';
        expectedPayload.reset = true;
        searchInput.getDOMNode().value = '';
        TestUtils.Simulate.change(searchInput);
        expect(AnimeActions.filter.mock.calls.length).toEqual(7);
        expect(AnimeActions.filter.mock.calls[6][0]).toEqual(expectedPayload);
    });
});