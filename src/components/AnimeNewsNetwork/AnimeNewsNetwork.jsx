"use strict";

var React = require('react');

var Loader = require('./AnnLoader.jsx');
var AnnImage = require('./AnnImage.jsx');
var AnnStaffTable = require('./AnnStaffTable.jsx');
var AnnInfoType = require('./AnnInfoType.jsx');
var AnnResource = require('../../resources/AnimeNewsNetwork');
var AnimeActions = require('../../actions/AnimeActions');

var AnimeNewsNetwork = React.createClass({
    getInitialState: function () {
        return {
            results: {
                images: [],
                genres: [],
                themes: [],
                plot_summary: '',
                cast: []
            },
            isLoading: true,
            hasError: false
        };
    },

    _searchCallback: function (err, results) {
        if (err) {
            this.setState({ hasError: err });
        } else {
            if (results.requireReset) {
                AnimeActions.reset();
            }

            this.setState({ results: results, isLoading: false });
        }
    },

    _getAnimeDetails: function (animeTitle) {
        AnnResource.getSearch(animeTitle, { id: this.props.appId }, this._searchCallback);
    },

    componentDidMount: function () {
        if (Object.keys(this.props.anime).length > 0) {
            this._getAnimeDetails(this.props.anime.title);
        }
    },

    componentWillReceiveProps: function (newProps) {
        this._getAnimeDetails(newProps.anime.title);
    },

    render: function () {
        if (this.state.hasError) {
            return (
                <div>
                    <p className="error-msg">AnimeNewsNetwork API is not available.</p>
                </div>
            );
        }
        return (
            <div className="ann-results">
                <Loader show={this.state.isLoading} />
                <AnnImage images={this.state.results.images} />
                <table className="table results col-md-12">
                    <AnnInfoType title="Genres" info={this.state.results.genres} />
                    <AnnInfoType title="Themes" info={this.state.results.themes} />
                    <AnnInfoType title="Number of Episodes" info={this.state.results.number_of_episodes} />
                </table>
                <div className="result-description col-md-12">
                    <h4>Plot Summary</h4>
                    <p className="plot-summary">{this.state.results.plot_summary}</p>
                </div>
                <AnnStaffTable cast={this.state.results.cast} />
            </div>
        );
    }
});

module.exports = AnimeNewsNetwork;
