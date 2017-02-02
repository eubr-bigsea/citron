'use strict';

// Create loading helper main object

if (!gViz.helpers.number) {
  gViz.helpers.number = {};
}
if (!gViz.helpers.number.format) {
  gViz.helpers.number.format = {};
}
gViz.helpers.number.userLocale = 'en-US';

// Get user locale string or set default
gViz.helpers.number.getUserLocale = function () {

  // Get user locale
  gViz.helpers.number.userLocale = window.navigator.userLanguage || window.navigator.language;

  // Validate locale
  var number = 0;
  try {
    return number.toLocaleString(gViz.helpers.number.userLocale);
  } catch (e) {
    return gViz.helpers.number.userLocale = 'en-US';
  }
};

// Helper to locale string
gViz.helpers.number.locale = function (d) {
  return d.toLocaleString(gViz.helpers.number.userLocale);
};

// Helper to format string sumarize
gViz.helpers.number.format.s = d3.format(".2s");

// Helper to format string sumarize
gViz.helpers.number.format.perc = function (d, c) {
  if (c == null) {
    c = 2;
  }return d3.format('.' + c + '%')(d);
};

// Reload de initializer para mudanca de páginas
$(function () {
  return gViz.helpers.number.getUserLocale();
});
