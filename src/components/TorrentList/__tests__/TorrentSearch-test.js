jest.dontMock('../TorrentSearch.jsx');

describe('TorrentList Component', function () {
	it('should filter the results from search', function () {
		var React = require('react/addons');
		var TorrentSearch = require('../TorrentSearch.jsx');
		var TestUtils = React.addons.TestUtils;

		var callback = jest.genMockFunction();

		var searchComponent = TestUtils.renderIntoDocument(
			<TorrentSearch onUserInput={callback} />
		);

		var input = TestUtils.findRenderedDOMComponentWithTag(
			searchComponent, 'input');

        input.getDOMNode().value = "Bake";
		TestUtils.Simulate.change(input, { target: { value: "Bake" }});

        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toEqual("Bake");
        expect(input.getDOMNode().value).toEqual("Bake");
	});
});
