'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    visibilityClass: 'show',

    initialize: function() {
        this.listenTo(Backbone.Events, 'loader:show', this.onLoaderShow);
        this.listenTo(Backbone.Events, 'loader:hide', this.onLoaderHide);
    },

    onLoaderShow: function() {
        this.$el.addClass(this.visibilityClass);
    },

    onLoaderHide: function() {
        this.$el.removeClass(this.visibilityClass);
    }

});