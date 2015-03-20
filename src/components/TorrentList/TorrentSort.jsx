var React = require('react');

var TorrentSort = React.createClass({
    propTypes: {
        sortProperty: React.PropTypes.string,
        handleSortAction: React.PropTypes.func
    },

    statics: {
        capitaliseFirst: function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },

    handleSortInput: function () {
        this.props.handleSortAction(this.props.sortProperty);
    },

    render: function () {
        var label = this.props.label || this.props.sortProperty;
        return (
            <th onClick={this.handleSortInput}>
                <strong>{TorrentSort.capitaliseFirst(label)}</strong>
            </th>
        );
    }
});

module.exports = TorrentSort;
