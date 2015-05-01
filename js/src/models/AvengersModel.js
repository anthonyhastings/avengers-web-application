'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    // We use the slug for model lookups rather than the numeric id.
    idAttribute: 'slug',

    // Flag denotes if we have yet done a full fetch on this model.
    hasBeenFetched: false,

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
        console.info('AvengersModel::sync', method);

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
        console.info('AvengersModel::parse', response);

        if (typeof(response) === 'string') {
            response = response.replace(')]}\',', '');
            response = JSON.parse(response);
        }

        response.image = 'dist/img/' + response.slug + '.jpg';
        return response;
    }

});