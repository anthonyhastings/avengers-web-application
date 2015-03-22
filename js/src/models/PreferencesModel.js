'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    /**
     *  Outputs the potential options for ordering and filtering while
     *  also recording any choices the user has made. The defaults key
     *  is a method rather than an object because it contains nested
     *  objects and we want fresh copies on every instantiation.
     */
    defaults: function() {
        return {
            orderSelected: 'id',
            orderOptions: ['id', 'alias', 'gender'],

            filtersSelected: {},
            filterOptions: {
                'gender': ['', 'Female', 'Male']
            }
        }
    }

});
