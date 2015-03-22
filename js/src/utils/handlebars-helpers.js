'use strict';

// Loading dependencies.
var Handlebars = require('hbsfy/runtime');

/**
 *  Examines the current filter and current filter value against what
 *  filters are actually chosen, and if there's a match we output
 *  selected attribute.
 *
 *  Example Usage:
 *  {{ isFilterSelected filtersSelected={ gender: "Female" } filterKey="gender" filterValue="Male" }}
 */
Handlebars.registerHelper('isFilterSelected', function(options) {
    var filters = options.hash.filtersSelected,
        currentFilter = options.hash.filterKey,
        currentFilterValue = options.hash.filterValue,
        outputSelected = false;

    if (filters.hasOwnProperty(currentFilter)) {
        if (filters[currentFilter] === currentFilterValue) {
            outputSelected = true;
        }
    } else {
        if (currentFilterValue === '') {
            outputSelected = true;
        }
    }

    if (outputSelected) {
        return new Handlebars.SafeString('selected');
    }
});

/**
 *  Comparison helper than can be used with various operators.
 *
 *  Example Usage:
 *
 *  {{#compare Database.Tables.Count ">" 5}}
 *      There are more than 5 tables
 *  {{/compare}}
 *
 *
 *  {{#compare "Test" "Test"}}
 *      Default comparison of "==="
 *  {{/compare}}
 */
Handlebars.registerHelper('compare', function (lvalue, operator, rvalue, options) {
    var operators, result;

    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }

    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };

    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
});