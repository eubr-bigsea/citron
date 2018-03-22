import Component from '@ember/component';
import ENV from 'citron/config/environment';

export default Component.extend({
  // Set html elements
  tagName: "div",
  classNames: ["gViz-wrapper"],

  visualizations: Object.keys(ENV.APP.visualizations).filter(k => k !== 'list').map(k => ENV.APP.visualizations[k]),
});
