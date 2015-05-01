'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    AvengersModel = require('../models/AvengersModel');

module.exports = Backbone.Collection.extend({

    // What "blueprint" any objects passed in should be converted into.
    model: AvengersModel,

    /**
     *  Builds the URL to fetch data from. It is also used by
     *  the models to create their endpoint.
     *
     *  @return {string}
     */
    url: function() {
        var dataStore = require('../utils/dataStore');
        return 'http://localhost:4000/api/' + dataStore.locale + '/avengers';
    },

    /**
     *  The server will be sending back purposefully malformed JSON as an
     *  anti-XSSI measure. We must stop jQuery AJAX from attempting to
     *  auto-parse it into an object, and failing.
     *
     *  @param {string} method - CRUD keyword.
     *  @param {object} model - Model or Collection reference.
     *  @param {object} options - Option overrides.
     *  @return {object} - jqXHR Object.
     */
    sync: function(method, model, options) {
        options.dataType = options.dataType || 'text';
        return Backbone.sync.apply(this, [method, model, options]);
    },

    /**
     *  Whether calling fetch, destroy or save (CRUD) the parse method will
     *  be called before backbone attempts to save any of the data into the
     *  collection or convert the response into actual models.
     *
     *  @param {string} response - Raw response text string from server.
     *  @return {object} - JSON parsed object.
     */
    parse: function(response) {
        if (typeof(response) === 'string') {
            response = response.replace(')]}\',', '');
        }

        return JSON.parse(response);
    },

    /**
     *  Takes a set of filters and returns a subset of models
     *  that match the desired filters.
     *
     *  @param {object} filters - Object of key/value filter names and values.
     *  @return {array} - A potentially cut-down set of models.
     */
    getFiltered: function(filters) {
        var hasFilters = false;
        for (var filter in filters) {
            if (filters.hasOwnProperty(filter)) {
                hasFilters = true;
            }
        }

        return (hasFilters) ? this.where(filters) : this.models;
    }

});