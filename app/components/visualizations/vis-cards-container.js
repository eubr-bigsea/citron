import Ember from 'ember';

export default Ember.Component.extend({
  visualizations: [
    {
      name: "Bar Chart",
      icon: "fa-bar-chart",
      box:  "BC",
      link: "visualizations.bar-chart",
    },
    {
      name: "Correlation Matrix",
      icon: "fa-list",
      box:  "CM",
      link: "visualizations.correlation-matrix",
    },
    {
      name: "Sentiment Analysis",
      icon: "fa-list",
      box:  "SA",
      link: "visualizations.correlation-matrix",
    },
    {
      name: "Line Chart",
      icon: "fa-line-chart",
      box:  "LC",
      link: "visualizations.line-chart",
    },
    {
      name: "Word Tree",
      icon: "fa-tree",
      box:  "WT",
      link: "visualizations.wordtree-diagram",
    },
    {
      name: "Graph",
      icon: "fa-sitemap",
      box:  "G",
      link: "visualizations.graph-canvas",
    },
  ],


  init() {
    this._super(...arguments);
  },
});
