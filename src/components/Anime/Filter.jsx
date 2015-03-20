"use strict";

var React = require('react');
var AnimeStore = require('../../stores/AnimeStore');
var AnimeActions = require('../../actions/AnimeActions');
var TextFilter = require('./Filter/Text.jsx');
var CheckboxFilter = require('./Filter/Checkbox.jsx');
var assign = require('object-assign');


var Filter = React.createClass({
    getInitialState() {
        return {
            activeFilters: {}
        };
    },

    updateFilter(changeObj) {
        var filterObj = this.state.activeFilters;
        filterObj.reset = false;

        var newFilter = {};
        newFilter[changeObj.filterName] = changeObj.value;

        filterObj = assign({}, filterObj, newFilter);

        var reset = Object.keys(filterObj).filter((elem) => {
            let value = filterObj[elem];
            if (typeof value === "string") {
                return value !== "";
            }

            if (typeof value === "boolean") {
                return value;
            }

        }).length;

        if (reset === 0) {
            filterObj.reset = true;
        }

        AnimeActions.filter(filterObj);
        this.setState({ activeFilters: filterObj });
    },

    getAllInfo() {
        AnimeActions.getAllInfo();
    },

    render: function () {
        return (
            <form className="filter col-md-12 form-inline" id="animeListFilter">
                <div className="form-group col-md-8">
                    <TextFilter name="title"
                        updateFilter={this.updateFilter}
                        placeHolder="Search Collection" />
                </div>
                <div className="form-group col-md-2">
                    <a href="#" className="btn btn-default"
                        onClick={this.getAllInfo}>Get All Info</a>
                </div>
                <div className="form-group">
                    <CheckboxFilter name="is_complete"
                        label="Complete"
                        updateFilter={this.updateFilter} />
                    <CheckboxFilter name="is_watching"
                        label="Watching"
                        updateFilter={this.updateFilter} />
                </div>
            </form>
        );
    }
});

module.exports = Filter;
