var React = require('react');
var NotificationActions = require('../../actions/NotificationActions');

var Item = React.createClass({
    removeItem: function () {
        NotificationActions.remove(this.props.item);
    },

    render: function () {
        return (
            <div>
                <p>{this.props.item.title}</p>
                <p>{this.props.item.body}</p>
                <span onClick={this.removeItem} value="Remove"></span>
            </div>
        );
    }
});

module.exports = Item;
