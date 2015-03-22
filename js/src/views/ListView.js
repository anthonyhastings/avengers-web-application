'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    $ = require('jquery'),
    dataStore = require('../utils/dataStore'),
    PreferencesView = require('./PreferencesView');

module.exports = Backbone.View.extend({

    // The type of DOM element to create.
    tagName: 'div',

    // Classes that should be applied to the views DOM element.
    className: 'avengers__listContainer',

    // Delegated DOM events that should be bound to the view.
    events: {
        'click .js-avenger-row': 'onAvengerClick'
    },

    // A template function to output containers for the grid and preferences.
    template: require('../templates/listView.hbs'),

    // Specific template function for outputting an avenger.
    avengerTemplate: require('../templates/listItem.hbs'),

    /**
     *  Upon initialization we store a reference to the Avengers collection,
     *  we create a secondary collection (for filtering and ordering) and
     *  also listen for any preference changes.
     *
     *  @param {object} options - Object has of settings / variables.
     */
    initialize: function(options) {
        this.collection = options.collection;
        this.filteredCollection = new Backbone.Collection();
        this.listenTo(dataStore.preferences, 'change', this.onPreferencesChanged);
    },

    /**
     *  Templates out the generic template first which creates empty
     *  containers for the avengers grid and the preferences panel.
     *
     *  After this is done, we trigger sub-logic to instantiate the
     *  preferences view, and logic to order/filter/render the avengers.
     *
     *  @return {object} - Reference to this view.
     */
    render: function() {
        this.$el.html(this.template());
        this.renderCollection();
        this.renderSubViews();

        return this;
    },

    /**
     *  Requests a filtered down version of the avengers collection which
     *  we copy into a sub-collection (to preserve the original data).
     *
     *  We also order this sub-collection accordingly before templating
     *  out each model and injecting into the DOM.
     */
    renderCollection: function() {
        var filteredModels = this.collection.getFiltered(dataStore.preferences.get('filtersSelected')),
            documentFragment = document.createDocumentFragment();

        this.filteredCollection.comparator = dataStore.preferences.get('orderSelected');
        this.filteredCollection.reset(filteredModels);

        this.filteredCollection.forEach(function(model) {
            var $avengerElement = $(this.avengerTemplate(model.toJSON()));
            documentFragment.appendChild($avengerElement[0]);
        }, this);

        this.$el.find('.js-avengers-list').html(documentFragment);
    },

    /**
     *  After this view has rendered itself, it then takes care of
     *  instantiating and rendering its preferences sub-view.
     */
    renderSubViews: function() {
        this.preferencesView = new PreferencesView({
            el: this.$el.find('.js-preferences-panel'),
            model: dataStore.preferences
        });

        this.preferencesView.render();
    },

    /**
     *  A common pattern function that wraps the standard remove method
     *  of a view, so any custom logic such as app-wide event listeners
     *  or sub-views can be manually cleaned up.
     *
     *  @return {object} - Reference to this view.
     */
    dispose: function() {
        this.preferencesView.dispose();
        this.preferencesView = null;
        this.filteredCollection = null;

        return this.remove();
    },

    /**
     *  Whenever we detect that the preferences model has been changed
     *  we ask for the collection to re-render.
     */
    onPreferencesChanged: function() {
        console.info('ListView::onPreferencesChanged');
        this.renderCollection();
    },

    /**
     *  Whenever you click one of the avenger rows in the list
     *  we trigger an event that will show that avenger in detail.
     *
     *  @param {object} event - DOM event.
     */
    onAvengerClick: function(event) {
        event.preventDefault();
        Backbone.Events.trigger('changeToDetailed', event.currentTarget.getAttribute('data-model-slug'));
    }

});
