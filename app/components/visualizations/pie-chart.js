import Ember from 'ember';

export default Ember.Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Chart var
  _var: null,

  // Draw Chart
  didRender: function(){

    this.set('_var',
      gViz.vis.pie_chart()
        ._var(this.get('_var'))
        ._class("pie-chart")
        .container(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`)
        .data(this.get('data'))
        .build()
      );
  },
});
