var React = require('react');

var TorrentDownload = React.createClass({
    statics: {
        getIconClass: function (loadingState) {
            var icon = "fa fa-";
            switch (loadingState) {
                case 'static':
                    return icon + "plus";
                case 'adding':
                    return icon + "refresh fa-spin";
                case 'added':
                    return icon + "check";
                case 'error':
                    return icon + "exclamation";
                default:
                    break;
            }
        }
    },

    handleTorrentAdd: function () {
        this.props.handleTorrentAdd(this.props.torrent);
    },

    render: function () {
        var buttonState = TorrentDownload.getIconClass(this.props.torrent.status);
        return (
            <td>
                <a className="btn btn-primary" onClick={this.handleTorrentAdd}>
                    <i className={buttonState}></i>
                </a>
            </td>
        );
    }
});

module.exports = TorrentDownload;
