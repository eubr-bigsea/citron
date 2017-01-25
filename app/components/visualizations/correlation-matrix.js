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
  draw: function(data_index){

    // Initialize variables
    let component = this;
    let dataUrl = this.get('dataUrl');
    //let dataUrl = "https://raw.githubusercontent.com/d3/d3-plugins/master/graph/data/miserables.json";

    // Get data from API
    $.ajax({
      url: dataUrl,
      type: "POST",
      beforeSend() { gViz.helpers.loading.show(); },
      contentType: "application/json",
      //data: JSON.stringify({}),
      success(data) {

        let margin = {top: 100, left: 650, right: 50, bottom: 10};

        component._var = gViz.vis.correlation_matrix()
          ._var(component._var)
          ._class("correlation-matrix-chart")
          .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
          .margin(margin)
          .data(data)
          .build();

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

  },

  didInsertElement: function(){

    let component = this;
    var data_index = 0;

    d3.selectAll(`.btn[data-id=${component.get('_id')}`)
      .on("click", function() {
        var data_index = this.value - 1;
        component.draw(data_index);
    });

   this.draw(data_index);
  }
});
