"use strict";

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Anime = require('./Anime.jsx');
var AnimeStore = require('../../stores/AnimeStore');
var Filter = require('./Filter.jsx');

var AnimeList = React.createClass({
    mixins: [ Router.Navigation ],

    loadAnimeList: function () {
        return { list: AnimeStore.getAll() };
    },

    getInitialState: function () {
        return this.loadAnimeList();
    },

    _onChange: function () {
        this.setState({ list: AnimeStore.getAll() });
    },

    componentDidMount: function () {
        AnimeStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function () {
        AnimeStore.removeChangeListener(this._onChange);
    },

    componentWillReceiveProps: function () {
        this.loadAnimeList();
    },

    render: function () {
        return (
            <div className="row anime-list">
                <Filter />
                {this.state.list.map(function (anime) {
                    return (
                        <Link to="anime" params={{ animeId: anime._id }} key={'link' + anime._id}>
                            <Anime anime={anime} key={anime._id} />
                        </Link>
                    );
                }, this)}
            </div>
        );
    }
});

module.exports = AnimeList;
