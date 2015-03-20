var React = require('react');

var AnnImage = React.createClass({
    render: function () {
        var image = this.props.images[0];
        return (
            <img src={image} />
        );
    }
});

module.exports = AnnImage;
