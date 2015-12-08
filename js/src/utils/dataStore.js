'use strict';

// Loading dependencies.
var AvengersCollection = require('../collections/AvengersCollection'),
    PreferencesModel = require('../models/PreferencesModel');

// Setting up the application-wide dataStore object.
var dataStore = {};

// Determine the current locale from the HTML elements "lang" attribute.
dataStore.locale = document.querySelector('html').getAttribute('lang') || 'en';

// Constructing an instance of our collection (but not performing any fetches).
dataStore.avengers = new AvengersCollection();

// Used to store the users preferences in terms of ordering and filtering of AvengersCollection.
dataStore.preferences = new PreferencesModel();

module.exports = dataStore;