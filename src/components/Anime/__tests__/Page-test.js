jest.dontMock('../List.jsx');
jest.dontMock('object-assign');

describe('Anime Page component', function () {

    var React;
    var TestUtils;
    var $;
    var AnimePage;
    var animePage;

    var Fixtures = {
        response: {
            store: JSON.parse('{"_id":"54cdb15714aee1230a0321ee","normalizedName":"aldnoahzero","title":"Aldnoah.Zero","filepath":"/Volumes/anime/Aldnoah.Zero","__v":0,"image_url":"/media/images/ann_aldnoahzero_full.jpg","filenames":[]}')
        }
    };

    beforeEach(function () {
        React = require('react/addons');
        TestUtils = React.addons.TestUtils;
        AnimePage = require('../Page.jsx');
        $ = require('jquery');
        animePage = TestUtils.renderIntoDocument(<AnimePage params="someid" />);
    });

    it('should make an $.get() call to get the anime details', function () {
        $.get.mock.calls[0][1](Fixtures.response.store);
        expect(animePage.state.anime).toEqual(Fixtures.response.store);
    })
});


