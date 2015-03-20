/*jslint node: true*/
"use strict";

var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var React = require('react');

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var AnimeList = require('./components/Anime/List.jsx');
var AnimePage = require('./components/Anime/Page.jsx');
var Toolbar = require('./components/Toolbar/Toolbar.jsx');

var App = React.createClass({
    render: function () {
        return (
            <div>
                <Toolbar />
                <div className="container">
                    <RouteHandler {...this.props} />
                </div>
            </div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <Route name="list" handler={AnimeList} />
        <Route name="anime" path="/anime/:animeId" handler={AnimePage} />
        <DefaultRoute handler={AnimeList} />
    </Route>
);

Router.run(routes, function (Handler, state) {
    var params = state.params;
    React.render(<Handler params={params} />, document.body);
});
