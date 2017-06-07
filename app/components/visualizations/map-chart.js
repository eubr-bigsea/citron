import Ember from 'ember';

export default Ember.Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Main var
  _var: null,

  didRender: function(){

    // Draw visualization
    this.set('_var',
      // Initializes map
      gViz.vis.map()
        ._class("map")
        ._var(this.get('_var'))
        .container(`.gViz-wrapper-inner[data-id='${this.get('elementId')}']`)
        .tile(`carto-light`)
        //.startPoint([-14.647, -52.515])
        .startPoint([-14.647, -52.515])
        .mapZoom(3)
        .data(this.get('data'))
        .build()
    );
  }
});
