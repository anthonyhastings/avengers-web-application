'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    // The type of DOM element to create.
    tagName: 'ul',

    // Classes that should be applied to the views DOM element.
    className: 'avengers__list',

    // Delegated DOM events that should be bound to the view.
    events: {
        'click .js-avenger-row': 'onAvengerClick'
    },

    // Template function that can be called during render.
    template: require('../templates/listView.hbs'),

    /**
     *  When this view is initialized it is passed a reference to its
     *  collection. We store this reference internally for future use.
     *
     *  @param {object} options - Object has of settings / variables.
     */
    initialize: function(options) {
        this.collection = options.collection;
    },

    /**
     *  Creates a string of markup by passing raw data from the avengers
     *  collection into the template. This markup is then injected into
     *  the views DOM element.
     *
     *  @return {object} - Reference to this view.
     */
    render: function() {
        var rawHTML = this.template(this.collection.toJSON());
        this.$el.html(rawHTML);

        return this;
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
     *  Whenever you click one of the avenger rows in the list
     *  we trigger an event that will show that avenger in detail.
     *
     *  @param {object} event - DOM event.
     */
    onAvengerClick: function(event) {
        event.preventDefault();
        Backbone.Events.trigger('changeToDetailed', event.currentTarget.getAttribute('data-model-id'));
    }

});
