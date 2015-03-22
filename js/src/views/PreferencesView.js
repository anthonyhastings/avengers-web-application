'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    $ = require('jquery');

module.exports = Backbone.View.extend({

    // Delegated DOM events that should be bound to the view.
    events: {
        'change .js-filter': 'onFilterChanged'
    },

    // Template function that can be called during render.
    template: require('../templates/preferencesView.hbs'),

    /**
     *  Creates a string of markup by passing raw data from the avengers
     *  collection into the template. This markup is then injected into
     *  the views DOM element.
     *
     *  @return {object} - Reference to this view.
     */
    render: function() {
        var rawHTML = this.template();
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
     *  TODO: IF A BLANK FILTER IS SET, REMOVE THE KEY.
     *  TODO: STUFF NEEDS PASSED TO TEMPLATE SO WHEN RENDERING, SELECT BOXES MATCH THE CHOICES IN PREFERENCES MODEL.
     */
    onFilterChanged: function(event) {
        var currentFilters = this.model.get('filters'),
            $selectBox = $(event.currentTarget),
            $chosenOption = $selectBox.find(':selected'),
            optionValue = $chosenOption.val(),
            filterKey = $selectBox.attr('data-filter-key');

        if (optionValue === '') {
            if (currentFilters.hasOwnProperty(filterKey)) {
                delete currentFilters[filterKey];
            }
        } else {
            currentFilters[filterKey] = optionValue;
        }
    }

});
