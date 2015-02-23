'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    // Class that will be toggled on and off to show / hide the view.
    visibilityClass: 'show',

    /**
     *  Listens to events coming from the event bus that would require
     *  the loader to be shown or hidden.
     */
    initialize: function() {
        this.listenTo(Backbone.Events, 'loader:show', this.onLoaderShow);
        this.listenTo(Backbone.Events, 'loader:hide', this.onLoaderHide);
    },

    /**
     *  Toggles the loader to be shown.
     */
    onLoaderShow: function() {
        this.$el.addClass(this.visibilityClass);
    },

    /**
     *  Toggles the loader to be hidden.
     */
    onLoaderHide: function() {
        this.$el.removeClass(this.visibilityClass);
    }

});