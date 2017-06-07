import Ember from 'ember';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
  },

  // Set html elements
  tagName: "div",
  classNames: ["gViz-wrapper"],


});
