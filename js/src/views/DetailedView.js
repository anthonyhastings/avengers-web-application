'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    // The type of DOM element to create.
    tagName: 'div',

    // Classes that should be applied to the views DOM element.
    className: 'avengers-single',

    // Delegated DOM events that should be bound to the view.
    events: {
        'click .js-back-button': 'onBackClick'
    },

    // Template function that can be called during render.
    template: require('../templates/detailedView.hbs'),

    /**
     *  Creates a string of markup by passing raw data from the avengers
     *  model into the template. This markup is then injected into
     *  the views DOM element.
     *
     *  @return {object} - Reference to this view.
     */
    render: function() {
        var rawHTML = this.template(this.model.toJSON());
        this.$el.html(rawHTML);

        return this;
    },

    /**
     *  Whenever you click the back button we trigger an event
     *  that will take you back to the list of avengers.
     *
     *  @param {object} event - DOM event.
     */
    onBackClick: function(event) {
        event.preventDefault();
        Backbone.Events.trigger('changeToList');
    }

});