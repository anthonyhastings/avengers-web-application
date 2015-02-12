'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    AvengersModel = require('../models/AvengersModel');

module.exports = Backbone.Collection.extend({

    model: AvengersModel

});