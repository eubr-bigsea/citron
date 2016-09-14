import Ember from 'ember';

/* global jsPlumb */

export default Ember.Component.extend({
  classNames: ['box'],
  didInsertElement() {
    jsPlumb.getInstance({Container: "diagram"}).draggable(this.elementId);
  }
});
