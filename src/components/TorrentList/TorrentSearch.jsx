var React = require('react');

var TorrentSearch = React.createClass({
    getInitialState: function () {
        return {
            value: ""
        };
    },

    handleChange: function (event) {
        this.props.onUserInput(
            this.refs.filterTorrentName.getDOMNode().value
        );
        this.setState({ value: event.target.value });
    },

	handleMultipleAdd: function () {
		//TODO: Implement logic to handle adding multiple torrrents
	},

    render: function () {
        return (
            <div className="row torrent-filters">
                <div className="col-md-12">
                    <form className="form-inline" role="form">
                        <div className="form-group">
                            <input type="text"
                                className="form-control"
                                placeholder="Filter by file name"
                                ref="filterTorrentName"
                                onChange={this.handleChange}
                                value={this.state.value}
                            />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-info" onClick={this.handleMultipleAdd}>
								Add selected torrents
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = TorrentSearch;
