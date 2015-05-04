'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    dataStore = require('./utils/dataStore'),
    i18nHelper = require('./utils/i18n-helper'),
    ListView = require('./views/ListView'),
    DetailedView = require('./views/DetailedView'),
    LoaderView = require('./views/LoaderView');

// Load Handlebars helpers file to associate them to Handlebars namespace.
require('./utils/handlebarsHelpers');

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
     *
     *  Finally we fetch our UI translations and then trigger the
     *  logic that will save the translations and start the app.
     */
    initialize: function() {
        var self = this;

        this.listenTo(Backbone.Events, 'changeToDetailed', this.onChangeToDetailed);
        this.listenTo(Backbone.Events, 'changeToList', this.onChangeToList);

        this.loaderView = new LoaderView({
            el: '.js-avengers-loader'
        });

        $.when(this._getTranslations(dataStore.locale)).then(function(data) {
            self._setTranslations(data);
            Backbone.Events.trigger('changeToList');
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
     *  @param {string} modelSlug - Used to look up the model.
     */
    onChangeToDetailed: function(modelSlug) {
        var self = this,
            relevantModel = dataStore.avengers.get(modelSlug),
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
                model: dataStore.avengers.get(modelSlug)
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
                self.currentView.dispose();
                self.currentView = null;
            }

            self.currentView = newView;
            self.$el.html(self.currentView.render().el);
            self.$el.fadeIn(600);
        });
    },

    /**
     *  Retrieves the language files that match the language code.
     *  Performs an API request for data if necessary.
     *
     *  @param {string} langCode - Two-letter language code.
     *  @return {object} - jQuery promise object.
     */
    _getTranslations: function(langCode) {
        var deferred = $.Deferred();

        if (langCode === 'en') {
            deferred.resolve();
        } else if (i18nHelper.store.hasOwnProperty(langCode)) {
            deferred.resolve(i18nHelper.store[langCode]);
        } else {
            $.ajax({
                method: 'GET',
                dataType: 'text',
                url: /api/ + langCode + '/translations',
                success: function(response) {
                    if (typeof(response) === 'string') {
                        response = response.replace(')]}\',', '');
                    }

                    i18nHelper.store[langCode] = JSON.parse(response);
                    deferred.resolve(i18nHelper.store[langCode]);
                }
            });
        }

        Backbone.Events.trigger('loader:show');

        return deferred.promise();
    },

    /**
     *  Sets the translation object onto the i18nhelper with the
     *  data that was passed in.
     *
     *  @param {object} data - Jed translations object.
     */
    _setTranslations: function(data) {
        if (typeof(data) === 'undefined') {
            return false;
        }

        i18nHelper.i18n = new i18nHelper.Jed(data);
    }

});