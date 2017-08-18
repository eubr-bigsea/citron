'use strict';

gViz.shared.helpers.number = {
  userLocale: 'en-US',

  // Get user locale string or set default
  getUserLocale: function () {
    // Get user locale
    this.userLocale = window.navigator.userLanguage || window.navigator.language;

    // Validate locale
    var number = 0;
    try {
      return number.toLocaleString(gViz.helpers.number.userLocale);
    } catch (e) {
      return this.userLocale = 'en-US';
    }
  },

  // Helper to locale string
  locale: function (d) {
    return d.toLocaleString(gViz.helpers.number.userLocale);
  },

  // Helper to format string sumarize
  format: {
    s: d3.format(".2s"),
    perc: function(d, c) {
      if (c == null) {
        c = 2;
      }return d3.format('.' + c + '%')(d);
    }
  },
}

// Reload de initializer para mudanca de páginas
$(function () {
  return gViz.shared.helpers.number.getUserLocale();
});
