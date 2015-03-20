var React = require('react');

var TorrentStore = require('../../stores/TorrentsStore');
var TorrentSearch = require('./TorrentSearch.jsx');
var TorrentTable = require('./TorrentTable.jsx');
var TorrentPagination = require('./TorrentPagination.jsx');

var TorrentList = React.createClass({
    getStateFromStore: function () {
        return {
            pageState: 0,
            filterText: '',
            torrents: {},
            sortOrder: {}
        };
    },

    getInitialState: function () {
        return this.getStateFromStore();
    },

    _onChange: function () {
        var anime = this.props.anime;
        this.setState({ torrents: TorrentStore.getAll(anime.title) });
    },

    componentDidMount: function () {
        TorrentStore.addChangeListener(this._onChange);
    },

    componentWillReceiveProps: function (newProps) {
        this.setState({ torrents: TorrentStore.getAll(newProps.anime.title) });
    },

    componentWillUnmount: function () {
        TorrentStore.removeChangeListener(this._onChange);
    },

    handleUserInput: function (text) {
        this.setState({ filterText: text });
    },

    handleSortBy: function (order) {
        this.setState({ sortOrder: order });
    },

    handlePagination: function (number) {
        this.setState({ pageState: number });
    },

    render: function () {
        var entriesPerPage = 10;
        return (
            <div>
                <TorrentSearch onUserInput={this.handleUserInput} />
                <TorrentPagination start={this.state.pageState}
                    entriesPerPage={entriesPerPage}
                    list={this.state.torrents}
                    handlePagination={this.handlePagination}
                />
                <TorrentTable list={this.state.torrents}
                    filterText={this.state.filterText}
                    sortOrder={this.state.sortOrder}
                    pageNumber={this.state.pageState}
                    handleSortAction={this.handleSortBy}
                    entriesPerPage={entriesPerPage}
                />
            </div>
        );
    }
});

module.exports = TorrentList;
