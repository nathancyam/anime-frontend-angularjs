var React = require('react');
var Router = require('react-router');
var _ = require('lodash');

var Anime = React.createClass({
    mixins: [Router.State],
    render: function () {

        if (_.isUndefined(this.props.anime.image_url)) {
            this.props.anime.image_url = '/media/images/404.jpg';
        }

        return (
            <div className="anime">
                <div className="row">
                    <div className="col-md-12">
                        <img src={this.props.anime.image_url}></img>
                        <div className="anime-label">
                            <h3 className="title">{this.props.anime.title}</h3>
                            <p className="status">Status</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Anime;