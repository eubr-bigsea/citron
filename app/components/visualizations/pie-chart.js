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

    let parseData = function(d, label, value) {
      d["label"]   =  d[label];
      d["value"]   = +d[value];

      if(label !== "label") { delete(d[label]); }

      if(value !== "value") { delete(d[value]); }

      return d;
    };

    // Walter json
    var label = "name";
    var value = "value";

    d3.json(`${component.get('dataUrl')}?token=123456`, (err, json) => {

      if(err) { console.log(err); }

      // Set title
      component.set('title', json.title);

      // Get data
      var data = json.data;
      data.map(function(d) { parseData(d, label, value); });

      component._var = gViz.vis.pie_chart()
        ._var(component._var)
        ._class("pie-chart")
        .container(".gViz-wrapper[data-id='"+component.get('_id')+"']")
        .data(data)
        .build();

    });

  },

  didInsertElement: function(){
    this.draw();
  }
});
