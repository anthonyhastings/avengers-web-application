'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    AppView = require('./app');

// Whenever the document has been loaded and parsed (or if it already has been), trigger onDOMContentLoaded logic.
if (document.readyState === 'complete' || document.readyState === 'loaded' || document.readyState === 'interactive') {
    onDOMContentLoaded();
} else {
    window.addEventListener('DOMContentLoaded', onDOMContentLoaded);
}

/**
 *  Starts the application by instantiating our applications
 *  controller and triggering an event to take us to the
 *  starting view.
 */
function onDOMContentLoaded() {
    new AppView();
}