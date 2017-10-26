/* global gViz */
import Component from '@ember/component';

export default Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Main var
  _var: null,

  didRender: function(){

    // Draw visualization
    this.set('_var',
      gViz.vis.histogram()
        ._var(this.get('_var'))
        .container(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`)
        .data(this.get('data'))
        .build()
    );

  }

});
