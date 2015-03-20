jest.dontMock('../../constants/AnimeConstants');
jest.dontMock('../AnimeStore');
jest.dontMock('object-assign');

var allResults = [{"_id":"54cdb15714aee1230a03221c","normalizedName":"spacedandy","title":"Space Dandy","filepath":"/Volumes/anime/Space Dandy","__v":0,"image_url":"/media/images/ann_spacedandy_full.jpg","filenames":[],"is_watching":false,"is_complete":true},{"_id":"54cdb15714aee1230a03221d","normalizedName":"shirobako","title":"Shirobako","filepath":"/Volumes/anime/Shirobako","__v":0,"image_url":"/media/images/ann_shirobako_full.jpg","filenames":[],"is_watching":true},{"_id":"54cdb15714aee1230a03221e","normalizedName":"suiseinogargantia","title":"Suisei no Gargantia","filepath":"/Volumes/anime/Suisei no Gargantia","__v":0,"image_url":"/media/images/ann_suiseinogargantiamegurukroharuka_full.jpg","filenames":[]}];

describe('AnimeStore', function () {
    var AnimeConstants = require('../../constants/AnimeConstants');
    var AnimeResource;
    var AppDispatcher;
    var AnimeStore;
    var callback;

    var actions = {
        downloadTorrent: {
            actionType: AnimeConstants.ANIME_UPDATE
        },
        filterAnime: {
            actionType: AnimeConstants.ANIME_FILTER,
            filters: {}
        }
    };

    beforeEach(function () {
        AppDispatcher = require('../../dispatcher/AppDispatcher');
        AnimeStore = require('../AnimeStore');
        AnimeResource = require('../../resources/Anime');
        callback = AppDispatcher.register.mock.calls[0][0];
    });

    it('registers a callback with the dispatcher', function() {
        expect(AppDispatcher.register.mock.calls.length).toBe(1);
    });

    it('should initially return an empty array', function () {
        var all = AnimeStore.getAll();
        expect(all).toEqual([]);
        expect(AnimeResource.getAll.mock.calls.length).toEqual(1);
    });

    it('should return the entire anime collection when called again', function () {
        AnimeStore.getAll();
        AnimeResource.getAll.mock.calls[0][0](null, allResults);
        var all = AnimeStore.getAll();
        expect(all).toEqual(allResults);
    });

    it('should filter the anime based on the filter action', function () {

        // Set the initial getAll() value
        AnimeStore.getAll();
        AnimeResource.getAll.mock.calls[0][0](null, allResults);
        expect(AnimeResource.getAll.mock.calls.length).toEqual(1);

        // Check if it has been set.
        var initialResult = AnimeStore.getAll();
        expect(initialResult).toEqual(allResults);

        var filterAction = actions.filterAnime;
        filterAction.filters = {
            filterText: 'space',
            is_complete: false,
            is_watching: false,
            reset: false
        };

        callback(filterAction);

        var results = AnimeStore.getAll();
        expect(Array.isArray(results)).toEqual(true);
        expect(results.length).toEqual(0);

        filterAction.filters.is_complete = true;
        filterAction.filters.is_watching = false;

        callback(filterAction);
        results = AnimeStore.getAll();

        expect(AnimeResource.getAll.mock.calls.length).toEqual(1);
        expect(results.length).toEqual(1);
    });
});