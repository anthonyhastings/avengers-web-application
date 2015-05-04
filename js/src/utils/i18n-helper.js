'use strict';

// Loading dependencies.
var Jed = require('jed'),
    Handlebars = require('hbsfy/runtime');

// Creating a shareable object with the Jed instance on it.
var helper = {
    Jed: Jed,
    i18n: new Jed({}),
    store: {}
};

/**
 *  A handlebars wrapper for `gettext`.
 *
 *  Example Usage:
 *  {{ i18n_gettext 'A simple string.' }}
 *
 *  @return {string}.
 */
Handlebars.registerHelper('i18n_gettext', function() {
    return helper.i18n.gettext.apply(helper.i18n, Array.prototype.slice.call(arguments, 0, arguments.length - 1));
});

/**
 *  A handlebars wrapper for `ngettext`.
 *
 *  Example Usage:
 *  {{ i18n_ngettext 'There is a person.' 'There are people.' 1 }}
 *
 *  @return {string}.
 */
Handlebars.registerHelper('i18n_ngettext', function() {
    return helper.i18n.ngettext.apply(helper.i18n, Array.prototype.slice.call(arguments, 0, arguments.length - 1));
});

/**
 *  A handlebars wrapper for `sprintf`.
 *
 *  Example Usage:
 *  {{ sprintf 'You have %1$d new messages.' 6 }}
 *  {{ sprintf (i18n_ngettext 'You have %1$d new message.' 'You have %1$d new messages.' total_messages) total_messages }}
 *
 *  @return {string}.
 */
Handlebars.registerHelper('sprintf', function() {
    return helper.Jed.sprintf.apply(helper.Jed, Array.prototype.slice.call(arguments, 0, arguments.length - 1));
});

module.exports = helper;