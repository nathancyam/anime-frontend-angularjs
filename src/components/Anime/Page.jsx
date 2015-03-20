/*jslint node: true*/
"use strict";

var React = require('react');
var Router = require('react-router');
var $ = require('jquery');
var AnimeNewsNetwork = require('../../components/AnimeNewsNetwork/AnimeNewsNetwork.jsx');
var TorrentList = require('../../components/TorrentList/TorrentList.jsx');

var AnimePage = React.createClass({
    mixins: [ Router.Navigation, Router.State ],

    getAnimeDetails: function () {
        var animeId = this.getParams().animeId;
        $.get('/anime/' + animeId, (resp) => {
            this.setState({ anime: resp });
        });
    },

    getInitialState: function () {
        this.getAnimeDetails();
        return { anime: {} };
    },

    render: function () {
        return (
            <div>
                <AnimeNewsNetwork anime={this.state.anime} appId={this.getParams().animeId} />
                <TorrentList anime={this.state.anime} />
            </div>
        );
    }
});

module.exports = AnimePage;
