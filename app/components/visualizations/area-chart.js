import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
  },

  // Set html elements
  tagName: "div",
  classNames: ["gViz-wrapper"],

  // Set unique _id
  _id: `visualization-${Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5}`,

  // Main var
  _var: null,

  didRender: function(){

    // Draw visualization
    this.set('_var',
      gViz.vis.areaChart()
        ._var(this.get('_var'))
        .container(`.gViz-wrapper-inner[data-id='${this.get('_id')}']`)
        .data(this.get('data'))
        .build()
    );

  }

});
