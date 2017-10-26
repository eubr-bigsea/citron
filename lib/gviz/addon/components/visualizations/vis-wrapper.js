/* global gViz */
import { empty } from '@ember/object/computed';
import Component from '@ember/component';
import $ from 'jquery';

export default Component.extend({

  // Set html elements
  tagName: "div",
  classNames: ["gViz-outer-wrapper"],

  // Initialize data
  data: null,
  isEmpty: empty('data'),
  resizeIndex: 0,

  // Initialize data
  didInsertElement() {

    // Store this
    var self = this;

    if(self.get('viz').visu === "table-visualization"){
      var container = this.elementId;
      $("#" + container).addClass("table-overflowing");
    }

    // Update data function
    self.get('updateData')(self);

    // Bind resize
    self.$().resizable({
      start: function() {
        self.$().removeClass('hovering').addClass('hovering').css('opacity', 0.6);
      },
      stop: function() {
        self.incrementProperty('resizeIndex');
        self.$().removeClass('hovering').css('opacity', 1);
      },
      containment: self.$().parent(),
      minWidth: 300,
      minHeight: 300
    });

  },

  // Update data function
  updateData: function(self) {

    // Get data from API
    $.ajax({
      url: self.get('dataUrl'),
      type: "GET",
      beforeSend() { gViz.shared.helpers.loading.show(); },
      success(json) {

        self.set('data', json);

      },

      // Hide loading div and render error
      error() { gViz.shared.helpers.loading.hide(); console.error("Error"); },

      // Hide loading div and render complete
      complete() { gViz.shared.helpers.loading.hide(); }

    });

  }

});
