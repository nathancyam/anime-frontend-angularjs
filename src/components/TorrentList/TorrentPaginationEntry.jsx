var React = require('react');

var TorrentPaginationEntry = React.createClass({
    handlePagination: function () {
        this.props.handlePagination(this.props.pageNumber);
    },

    render: function () {
        var correctPageLabel = this.props.pageNumber + 1;
        return (
            <li>
                <a onClick={this.handlePagination}>
                    {correctPageLabel}
                </a>
            </li>
        );
    }
});

module.exports = TorrentPaginationEntry;
