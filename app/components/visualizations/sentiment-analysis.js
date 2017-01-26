import Ember from 'ember';



export default Ember.Component.extend({
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

    let margin = {top: 100, left: 650, right: 50, bottom: 10};

    component._var = gViz.vis.correlation_matrix()
      ._var(component._var)
      ._class("correlation-matrix-chart")
      .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
      .margin(margin)
      .data(data)
      //.data(our_random_data[1])
      .build();
  },

  didInsertElement: function(){

    let component = this;
    let dataUrl = this.get('dataUrl');

    // Get data from API
    $.ajax({
      url: dataUrl,
      type: "GET",
      beforeSend() { gViz.helpers.loading.show(); },
      contentType: "application/json",
      //data: JSON.stringify({}),
      success(data) {

        data.forEach((d, i) => {
          $("<button>")
            .attr("value", i + 1)
            .attr("class", "btn btn-primary btn-xs")
            .text(i + 1)
            .css("margin-left", "0.5em")
            .appendTo("#data-buttons")
            .on("click", function() {
              $("#order").val("name");
              component.draw(data[i]);
            });
        });

        component.draw(data[0]);
      },

      // Hide loading div and render error
      error() {
        gViz.helpers.loading.hide();
        console.log("Error");
      },

      // Hide loading div and render complete
      complete() {
        gViz.helpers.loading.hide();
        //console.log("complete");
      }
    });
  }
});
