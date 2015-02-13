'use strict';

// Loading dependencies.
var Backbone = require('backbone'),
    $ = Backbone.$ = require('jquery'),
    dataStore = require('./utils/dataStore'),
    ListView = require('./views/ListView'),
    DetailedView = require('./views/DetailedView');

module.exports = Backbone.View.extend({

    currentView: null,

    el: '.js-main-container',

    initialize: function() {
        this.listenTo(Backbone.Events, 'changeToDetailed', this.onChangeToDetailed);
        this.listenTo(Backbone.Events, 'changeToList', this.onChangeToList);
    },

    onChangeToList: function() {
        var newView = new ListView({
            collection: dataStore.avengers
        });

        this._swapView(newView);
    },

    onChangeToDetailed: function(modelID) {
        var newView = new DetailedView({
            model: dataStore.avengers.get(modelID)
        });

        this._swapView(newView);
    },

    _swapView: function(newView) {
        var self = this;

        this.$el.fadeOut(600, function() {
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
