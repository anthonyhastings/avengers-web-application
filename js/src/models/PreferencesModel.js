'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    /**
     *  ????. WHY AN OBJECT? REFERENCES RATHER THAN CLEAN COPY! AMAGADZ!
     *
     *  Filter Options:
     *  'gender': Female' || 'Male'
     *
     *  Ordering Options:
     *  'alias' || 'gender'
     */
    defaults: function() {
        return {
            orderBy: '',
            filters: {
            }
        }
    }

});
