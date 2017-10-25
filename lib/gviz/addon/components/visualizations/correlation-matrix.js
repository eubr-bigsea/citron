/*global window*/

import Component from '@ember/component';

export default Component.extend({
  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  dataUrl: function(){ return this.get('dataUrl'); }.property('dataUrl'),
  width:    function(){ return this.get('width'); }.property('width'),
  height:   function(){ return this.get('height'); }.property('height'),
  _id:      function(){ return this.get('_id'); }.property('_id'),
  style:    function(){ return "width:"+this.get('width')+"; height:"+this.get('height')+";"; }.property('style'),

  // Chart var
  _var: null,

  // Draw Chart
  draw: function(data){

    // Initialize variables
    let component = this;

    let margin = {top: 100, left: 150, right: 100, bottom: 10};

    let colors = { scale: gViz.helpers.colors.linear(data.links, ["orange", "green"], "value") };

    component._var = gViz.vis.matrix_chart()
      ._var(component._var)
      ._class("correlation-matrix-chart")
      .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
      .margin(margin)
      .colors(colors)
      .data(data)
      .build();
  },

  didInsertElement: function(){

    let component = this;
    let dataUrl = component.get('dataUrl');

    // Get data from API
    gViz.helpers.loading.show();
    $.get(dataUrl, function(data) {

      if (data.length > 1) {
        data.forEach((d, i) => {
          $("<button>")
          .attr("value", i + 1)
          .attr("class", "btn btn-primary btn-xs")
          .text(i + 1)
          .css("margin-left", "0.5em")
          .appendTo("#data-buttons")
          .on("click", function() {
            $("#order").val("name");
            component.set("data", d);
            component.draw(d);
          });
        });
      }

      component.set("data", data[0]);
      component.draw(data[0]);
    }, "json")
    // Hide loading div and render error
    .fail(function() {
      gViz.helpers.loading.hide();
      console.log("Error");
    })
    .done(function() {
      gViz.helpers.loading.hide();

      $(window).resize(function() {
        let data = component.get("data");
        component.draw(data);
      });
      //console.log("complete");
    });
  },
});
