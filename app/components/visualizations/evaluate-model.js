import Ember from 'ember';
import config from '../../config/environment';

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

    let parseData = function(d, discrete, continuous) {
      d["discrete"]   =  d[discrete];
      d["continuous"] = +d[continuous];

      delete(d[discrete]);
      delete(d[continuous]);

      return d;
    };

    var discrete = "name";
    var continuous = "value";

    d3.json(`${component.get('dataUrl')}?token=123456`, (err, json) => {

      if(err) { console.log(err); }

      // Set title
      component.set('title', json.title);
      
      // Get data
      var data = json.data;
      component.set('html', data)
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
