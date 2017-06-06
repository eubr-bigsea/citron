import Ember from 'ember';
import ENV from 'lemonade-ember/config/environment';

export default Ember.Component.extend({

  init() {
    this._super(...arguments);
  },

  // Set html elements
  tagName: "div",
  classNames: ["gViz-wrapper"],

  visualizations: Object.keys(ENV.APP.visualizations).filter(k => k !== 'list').map(k => ENV.APP.visualizations[k]),


});
