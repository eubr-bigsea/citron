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
      link:   "visualizations.correlation-matrix",
    },
    {
      name:   "Topicos",
      icon:   "fa-bar-chart",
      image:  "icon-newspaper",
      link:   "visualizations.line-chart",
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
      link:   "visualizations.graph-canvas",
    },
    {
      name:   "Coocurrence Matrix",
      icon:   "fa-list",
      image:  "icon-chat",
      link:   "visualizations.correlation-matrix",
    },
    {
      name:   "Participants - Itens",
      icon:   "fa-tree",
      image:  "icon-users",
      link:   "visualizations.correlation-matrix",
    },
  ],
});
