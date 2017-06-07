import Ember from 'ember';
// import config from '../../config/environment';

export default Ember.Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Chart var
  _var: null,

  // Draw Chart
  didRender: function(){

    this.set('_var',
      gViz.vis.bar_chart()
        ._var(this.get('_var'))
        ._class("bar-chart")
        .container(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`)
        .data(this.get('data'))
        .build()
    );
  },
});
