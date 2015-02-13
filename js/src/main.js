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

function onDOMContentLoaded() {
    var app = new AppView();
    Backbone.Events.trigger('changeToList');
}
