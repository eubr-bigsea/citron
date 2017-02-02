"use strict";

// Extend date object to increase number of days

Date.prototype.addDays = function (days) {
  this.setDate(this.getDate() + parseInt(days));
  return this;
};

//
Date.prototype.addMinutes = function (minutes) {
  this.setTime(this.getTime() + minutes * 60000);
  return this;
};

Date.prototype.addSeconds = function (seconds) {
  this.setSeconds(this.getSeconds() + parseInt(seconds));
  return this;
};

// Create date helper main object
if (!gViz.helpers.date) {
  gViz.helpers.date = {};
}
if (!gViz.helpers.date.format) {
  gViz.helpers.date.format = {};
}

// Initializer day difference between dates
gViz.helpers.date.dayDiff = function (to, from) {
  var n = 86400000;
  return Math.round((to - from) / n);
};

// English
if (!gViz.helpers.date.format.en) {
  gViz.helpers.date.format.en = {};
}
gViz.helpers.date.format.en.parse = function (d) {
  return d3.timeParse("%Y-%m-%d")(d);
};
gViz.helpers.date.format.en.format = function (d) {
  return d3.timeFormat("%Y-%m-%d")(d);
};

// Hour/Minute
if (!gViz.helpers.date.format.hms) {
  gViz.helpers.date.format.hms = {};
}
gViz.helpers.date.format.hms.parse = function (d) {
  return d3.timeParse("%H:%M")(d);
};
gViz.helpers.date.format.hms.format = function (d) {
  return d3.timeFormat("%H:%M")(d);
};

// Milliseconds
if (!gViz.helpers.date.format.milliseconds) {
  gViz.helpers.date.format.milliseconds = {};
}
gViz.helpers.date.format.milliseconds.parse = function (d) {
  return d3.timeParse("%Y-%m-%d %H:%M:%S.%L")(d);
};
gViz.helpers.date.format.milliseconds.format = function (d) {
  return d3.timeFormat("%Y-%m-%d %H:%M:%S.%L")(d);
};
