'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'ul',

    className: 'avengers__list',

    events: {
        'click .js-avenger-row': 'onAvengerClick'
    },

    template: require('../templates/listView.hbs'),

    initialize: function(options) {
        this.collection = options.collection;
    },

    render: function() {
        var rawHTML = this.template(this.collection.toJSON());
        this.$el.html(rawHTML);

        return this;
    },

    onAvengerClick: function(event) {
        event.preventDefault();
        Backbone.Events.trigger('changeToDetailed', event.currentTarget.getAttribute('data-model-id'));
    }

});