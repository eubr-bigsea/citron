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
  draw: function(){

    // Initialize variables
    let component = this;

    //// Call visualization
    //component._var = gViz.vis.time()
    //  ._var(component._var)
    //  .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
    //  .data(data)
    //  .click({ selector: ".chart-elements", fn: () => component.draw() })
    //  .zoom({ fn: (time) => { component.draw(time); } })
    //  .width($.isNumeric(component.get('width')) ? component.get('width') : null)
    //  .height(component.get('height'))
    //  .shape('line')
    //  .build();

  },

  didInsertElement: function(){
    this.draw();
  }

});
