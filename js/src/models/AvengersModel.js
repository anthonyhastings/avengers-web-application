'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    parse: function(rawData) {
        rawData.image = 'img/' + rawData.id + '.jpg';
        return rawData;
    }

});