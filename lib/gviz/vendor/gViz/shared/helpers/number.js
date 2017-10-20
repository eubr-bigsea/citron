
// Default user locale
var userLocale = 'en-US';

// Get user locale function
var getUserLocale = function () {
  // Get user locale
  this.userLocale = window.navigator.userLanguage || window.navigator.language;

  // Validate locale
  var number = 0;
  try {
    return number.toLocaleString(userLocale);
  } catch (e) {
    return this.userLocale = 'en-US';
  }
}

// Helper to locale string
var locale = function (d) {
  return d.toLocaleString(userLocale);
};

// Default number format
var numberFormat = function(d) {
  var value = +d;
  if(d >= 1000000000 || d <= -1000000000) { return (d3.format(".2s")(d).replace('G', 'B')); }
  else if(d >= 1000000 || d <= -1000000) { return (d3.format(".2s")(d)); }
  else if(d >= 1000 || d <= -1000) { return (d3.format(".2s")(d).toUpperCase()); }
  else if(d >= 100 || d <= -100) { return (d.toFixed(0)); }
  else if(d >= 10 || d <= -10) { return (d % 1 + '').length > 3 ? d.toFixed(1) : d; }
  else if(d >= 1 || d <= -1) { return (d % 1 + '').length > 4 ? d.toFixed(2) : d; }
  else if(d < 1 && d > -1) { return (d % 1 + '').length > 5 ? d.toFixed(3) : d; }
}

// Parse format from axis
var parseFormat = function(axis) {

  var fmt = numberFormat, prefix = "", suffix = "";

  // Get axis format with prefix and suffix
  if(axis != null) {

    // Set prefix and suffix
    prefix = axis.prefix != null ? axis.prefix : "";
    suffix  = axis.suffix != null ? axis.suffix : (axis.sufix != null ? axis.sufix : "");

    // Get format
    fmt = numberFormat;
    if(axis.format === 'locale') { fmt = locale; }
    else if(axis.format != null && axis.format != "") { fmt = d3.format(axis.format); }

  } else {
    prefix = "";
    suffix = "";
    fmt = numberFormat;
  }

  // Return format parsed
  return function(d) {
    return fmt(+d).toString().indexOf('-') !== -1 ? '-' + prefix + fmt(+d).toString().replace('-','') + suffix : prefix + fmt(+d) + suffix;
  }
}

// Helpers numbers
gViz.shared.helpers.number = {

  // Default user locale
  userLocale: userLocale,

  // Get user locale string or set default
  getUserLocale: getUserLocale,

  // Helper to locale string
  locale: locale,

  // Helper to format string sumarize
  format: {
    s: d3.format(".2s"),
    perc: function(d, c) {
      if (c == null) {
        c = 2;
      }return d3.format('.' + c + '%')(d);
    }
  },

  // Default number format
  numberFormat: numberFormat,

  // Parse format from axis
  parseFormat: parseFormat
}

// Reload de initializer para mudanca de páginas
$(function () {
  return gViz.shared.helpers.number.getUserLocale();
});
