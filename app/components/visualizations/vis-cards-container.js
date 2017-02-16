import Ember from 'ember';

export default Ember.Component.extend({
  visualizations: [
    {
      name:   "Correlation Matrix",
      icon:   "fa-list",
      image:  "icon-th-outline",
      link:   "visualizations.correlation-matrix",
    },
    {
      name:   "Sentiment Analysis",
      icon:   "fa-list",
      image:  "icon-emo-thumbsup",
      link:   "visualizations.sentiment-analysis",
    },
    {
      name:   "Topicos",
      icon:   "fa-bar-chart",
      image:  "icon-newspaper",
      link:   "visualizations.topicos-vis",
    },
    {
      name:   "Word Tree",
      icon:   "fa-tree",
      image:  "icon-flow-split",
      link:   "visualizations.wordtree-diagram",
    },
    {
      name:   "Search Tool",
      icon:   "fa-search",
      image:  "icon-search",
      link:   "visualizations.search-tool",
    },
    {
      name:   "Co-ocurrence ",
      icon:   "fa-tree",
      image:  "icon-chat",
      link:   "visualizations.graph-canvas",
    },
    {
      name:   "Participants - Itens",
      icon:   "fa-tree",
      image:  "icon-users",
      link:   "visualizations.graph-canvas",
    },
  ],
});
