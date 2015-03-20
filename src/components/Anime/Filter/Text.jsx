var React = require('react');

var TextFilter = React.createClass({
    getInitialState: function () {
        return {
            filterValue: ''
        };
    },

    handleTextInput: function (event) {
        this.props.updateFilter({ filterName: this.props.name, value: event.target.value });
        this.setState({ filterValue: event.target.value });
    },

    render: function () {
        return (
            <div>
                <input type="text"
                    ref="filterText"
                    name={this.props.name}
                    placeholder={this.props.placeHolder}
                    className={this.props.className}
                    onChange={this.handleTextInput}
                    value={this.state.filterValue} />
            </div>
        );
    }
});

module.exports = TextFilter;
