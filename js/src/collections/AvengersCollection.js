'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    AvengersModel = require('../models/AvengersModel');

module.exports = Backbone.Collection.extend({

    // What "blueprint" any objects passed in should be converted into.
    model: AvengersModel,

    // URL to fetch data from. Also used by models to create their endpoint.
    url: 'http://localhost:4000/api/avengers',

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
    }

});