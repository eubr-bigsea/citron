/* global gViz */
import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Set empty content
  isEmpty: computed('data', function() {
    return this.get('data') == null || this.get('data').nodes == null || this.get('data').nodes.length <= 0;
  }),

  // Main var
  _var: null,

  didRender: function(){

    // Draw visualization
    this.set('_var',
      gViz.vis.graph()
        ._var(this.get('_var'))
        .container(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`)
        .data(this.get('data'))
        .build()
    );

  }

});
