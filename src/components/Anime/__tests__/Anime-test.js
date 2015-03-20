jest.dontMock('../Anime.jsx');

describe('Anime component', function () {
    var React;
    var TestUtils;
    var Anime;
    var AnimeComponent;
    var Fixtures = {
        anime : {
            _id: Date.now() + Math.random(),
            designated_subgroup: "Commie",
            filepath: "/home/example/Kancolle",
            is_complete: false,
            is_watching: true,
            normalizedName: "kancolle",
            title: "Kantai Collection",
            image_url: "http://example.com/kancolle.jpg"
        },
        image_url: "http://example.com/kancolle.jpg"
    };

    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        Anime = require('../Anime.jsx');
    });

    it('should show the anime title and images', function () {
        AnimeComponent = TestUtils.renderIntoDocument(<Anime anime={Fixtures.anime} />);
        var imageTag = TestUtils.findRenderedDOMComponentWithTag(AnimeComponent, 'img');
        var titleTag = TestUtils.findRenderedDOMComponentWithClass(AnimeComponent, 'title');
        expect(imageTag.getDOMNode().src).toEqual(Fixtures.anime.image_url);
        expect(titleTag.getDOMNode().textContent).toEqual(Fixtures.anime.title);
    });
});