var React = require('react');

var AnnStaffTable = React.createClass({
    render: function () {

        var cast = this.props.cast.map((e) => {
            var key = Date.now() + e.character + e.seiyuu;
            key = key.replace(/ /g, '');
            return (
                <tr key={key}>
                    <td className="character">{e.character}</td>
                    <td className="seiyuu">{e.seiyuu}</td>
                </tr>
            );
        });

        return (
            <div className="result-cast col-md-12">
                <h4>Cast</h4>
                <table className="table">
                    <tr>
                        <th><strong>Character</strong></th>
                        <th><strong>Seiyuu</strong></th>
                    </tr>
                    {cast}
                </table>
            </div>
        );
    }
});

module.exports = AnnStaffTable;
