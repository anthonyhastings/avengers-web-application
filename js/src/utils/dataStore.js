'use strict';

// Loading dependencies.
var AvengersCollection = require('../collections/AvengersCollection'),
    PreferencesModel = require('../models/PreferencesModel');

// Setting up the application-wide dataStore object.
var dataStore = {};

// Constructing an instance of our collection (but not performing any fetches).
dataStore.avengers = new AvengersCollection();

// This model preserves the users collection preferences in terms of ordering and filtering.
dataStore.preferences = new PreferencesModel();

module.exports = dataStore;