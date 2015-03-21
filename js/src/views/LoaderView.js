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
     *  A common pattern function that wraps the standard remove method
     *  of a view, so any custom logic such as app-wide event listeners
     *  or sub-views can be manually cleaned up.
     *
     *  @return {object} - Reference to this view.
     */
    dispose: function() {
        return this.remove();
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