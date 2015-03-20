var React = require('react');

var CheckboxFilter = React.createClass({
    handleUpdate: function (event) {
        var key = this.props.name;
        var value = event.target.checked;
        this.props.updateFilter({ filterName: key, value: value });
    },

    render: function () {
        return (
            <label className="checkbox-inline">
                <input type="checkbox" name={this.props.name} onChange={this.handleUpdate} ref="filterElement">
                    {this.props.label}
                </input>
            </label>
        );
    }
});

module.exports = CheckboxFilter;
