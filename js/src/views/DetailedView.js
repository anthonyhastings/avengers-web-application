'use strict';

// Loading dependencies.
var Backbone = require('backbone');

module.exports = Backbone.View.extend({

    tagName: 'div',

    className: 'avengers-single',

    events: {
        'click .js-back-button': 'onBackClick'
    },

    template: require('../templates/detailedView.hbs'),

    render: function() {
        var rawHTML = this.template(this.model.toJSON());
        this.$el.html(rawHTML);

        return this;
    },

    onBackClick: function(event) {
        event.preventDefault();
        Backbone.Events.trigger('changeToList');
    }

});