var React = require('react');
var TorrentSort = require('./TorrentSort.jsx');
var TorrentItem = require('./TorrentItem.jsx');

var TorrentTable = React.createClass({
    propTypes: {
        sortOrder: React.PropTypes.object,
        pageNumber: React.PropTypes.number,
        entriesPerPage: React.PropTypes.number,
        handleSortAction: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            sortOrder: {
                attribute: "",
                direction: "asc"
            },
            pageNumber: 0,
            entriesPerPage: 10
        };
    },

    handleSortInput: function (sortBy) {
        var finalSort = {
            attribute: sortBy.attribute
        };
        if (sortBy.attribute === this.props.sortOrder.attribute) {
            if (this.props.sortOrder === 'asc') {
                finalSort.direction = 'desc';
            } else {
                finalSort.direction = 'asc';
            }
        } else {
            finalSort.direction = 'asc';
        }
        this.props.handleSortAction(finalSort);
    },

    render: function () {
        var sortAttribute = this.props.sortOrder.attribute;
        var sortDirection = this.props.sortOrder.direction;

        var sortable = [];
        for (var key in this.props.list) {
            sortable.push([key, this.props.list[key]]);
        }

        // Handle text filtering
        var torrentListing = sortable.filter((torrent) => {
            var name = torrent[1].name;
            if (typeof name == "undefined") {
                console.warn(torrent);
            }
            return name.toLowerCase().indexOf(this.props.filterText.toLowerCase()) !== -1;
        });

        if (torrentListing.length > 0) {
            torrentListing.sort((a, b) => {
                if (a[1][sortAttribute] > b[1][sortAttribute]) {
                    return sortDirection === 'asc' ? 1 : -1;
                }
                if (a[1][sortAttribute] < b[1][sortAttribute]) {
                    return sortDirection === 'asc' ? -1 : 1;
                }
                return 0;
            });
        }

        var numberToSplit = this.props.pageNumber * this.props.entriesPerPage;
        torrentListing = torrentListing.slice(numberToSplit, numberToSplit + this.props.entriesPerPage);
        torrentListing = torrentListing.map((torrent) => {
            return (
                <TorrentItem key={torrent[0]} torrent={torrent[1]} />
            );
        });
        return (
            <table className="table">
                <tr>
                    <TorrentSort handleSortAction={this.handleSortInput} sortProperty="name" />
                    <TorrentSort handleSortAction={this.handleSortInput} sortProperty="readableSize" />
                    <TorrentSort handleSortAction={this.handleSortInput} sortProperty="seeds" />
                    <TorrentSort handleSortAction={this.handleSortInput} sortProperty="leeches" />
                    <th></th>
                    <th></th>
                </tr>
                {torrentListing}
            </table>
        );
    }
});

module.exports = TorrentTable;
