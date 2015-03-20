var React = require('react');

var AnnInfoType = React.createClass({
    render: function () {
        var info = this.props.info;
        if (Array.isArray(info)) {
            info = this.props.info.map((e) => {
                var key = Date.now() + e;
                key = key.replace(/ /g, '');
                return (
                    <span key={key}>{e}</span>
                );
            });
        }

        return (
            <tr>
                <td className="infotype">{this.props.title}:</td>
                <td>{info}</td>
            </tr>
        );
    }
});

module.exports = AnnInfoType;
