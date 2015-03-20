jest.dontMock('../AnimeNewsNetwork.jsx');

describe('AnimeNewsNetwork component', function () {

    var React;
    var TestUtils;
    var Ann;
    var $;
    var AnnResource;
    var anime = { title: "Bakemonogatari" };
    var AnnComponent;

    var Fixtures = {
        response: {
            success: {
                images: ['http://example.com/image01.jpg'],
                themes: "Sci-fi",
                genres: "Thriller",
                number_of_episodes: 24,
                plot_summary: "aaa",
                cast: [{ character: "Sengoku Nadeko", seiyuu: "Kana Hanazawa" }]
            },
            error: {
                status: "FAIL",
                message: "The AnimeNewsNetwork API is unavailable"
            }
        }
    };

    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        Ann = require('../AnimeNewsNetwork.jsx');
        $ = require('jquery');
        AnnResource = require('../../../resources/AnimeNewsNetwork');
        AnnComponent = TestUtils.renderIntoDocument(<Ann anime={anime} />);
    });

	it('should show the anime details after the request', function () {
        // Since the second param is a function, we can mock the return value
        AnnResource.getSearch.mock.calls[0][1](null, Fixtures.response.success);

        var plotTag = TestUtils.findRenderedDOMComponentWithClass(AnnComponent, 'plot-summary');
        expect(plotTag.getDOMNode().textContent).toEqual("aaa");
	});

    it('should show an error message if the ANN API is not working or is unavailable', function () {
        AnnResource.getSearch.mock.calls[0][1](Fixtures.response.error);
        var errorNode = TestUtils.findRenderedDOMComponentWithClass(AnnComponent, 'error-msg');

        expect(errorNode.getDOMNode().textContent).toEqual("AnimeNewsNetwork API is not available.");
    })
});
