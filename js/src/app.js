'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    dataStore = require('./utils/dataStore'),
    ListView = require('./views/ListView'),
    DetailedView = require('./views/DetailedView'),
    LoaderView = require('./views/LoaderView');

module.exports = Backbone.View.extend({

    // Point to an existing DOM element rather than creating one.
    el: '.js-main-container',

    // A reference to the currently active view.
    currentView: null,

    /**
     *  When starting up our controller we listen to events that
     *  would require views to be changed, and we also instantiate
     *  our static loader view which sits outside the view-changing
     *  logic.
     */
    initialize: function() {
        this.listenTo(Backbone.Events, 'changeToDetailed', this.onChangeToDetailed);
        this.listenTo(Backbone.Events, 'changeToList', this.onChangeToList);
        this.loaderView = new LoaderView({
            el: '.js-avengers-loader'
        });
    },

    /**
     *  Logic to switch application to the list view.
     *
     *  Checks if we have already fetched the avengers collection
     *  and performs a fetch if one is necessary (and also shows
     *  the applications loader screen). When we definitely have
     *  data in the collection we hide the loader and show the list.
     */
    onChangeToList: function() {
        var self = this,
            dataDeferred = $.Deferred();

        if (dataStore.avengers.length === 0) {
            Backbone.Events.trigger('loader:show');

            dataStore.avengers.fetch({
                success: function() {
                    dataDeferred.resolve();
                },
                error: function() {
                    alert('Error: AvengersCollection fetch failed!');
                }
            });
        } else {
            dataDeferred.resolve();
        }

        $.when(dataDeferred).then(function() {
            Backbone.Events.trigger('loader:hide');

            var newView = new ListView({
                collection: dataStore.avengers
            });

            self._swapView(newView);
        });
    },

    /**
     *  Logic to switch application to view an avenger.
     *
     *  Checks if we have already fetched the avengers model and
     *  performs a fetch if one is necessary (and also shows the
     *  applications loader screen). When we definitely have data
     *  in the model we hide the loader and show the avenger.
     *
     *  @param {string} modelID - Used to look up the model.
     */
    onChangeToDetailed: function(modelID) {
        var self = this,
            relevantModel = dataStore.avengers.get(modelID),
            dataFetched = $.Deferred();

        if (!relevantModel.hasBeenFetched) {
            Backbone.Events.trigger('loader:show');

            relevantModel.fetch({
                success: function() {
                    relevantModel.hasBeenFetched = true;
                    dataFetched.resolve();
                },
                error: function() {
                    alert('Error: AvengerModel fetch failed!');
                }
            });
        } else {
            dataFetched.resolve();
        }

        $.when(dataFetched).then(function() {
            Backbone.Events.trigger('loader:hide');

            var newView = new DetailedView({
                model: dataStore.avengers.get(modelID)
            });

            self._swapView(newView);
        });
    },

    /**
     *  Takes a reference to view and will show it after hiding any
     *  old views that are currently on screen.
     *
     *  @param {object} newView - Reference to the view being shown.
     */
    _swapView: function(newView) {
        var self = this,
            oldViewHidden = $.Deferred();

        if (self.currentView) {
            this.$el.fadeOut(600, function() {
                oldViewHidden.resolve();
            });
        } else {
            this.$el.hide();
            oldViewHidden.resolve();
        }

        $.when(oldViewHidden).then(function() {
            if (self.currentView) {
                self.currentView.remove();
                self.currentView = null;
            }

            self.currentView = newView;
            self.$el.html(self.currentView.render().el);
            self.$el.fadeIn(600);
        });
    }

});