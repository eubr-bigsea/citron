/* global gViz */
import Component from '@ember/component';

export default Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Chart var
  _var: null,

  // Draw Chart
  didRender: function(){

    this.set('_var',
      gViz.vis.donutChart()
        ._var(this.get('_var'))
        .container(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`)
        .data(this.get('data'))
        .build()
      );
  }

});
