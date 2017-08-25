// Extend date object to increase number of days
Date.prototype.addDays = function(days) {
  this.setDate(this.getDate() + parseInt(days));
  return this;
};

// Extend date object to increase number of minutes
Date.prototype.addMinutes = function(minutes) {
  this.setTime(this.getTime() + minutes*60000);
  return this;
}

// Extend date object to increase number of seconds
Date.prototype.addSeconds = function(seconds) {
  this.setTime(this.getTime() + seconds*1000);
  return this;
}

// Module declaration
gViz.shared.helpers.date = function() {

  // Multi Format
  var formatMillisecond = d3.timeFormat(".%L"),
      formatSecond = d3.timeFormat(":%S"),
      formatMinute = d3.timeFormat("%I:%M"),
      formatHour = d3.timeFormat("%I %p"),
      formatDay = d3.timeFormat("%a %d"),
      formatWeek = d3.timeFormat("%b %d"),
      formatMonth = d3.timeFormat("%B"),
      formatYear = d3.timeFormat("%Y");

  return {

    // Helpers
    helpers: {
      daysInMonth: function(month,year) {
        return new Date(year, month, 0).getDate();
      },
      dayDiff: function(to, from) {
        let n = 86400000;
        return Math.round(Math.abs((to - from)) / n);
      },
      diff: function(to, from, interval) {
        let n = 86400000;
        switch(interval) {
          case 'quarter': return Math.ceil((to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear())) + 1)/3); break;
          case 'month': return to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear())) + 1; break;
          case 'week': n = 60 * 60 * 1000 * 24 * 7; break;
          case 'day': n = 60 * 60 * 1000 * 24; break;
          case 'hour': n = 60 * 60 * 1000; break;
          case 'minute': n = 60 * 1000; break;
          case 'second': n = 1000; break;
          default: n = 86400000; break;
        }
        return Math.round(Math.abs((to - from)) / n) + 1;
      },
    },

    // Formats
    format: {
      hms: {
        parse:  d => d3.timeParse("%H:%M")(d),
        format: d => d3.timeFormat("%H:%M")(d),
      },
      en: {
        parse:  d => d3.timeParse("%Y-%m-%d")(d),
        format: d => d3.timeFormat("%Y-%m-%d")(d),
      },
      milliseconds: {
        parse: d => d3.timeParse("%Y-%m-%d %H:%M:%S.%L")(d),
        format: d => d3.timeFormat("%Y-%m-%d %H:%M:%S.%L")(d),
      },
    },

    // Multi Formats
    multiFormat: (date) => {
      return (d3.timeSecond(date) < date ? formatMillisecond
          : d3.timeMinute(date) < date ? formatSecond
          : d3.timeHour(date) < date ? formatMinute
          : d3.timeDay(date) < date ? formatHour
          : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
          : d3.timeYear(date) < date ? formatMonth
          : formatYear)(date);
    },

    // Get format for axis
    parseFormat: function(axis) {

      // Get axis format with prefix and sufix
      if(axis != null) {

        // Set prefix and sufix
        var prefix = axis.prefix != null ? axis.prefix : "";
        var sufix  = axis.sufix != null ? axis.sufix : "";

        // Get input format
        var inFmt = d3.timeParse("%Y-%m-%d");
        if(axis.inFormat != null && axis.inFormat != "") { inFmt = d3.timeParse(axis.inFormat); }

        // Get input format
        var outFmt = d3.timeFormat("%Y-%m-%d");
        if(axis.outFormat != null && axis.outFormat != "") { outFmt = d3.timeFormat(axis.outFormat); }

      } else {
        var prefix = "", sufix = "", inFmt = d3.timeParse("%Y-%m-%d"), outFmt = d3.timeFormat("%Y-%m-%d");
      }

      // Return format parsed
      return function(d) { return prefix + outFmt(inFmt(d)) + sufix; };

    }
  }

}();
