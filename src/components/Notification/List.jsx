var React = require('react');
var Item = require('./Item.jsx');
var NotificationAction = require('../../actions/NotificationActions');
var NotificationStore = require('../../stores/NotificationStore');

var List = React.createClass({

    componentDidMount: function () {
        NotificationStore.addListener(this._onChange);
    },

    componentDidUnmount: function () {
        NotificationStore.removeListener(this._onChange);
    },

    _onChange: function () {
        this.setState({ list: NotificationStore.getAll() });
    },

    handleRemoveAll: function () {
        NotificationAction.clearAll();
    },

    render: function () {
        var items = [];

        for (let key in this.props.list) {
            items.push({
                _id: key,
                item: this.props.list[key]
            });
        }

        return (
            <div className="row">
                <div className="notifictions">
                    <span className="btn btn-default" onClick={this.handleRemoveAll} value="Clear All"></span>
                    {items.map(function (item) {
                        return (
                            <Item item={item} key={item._id} />
                        );
                    })};
                </div>
            </div>
        );
    }
});

module.exports = List;
