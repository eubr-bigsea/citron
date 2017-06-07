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

  // Chart var
  _var: null,

  // Draw Chart
  didRender: function(){

    this.set('_var',
      gViz.vis.pie_chart()
        ._var(this.get('_var'))
        ._class("pie-chart")
        .container(`.gViz-wrapper-inner[data-id='${this.get('_id')}']`)
        .data(this.get('data'))
        .build()
      );
  },
});
