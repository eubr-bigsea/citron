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
    var dataURL, label, value;

    // Initialize variables
    let component = this;

    let parseData = function(d, label, value) {
      d["label"]   =  d[label];
      d["value"]   = +d[value];

      if(label !== "label") { delete(d[label]); }

      if(value !== "value") { delete(d[value]); }

      return d;
    };

    switch(data_index) {
      case 0:
        dataURL     = "../assets/data/pie-chart-example-1.csv";
        label       = "region";
        value       = "count";
        break;

      case 1:
        dataURL     = "../assets/data/pie-chart-example-3.csv";
        label       = "region";
        value       = "count";
        break;

      default:
        dataURL     = "../assets/data/pie-chart-example-2.csv";
        label       = "name";
        value       = "value";
    }

    d3.csv(dataURL, (err, data) => {

      if(err) { console.log(err); }

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
