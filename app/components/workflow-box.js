import Ember from 'ember';

/* global jsPlumb */

export default Ember.Component.extend({
  classNames: ['box'],
  didInsertElement() {
    let id = Ember.$(`#${this.elementId}`);
    let opts = {containment: true};
    jsPlumb.getInstance({Container: 'diagram'}).draggable(id, opts);
    id.css(this.get('box').position);
  },
  actions: {
    onDestroy() {
      this.get('removeBox')();
    }
  }
});
