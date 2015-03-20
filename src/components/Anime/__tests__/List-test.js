jest.dontMock('../List.jsx');
jest.dontMock('object-assign');

describe('Anime List component', function () {

    var React;
    var TestUtils;
    var AnimeResource;
    var AnimeList;
    var AnimeStore;
    var Anime;
    var $;
    var Router;
    var Link;

    var Fixtures = {
        response: {
            store: JSON.parse('[{"_id":"54cdb15714aee1230a03221c","normalizedName":"spacedandy","title":"Space Dandy","filepath":"/Volumes/anime/Space Dandy","__v":0,"filenames":[]},{"_id":"54cdb15714aee1230a03221d","normalizedName":"shirobako","title":"Shirobako","filepath":"/Volumes/anime/Shirobako","__v":0,"filenames":[]},{"_id":"54cdb15714aee1230a03221e","normalizedName":"suiseinogargantia","title":"Suisei no Gargantia","filepath":"/Volumes/anime/Suisei no Gargantia","__v":0,"filenames":[]}]')
        }
    };

    beforeEach(function () {
        React = require('react/addons');
        Router = require('react-router');
        Link = Router.Link;
        TestUtils = React.addons.TestUtils;
        AnimeList = require('../List.jsx');
        Anime = require('../Anime.jsx');
        AnimeStore = require('../../../stores/AnimeStore');
        $ = require('jquery');
        AnimeResource = require('../../../resources/Anime');

        console.log(Router);

        TestUtils.mockComponent(Link);
    });

    it('should get the anime details from the state', function () {
        AnimeStore.getAll.mockReturnValue(Fixtures.response.store);
        var animeList = TestUtils.renderIntoDocument(<AnimeList />);
        var animeComponents = TestUtils.scryRenderedComponentsWithType(animeList, Anime);
        expect(animeComponents.length).toEqual(3);
    })
});


