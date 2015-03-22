'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    $ = require('jquery'),
    _ = require('underscore');

module.exports = Backbone.View.extend({

    // Delegated DOM events that should be bound to the view.
    events: {
        'change .js-filter': 'onFilterChanged',
        'change .js-order-by': 'onOrderChanged',
        'click .js-toggle': 'onToggleClick'
    },

    // Template function that can be called during render.
    template: require('../templates/preferencesView.hbs'),

    /**
     *  Creates a string of markup by passing raw data from the preferences
     *  model the template. This markup is then injected into the views
     *  DOM element.
     *
     *  @return {object} - Reference to this view.
     */
    render: function() {
        var rawHTML = this.template(this.model.toJSON());
        this.$el.html(rawHTML);
        this.setPanelState();

        return this;
    },

    /**
     *  Examines the model state and updates the toggle class
     *  accordingly.
     */
    setPanelState: function() {
        if (this.model.get('panelOpen')) {
            this.$el.addClass('is-open');
        } else {
            this.$el.removeClass('is-open');
        }
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
     *  Whenever a filter changes, we determine the new filter key and the
     *  new value then update a cloned filters object accordingly. This
     *  filters object is then set back onto the model.
     *
     *  @param {object} event - DOM event.
     */
    onFilterChanged: function(event) {
        var currentFilters = _.clone(this.model.get('filtersSelected')),
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

        this.model.set('filtersSelected', currentFilters);
    },

    /**
     *  Upon choosing a new field to order by, we update the the
     *  preferences model accordingly.
     *
     *  @param {object} event - DOM event.
     */
    onOrderChanged: function(event) {
        var $selectBox = $(event.currentTarget),
            $chosenOption = $selectBox.find(':selected'),
            optionValue = $chosenOption.val();

        this.model.set('orderSelected', optionValue);
    },

    /**
     *  Upon clicking the toggle button we update the panel state within
     *  the model, then re-trigger the logic to toggle the panel class.
     */
    onToggleClick: function() {
        this.model.set('panelOpen', !this.model.get('panelOpen'));
        this.setPanelState();
    }

});
