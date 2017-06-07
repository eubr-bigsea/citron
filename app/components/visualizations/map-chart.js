import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
  },

  // Set html elements
  tagName: "div",
  classNames: ["gViz-wrapper"],

  _id: `visualization-${Math.floor(Math.random() * (1000000000 - 5 + 1)) + 5}`,

  // Main var
  _var: null,

  didRender: function(){

    // Draw visualization
    this.set('_var',
      // Initializes map
      gViz.vis.map()
        ._class("map")
        ._var(this.get('_var'))
        .container(`.gViz-wrapper-inner[data-id='${this.get('_id')}']`)
        .tile(`carto-light`)
        //.startPoint([-14.647, -52.515])
        .startPoint([-14.647, -52.515])
        .mapZoom(3)
        .data(this.get('data'))
        .build()
    );
  }
});
