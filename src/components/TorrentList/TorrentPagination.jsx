var React = require('react');
var TorrentPaginationEntry = require('./TorrentPaginationEntry.jsx');

var TorrentPagination = React.createClass({
    handlePagination: function (pageNumber) {
        this.props.handlePagination(pageNumber);
    },

    render: function () {
        var numberOfPages = (Object.keys(this.props.list).length / this.props.entriesPerPage);
        var pageButtons = [];

        for (var i=0; i < numberOfPages; i++) {
            var key = Date.now() * i;
            pageButtons.push((
                <TorrentPaginationEntry key={key}
                    pageNumber={i}
                    handlePagination={this.handlePagination}
                />
            ));
        }
        return (
            <ul>
                {pageButtons}
            </ul>
        );
    }
});

module.exports = TorrentPagination;
