import Ember from 'ember';

export default Ember.Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Draw Chart
  didRender: function(){

    this.set('_var',
      gViz.vis.pieChart()
        ._var(this.get('_var'))
        .container(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`)
        .data(this.get('data'))
        .build()
      );
  }

});
