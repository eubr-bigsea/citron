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

    let parseData = function(d, discrete, continuous) {
      d["discrete"]   =  d[discrete];
      d["continuous"] = +d[continuous];

      delete(d[discrete]);
      delete(d[continuous]);

      return d;
    };

    switch(data_index) {

      case 0:
        var dataURL     = `../assets/data/letters.csv`;
        var discrete    = "letter";
        var continuous  = "frequency";
        break;

      default:
        var dataURL= `../assets/data/sales.csv`;
        var discrete    = "salesperson";
        var continuous  = "sales";
    }

    d3.csv(dataURL, (err, data) => {

      if(err) { console.log(err); }

      data.map(function(d) { parseData(d, discrete, continuous); });

      component._var = gViz.vis.bar_chart()
        ._var(component._var)
        ._class("bar-chart")
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
