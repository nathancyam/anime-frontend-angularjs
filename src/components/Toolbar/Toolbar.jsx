var React = require('react');

var Toolbar = React.createClass({
    render: function () {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <a href="#" className="navbar-brand">Anime Episode App</a>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-left">
                            <li>
                                <a href="#">Anime</a>
                            </li>
                            <li>
                                <a href="#">Torrents</a>
                            </li>
                            <li>
                                <a href="#">Add Anime</a>
                            </li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className="dropdown">
                                <a className="dropdown-toggle">Notifications</a>
                                <ul className="dropdown-menu notification-dropdown">
                                </ul>
                            </li>
                            <li>
                                <div className="notification-counter"></div>
                            </li>
                            <li>
                                <a href="#">Settings</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
});

module.exports = Toolbar;