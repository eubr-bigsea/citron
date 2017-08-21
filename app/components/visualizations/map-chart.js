import Ember from 'ember';

export default Ember.Component.extend({

  // Set html elements
  classNames: ["gViz-wrapper"],

  // Main var
  _var: null,

  _mode: {},

  didReceiveAttrs: function() {
    var self = this;
    var data = self.get("data");

    // Set title from json
    if(data.title != null && data.title !== "") { self.set("_title", data.title); }
    else { self.set("_title", null); }

    // Set mode from fill
    if(data.mode != null && data.mode.bars === true) { self.set("_mode", { "bars": true }); }
    else if(data.mode != null && data.mode.heat === true) { self.set("_mode", { "heat": true }); }

    if(data.toggle.isVisible) { self.set("_toggleVisible", true); }

    self.set("toggleLeft", "heat");
    self.set("toggleRight", "bars");
  },

  didRender: function(){

    this.get("draw")(this);

  },

  actions: {
    resize() {
      console.log("olar");
    },

    toggleChange() {

    },
  },

  draw(self) {

    // Draw visualization
    self.set('_var',
      // Initializes map
      gViz.vis.map()
        ._var(self.get('_var'))
        .container(".gViz-inner-wrapper")
        .data(self.get('data'))
        .mode(self.get('_mode'))
        .build()
    );
  },

});
