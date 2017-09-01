import Ember from 'ember';

export default Ember.Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Main var
  _var: null,

  didRender: function() {

    self.$(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`).html('');

    // Draw visualization
    this.set('_var',
      gViz.vis.map()
        ._var(this.get('_var'))
        .container(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`)
        .data(this.get('data'))
        .build()
    );
  },

});
