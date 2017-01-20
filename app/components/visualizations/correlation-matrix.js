import Ember from 'ember';

export default Ember.Component.extend({
  init() {
    this._super(...arguments);
  },

  // Attributes bingins
  width:  function(){ return this.get('width'); }.property('width'),
  height: function(){ return this.get('height'); }.property('height'),
  _id:    function(){ return this.get('_id'); }.property('_id'),
  style:  function(){ return "width:"+this.get('width')+"; height:"+this.get('height')+";"; }.property('style'),

  // Chart var
  _var: null,

  // Draw Chart
  draw: function(data_index){

    // Initialize variables
    let component = this;

    let data_url = "https://raw.githubusercontent.com/d3/d3-plugins/master/graph/data/miserables.json"

    component._var = gViz.vis.correlation_matrix()
      ._var(component._var)
      ._class("correlation-matrix-chart")
      .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
      .data(our_random_data[data_index])
      .build();
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
