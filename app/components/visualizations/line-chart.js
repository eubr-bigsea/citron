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
    var dataURL, xAxis, yAxis;

    // Initialize variables
    let component = this;

    let parseDate = d3.timeParse("%d-%b-%y");
    
    let parseData = function(d, xAxis, yAxis) {
      d["xAxis"]   =  parseDate(d[xAxis]);
      d["yAxis"] = +d[yAxis];

      delete(d[xAxis]);
      delete(d[yAxis]);

      return d;
    };


    switch(data_index) {
      case 0:
        dataURL     = "../assets/data/line-chart-example-1.csv";
        xAxis       = "date";
        yAxis       = "close";
        break;

      default:
        dataURL     = "../assets/data/line-chart-example-2.csv";
        xAxis       = "date";
        yAxis       = "close";
    }

    d3.csv(dataURL, (err, data) => {

      if(err) { console.log(err); }

      data.map(function(d) { parseData(d, xAxis, yAxis); });

      component._var = gViz.vis.line_chart()
        ._var(component._var)
        ._class("line-chart")
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
