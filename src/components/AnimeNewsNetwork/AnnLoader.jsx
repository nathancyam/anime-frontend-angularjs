var React = require('react');

var Loader = React.createClass({
    render: function () {
        var opacity = this.props.show ? 1.0 : 0.0;
        var styles = {
            opacity: opacity,
            zIndex: 1
        };
        return (
            <img style={styles} src="/media/icons/loading/loading-balls.svg" />
        );
    }
});

module.exports = Loader;
