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

  // Diwo default
  numberFormat: function(d) {
    var value = +d;
    if(d >= 1000000000 || d <= -1000000000) { return (d3.format(".2s")(d).replace('G', 'B')); }
    else if(d >= 1000000 || d <= -1000000) { return (d3.format(".2s")(d)); }
    else if(d >= 1000 || d <= -1000) { return (d3.format(".2s")(d).toUpperCase()); }
    else if(d >= 100 || d <= -100) { return (d.toFixed(0)); }
    else if(d >= 10 || d <= -10) { return (d % 1 + '').length > 3 ? d.toFixed(1) : d; }
    else if(d >= 1 || d <= -1) { return (d % 1 + '').length > 4 ? d.toFixed(2) : d; }
    else if(d < 1 && d > -1) { return (d % 1 + '').length > 5 ? d.toFixed(3) : d; }
  },

  parseFormat: function(axis) {
    // Get axis format with prefix and suffix
    if(axis != null) {

      // Set prefix and suffix
      var prefix = axis.prefix != null ? axis.prefix : "";
      var suffix  = axis.suffix != null ? axis.suffix : (axis.sufix != null ? axis.sufix : "");

      // Get format
      var fmt = this.numberFormat;
      if(axis.format === 'locale') { fmt = this.numberFormat.locale; }
      else if(axis.format != null && axis.format != "") { fmt = d3.format(axis.format); }

    } else {
      var prefix = "", suffix = "", fmt = this.numberFormat;
    }

    // Return format parsed
    return function(d) {
      return fmt(+d).toString().indexOf('-') !== -1 ? '-' + prefix + fmt(+d).toString().replace('-','') + suffix : prefix + fmt(+d) + suffix;
    };
  },
}


// Reload de initializer para mudanca de páginas
$(function () {
  return gViz.shared.helpers.number.getUserLocale();
});
