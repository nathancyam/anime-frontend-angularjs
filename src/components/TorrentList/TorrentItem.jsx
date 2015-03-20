var React = require('react');
var TorrentDownload = require('./TorrentDownload.jsx');
var TorrentActions = require('../../actions/TorrentsActions');

var TorrentItem = React.createClass({
    getInitialState: function () {
        return {
            torrentState: this.props.torrent.status
        };
    },

	handleTorrentAdd: function (torrent) {
        TorrentActions.download(torrent);
	},

    render: function () {
        return (
            <tr>
                <td className="name">{this.props.torrent.name}</td>
                <td className="size">{this.props.torrent.readableSize}</td>
                <td className="seeds">{this.props.torrent.seeds}</td>
                <td className="leeches">{this.props.torrent.leeches}</td>
				<TorrentDownload torrent={this.props.torrent}
								handleTorrentAdd={this.handleTorrentAdd}
								torrentState={this.state.torrentState}
			   	/>
                <td>
                    <input type="checkbox" />
                </td>
            </tr>
        );
    }
});

module.exports = TorrentItem;
